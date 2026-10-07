import 'server-only'
import { unstable_cache } from 'next/cache'
import { CONTENT_REVALIDATE_SECONDS } from '@/lib/site'
import * as source from './notion'
import type { Block, Entry, EntryType, EntryWithBody } from './schema'

/**
 * Content layer. Pages and components only ever import from this file,
 * so the source (Notion today) can be replaced without touching them.
 * To switch sources, change the `source` import above to a module that
 * exports the same three functions: listEntries, getBlocks and getFreshImageUrl.
 */

export type { Entry, EntryType, EntryWithBody, Block }

export const CONTENT_TAG = 'content'

const loadEntries = unstable_cache(async () => source.listEntries(), ['content-entries'], {
  tags: [CONTENT_TAG],
  revalidate: CONTENT_REVALIDATE_SECONDS,
})

// Keyed by page id and last-edited time, so an edit always fetches a fresh body.
const loadBlocks = unstable_cache(
  async (id: string, _updatedAt: string) => source.getBlocks(id),
  ['content-blocks'],
  { tags: [CONTENT_TAG], revalidate: CONTENT_REVALIDATE_SECONDS },
)

function byDateDesc(a: Entry, b: Entry) {
  return b.publishDate.localeCompare(a.publishDate) || a.title.localeCompare(b.title)
}

async function entriesOf(type: EntryType) {
  return (await loadEntries()).filter((e) => e.type === type).sort(byDateDesc)
}

function wordCount(blocks: Block[]): number {
  let words = 0
  const count = (text: { text: string }[]) => {
    words += text.map((t) => t.text).join('').split(/\s+/).filter(Boolean).length
  }
  for (const block of blocks) {
    switch (block.type) {
      case 'bulleted_list':
      case 'numbered_list':
        for (const item of block.items) {
          count(item.text)
          if (item.children) words += wordCount(item.children)
        }
        break
      case 'columns':
        for (const column of block.columns) words += wordCount(column)
        break
      case 'table':
        for (const row of block.rows) for (const cell of row) count(cell)
        break
      case 'code':
        words += block.code.split(/\s+/).filter(Boolean).length
        break
      default:
        if ('text' in block) count(block.text)
        if ('children' in block && block.children) words += wordCount(block.children)
    }
  }
  return words
}

async function withBody(entry: Entry | undefined): Promise<EntryWithBody | null> {
  if (!entry) return null
  const blocks = await loadBlocks(entry.id, entry.updatedAt)
  return { ...entry, blocks, readingMinutes: Math.max(1, Math.round(wordCount(blocks) / 225)) }
}

export async function getAllWork() {
  return entriesOf('work')
}

export async function getAllPosts() {
  return entriesOf('writing')
}

export async function getFeaturedWork(limit = 3) {
  const all = await getAllWork()
  // Featured case studies first, then the most recent ones to fill any empty slots.
  return [...all.filter((e) => e.featured), ...all.filter((e) => !e.featured)].slice(0, limit)
}

export async function getWorkBySlug(slug: string) {
  return withBody((await getAllWork()).find((e) => e.slug === slug))
}

export async function getPostBySlug(slug: string) {
  return withBody((await getAllPosts()).find((e) => e.slug === slug))
}

/** Case studies linked to roles on the experience timeline, keyed by role id. */
export async function getWorkByRole() {
  const map: Record<string, Entry> = {}
  for (const entry of await getAllWork()) {
    if (entry.role && !map[entry.role]) map[entry.role] = entry
  }
  return map
}

export async function getAllTags(type?: EntryType) {
  const entries = type ? await entriesOf(type) : await loadEntries()
  const tags = new Map<string, string>()
  for (const entry of entries) for (const tag of entry.tags) tags.set(tag.toLowerCase(), tag)
  return [...tags.values()].sort((a, b) => a.localeCompare(b))
}

export async function getAdjacent(type: EntryType, slug: string) {
  const list = await entriesOf(type)
  const index = list.findIndex((e) => e.slug === slug)
  return {
    newer: index > 0 ? list[index - 1] : null,
    older: index >= 0 && index < list.length - 1 ? list[index + 1] : null,
  }
}

export async function getFreshImageUrl(kind: 'page' | 'block', id: string) {
  return source.getFreshImageUrl(kind, id)
}
