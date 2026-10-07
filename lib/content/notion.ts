import 'server-only'
import { Client, isFullBlock, isFullPage, APIResponseError } from '@notionhq/client'
import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { entrySchema, type Block, type Entry, type EntryType, type RichText } from './schema'

/**
 * Notion source.
 *
 * Expected database properties (names are matched case-insensitively):
 *   Title         title       (required)
 *   Type          select      "Case study" or "Writing" (required)
 *   Status        status or select, only "Published" goes live (required)
 *   Publish date  date        (required; future dates stay hidden until that day)
 *   Subtitle      text
 *   Summary       text        one line, used on cards and in search previews
 *   Tags          multi-select
 *   Featured      checkbox    shows the case study on the homepage
 *   Slug          text        optional; otherwise built from the title
 *   Role          select      optional; links a case study to a role on /experience
 *   Substack URL  url         optional
 * The page cover becomes the cover image.
 */

const token = process.env.NOTION_TOKEN
const databaseId = process.env.NOTION_DATABASE_ID

export const notionConfigured = Boolean(token && databaseId)

let client: Client | null = null
function notion() {
  if (!client) client = new Client({ auth: token })
  return client
}

let dataSourceId: string | null = null
async function resolveDataSourceId() {
  if (dataSourceId) return dataSourceId
  try {
    const db = await notion().databases.retrieve({ database_id: databaseId! })
    const first = 'data_sources' in db ? db.data_sources?.[0]?.id : undefined
    if (!first) throw new Error('The Notion database has no data source.')
    dataSourceId = first
  } catch (error) {
    // The ID may already be a data source ID rather than a database ID.
    if (error instanceof APIResponseError && (error.code === 'object_not_found' || error.code === 'validation_error')) {
      dataSourceId = databaseId!
    } else {
      throw error
    }
  }
  return dataSourceId
}

/* ------------------------------------------------------------------ */
/* Property helpers                                                    */
/* ------------------------------------------------------------------ */

type Property = PageObjectResponse['properties'][string]

function getProp(page: PageObjectResponse, name: string): Property | undefined {
  const key = Object.keys(page.properties).find((k) => k.trim().toLowerCase() === name.toLowerCase())
  return key ? page.properties[key] : undefined
}

function plain(rich: RichTextItemResponse[] | undefined) {
  return (rich ?? []).map((r) => r.plain_text).join('')
}

function readText(page: PageObjectResponse, name: string): string {
  const p = getProp(page, name)
  if (!p) return ''
  switch (p.type) {
    case 'rich_text':
      return plain(p.rich_text)
    case 'title':
      return plain(p.title)
    case 'select':
      return p.select?.name ?? ''
    case 'status':
      return p.status?.name ?? ''
    case 'url':
      return p.url ?? ''
    default:
      return ''
  }
}

function readTitle(page: PageObjectResponse) {
  const p = Object.values(page.properties).find((v) => v.type === 'title')
  return p && p.type === 'title' ? plain(p.title).trim() : ''
}

function readTags(page: PageObjectResponse) {
  const p = getProp(page, 'Tags')
  return p?.type === 'multi_select' ? p.multi_select.map((t) => t.name) : []
}

function readDate(page: PageObjectResponse, name: string) {
  const p = getProp(page, name)
  return p?.type === 'date' && p.date?.start ? p.date.start.slice(0, 10) : ''
}

function readCheckbox(page: PageObjectResponse, name: string) {
  const p = getProp(page, name)
  return p?.type === 'checkbox' ? p.checkbox : false
}

function readType(page: PageObjectResponse): EntryType | null {
  const value = readText(page, 'Type').trim().toLowerCase()
  if (['case study', 'case studies', 'work'].includes(value)) return 'work'
  if (['writing', 'post', 'essay'].includes(value)) return 'writing'
  return null
}

export function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '')
}

function version(isoTime: string) {
  return isoTime.replace(/[^0-9]/g, '')
}

function pageUrl(page: PageObjectResponse) {
  return page.url ?? page.id
}

/* ------------------------------------------------------------------ */
/* Entries                                                             */
/* ------------------------------------------------------------------ */

function toEntry(page: PageObjectResponse): Entry | null {
  const status = readText(page, 'Status').trim().toLowerCase()
  if (status !== 'published') return null

  const title = readTitle(page)
  const type = readType(page)
  const where = `Notion page "${title || '(untitled)'}" (${pageUrl(page)})`

  if (!type) {
    console.error(`[content] ${where} skipped: field "Type" must be "Case study" or "Writing".`)
    return null
  }

  const explicitSlug = slugify(readText(page, 'Slug'))
  const substack = readText(page, 'Substack URL').trim()

  const candidate = {
    id: page.id,
    type,
    slug: explicitSlug || slugify(title),
    title,
    subtitle: readText(page, 'Subtitle'),
    summary: readText(page, 'Summary'),
    tags: readTags(page),
    publishDate: readDate(page, 'Publish date'),
    coverImage: page.cover ? `/api/notion-image/page/${page.id}/${version(page.last_edited_time)}` : null,
    featured: readCheckbox(page, 'Featured'),
    role: readText(page, 'Role').trim().toLowerCase() || null,
    substackUrl: substack || null,
    updatedAt: page.last_edited_time,
  }

  const parsed = entrySchema.safeParse(candidate)
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      console.error(`[content] ${where} skipped: field "${issue.path.join('.') || 'unknown'}": ${issue.message}`)
    }
    return null
  }
  return parsed.data
}

export async function listEntries(): Promise<Entry[]> {
  if (!notionConfigured) {
    console.warn('[content] NOTION_TOKEN or NOTION_DATABASE_ID is not set, so no entries will be shown.')
    return []
  }

  const source = await resolveDataSourceId()
  const pages: PageObjectResponse[] = []
  let cursor: string | undefined

  do {
    const response = await notion().dataSources.query({
      data_source_id: source,
      start_cursor: cursor,
      page_size: 100,
    })
    for (const result of response.results) {
      if (result.object === 'page' && isFullPage(result) && !result.in_trash) pages.push(result)
    }
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  const today = new Date().toISOString().slice(0, 10)
  const entries = pages
    .map(toEntry)
    .filter((e): e is Entry => e !== null && e.publishDate <= today)

  // Keep slugs unique within each section.
  const seen = new Set<string>()
  for (const entry of entries) {
    const key = `${entry.type}/${entry.slug}`
    if (seen.has(key)) {
      const fixed = `${entry.slug}-${entry.id.replace(/-/g, '').slice(0, 6)}`
      console.warn(`[content] Duplicate slug "${entry.slug}" for "${entry.title}", using "${fixed}". Set a Slug in Notion to choose one.`)
      entry.slug = fixed
    }
    seen.add(`${entry.type}/${entry.slug}`)
  }

  return entries
}

/* ------------------------------------------------------------------ */
/* Body blocks                                                         */
/* ------------------------------------------------------------------ */

function rich(items: RichTextItemResponse[] | undefined): RichText[] {
  return (items ?? []).map((r) => ({
    text: r.plain_text,
    href: r.href ?? null,
    bold: r.annotations.bold,
    italic: r.annotations.italic,
    strike: r.annotations.strikethrough,
    underline: r.annotations.underline,
    code: r.annotations.code,
  }))
}

async function listChildren(blockId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = []
  let cursor: string | undefined
  do {
    const response = await notion().blocks.children.list({ block_id: blockId, start_cursor: cursor, page_size: 100 })
    for (const block of response.results) if (isFullBlock(block)) blocks.push(block)
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)
  return blocks
}

const MAX_DEPTH = 4

async function childrenOf(block: BlockObjectResponse, depth: number) {
  if (!block.has_children || depth >= MAX_DEPTH) return undefined
  return convert(await listChildren(block.id), depth + 1)
}

function imageSrc(block: BlockObjectResponse) {
  return `/api/notion-image/block/${block.id}/${version(block.last_edited_time)}`
}

async function convert(raw: BlockObjectResponse[], depth: number): Promise<Block[]> {
  const out: Block[] = []

  for (const block of raw) {
    switch (block.type) {
      case 'paragraph':
        out.push({ id: block.id, type: 'paragraph', text: rich(block.paragraph.rich_text), children: await childrenOf(block, depth) })
        break
      // The page title is the only h1, so Notion headings shift down one level.
      case 'heading_1':
        out.push({ id: block.id, type: 'heading_2', text: rich(block.heading_1.rich_text) })
        break
      case 'heading_2':
        out.push({ id: block.id, type: 'heading_3', text: rich(block.heading_2.rich_text) })
        break
      case 'heading_3':
        out.push({ id: block.id, type: 'heading_4', text: rich(block.heading_3.rich_text) })
        break
      case 'quote':
        out.push({ id: block.id, type: 'quote', text: rich(block.quote.rich_text), children: await childrenOf(block, depth) })
        break
      case 'bulleted_list_item':
      case 'numbered_list_item': {
        const listType = block.type === 'bulleted_list_item' ? 'bulleted_list' : 'numbered_list'
        const text = block.type === 'bulleted_list_item' ? block.bulleted_list_item.rich_text : block.numbered_list_item.rich_text
        const item = { id: block.id, text: rich(text), children: await childrenOf(block, depth) }
        const last = out[out.length - 1]
        if (last && last.type === listType) last.items.push(item)
        else out.push({ id: block.id, type: listType, items: [item] })
        break
      }
      case 'to_do':
        out.push({ id: block.id, type: 'todo', text: rich(block.to_do.rich_text), checked: block.to_do.checked })
        break
      case 'callout': {
        const icon = block.callout.icon?.type === 'emoji' ? block.callout.icon.emoji : null
        out.push({ id: block.id, type: 'callout', icon, text: rich(block.callout.rich_text), children: await childrenOf(block, depth) })
        break
      }
      case 'code':
        out.push({
          id: block.id,
          type: 'code',
          language: block.code.language,
          code: plain(block.code.rich_text),
          caption: rich(block.code.caption),
        })
        break
      case 'equation':
        out.push({ id: block.id, type: 'code', language: 'latex', code: block.equation.expression, caption: [] })
        break
      case 'divider':
        out.push({ id: block.id, type: 'divider' })
        break
      case 'image':
        out.push({ id: block.id, type: 'image', src: imageSrc(block), caption: rich(block.image.caption) })
        break
      case 'bookmark':
        out.push({ id: block.id, type: 'link', href: block.bookmark.url, label: plain(block.bookmark.caption) || block.bookmark.url })
        break
      case 'embed':
        out.push({ id: block.id, type: 'link', href: block.embed.url, label: plain(block.embed.caption) || block.embed.url })
        break
      case 'video': {
        const href = block.video.type === 'external' ? block.video.external.url : null
        if (href) out.push({ id: block.id, type: 'link', href, label: plain(block.video.caption) || 'Watch the video' })
        break
      }
      case 'pdf':
      case 'file': {
        const data = block.type === 'pdf' ? block.pdf : block.file
        if (data.type === 'external') {
          out.push({ id: block.id, type: 'link', href: data.external.url, label: plain(data.caption) || 'Open the file' })
        }
        break
      }
      case 'table': {
        const rows = (await listChildren(block.id))
          .filter((row): row is Extract<BlockObjectResponse, { type: 'table_row' }> => row.type === 'table_row')
          .map((row) => row.table_row.cells.map((cell) => rich(cell)))
        out.push({
          id: block.id,
          type: 'table',
          hasHeaderRow: block.table.has_column_header,
          hasHeaderColumn: block.table.has_row_header,
          rows,
        })
        break
      }
      case 'toggle':
        out.push({ id: block.id, type: 'toggle', text: rich(block.toggle.rich_text), children: await childrenOf(block, depth) })
        break
      case 'column_list': {
        const columns = await listChildren(block.id)
        const converted = await Promise.all(
          columns.filter((c) => c.type === 'column').map(async (c) => convert(await listChildren(c.id), depth + 1)),
        )
        out.push({ id: block.id, type: 'columns', columns: converted })
        break
      }
      case 'synced_block':
        if (block.has_children) out.push(...(await convert(await listChildren(block.id), depth + 1)))
        break
      default:
        // Unsupported block types (databases, child pages, breadcrumbs) are left out of the public page.
        break
    }
  }
  return out
}

export async function getBlocks(pageId: string): Promise<Block[]> {
  if (!notionConfigured) return []
  return convert(await listChildren(pageId), 0)
}

/* ------------------------------------------------------------------ */
/* Fresh file URLs for the image proxy                                 */
/* ------------------------------------------------------------------ */

export async function getFreshImageUrl(kind: 'page' | 'block', id: string): Promise<string | null> {
  if (!notionConfigured) return null

  if (kind === 'page') {
    const page = await notion().pages.retrieve({ page_id: id })
    if (!isFullPage(page) || !page.cover) return null
    return page.cover.type === 'external' ? page.cover.external.url : page.cover.file.url
  }

  const block = await notion().blocks.retrieve({ block_id: id })
  if (!isFullBlock(block) || block.type !== 'image') return null
  return block.image.type === 'external' ? block.image.external.url : block.image.file.url
}
