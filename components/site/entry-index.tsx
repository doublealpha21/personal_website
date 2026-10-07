import Link from 'next/link'
import type { Entry, EntryType } from '@/lib/content'
import { SectionHeader } from './section-header'
import { PageSection } from './page-section'
import { TagFilter } from './tag-filter'
import { EmptyState, EntryGrid } from './entry-card'

type EntryIndexProps = {
  type: EntryType
  code: string
  title: string
  description: string
  entries: Entry[]
  tags: string[]
  activeTag: string | null
}

export function EntryIndex({ type, code, title, description, entries, tags, activeTag }: EntryIndexProps) {
  const basePath = `/${type}`
  const tag = activeTag?.toLowerCase() ?? null
  const visible = tag ? entries.filter((e) => e.tags.some((t) => t.toLowerCase() === tag)) : entries
  const tagLabel = tag ? (tags.find((t) => t.toLowerCase() === tag) ?? activeTag) : null

  return (
    <PageSection aria-labelledby={`${type}-title`}>
      <SectionHeader as="h1" id={`${type}-title`} code={code} title={title} description={description} />

      {entries.length === 0 ? (
        <EmptyState>
          <p className="text-lg">Nothing published yet.</p>
        </EmptyState>
      ) : (
        <>
          <TagFilter basePath={basePath} tags={tags} active={tag} />
          <p className="sr-only" role="status">
            {tagLabel
              ? `Showing ${visible.length} ${visible.length === 1 ? 'entry' : 'entries'} tagged ${tagLabel}.`
              : `Showing all ${visible.length} entries.`}
          </p>
          {visible.length ? (
            <EntryGrid entries={visible} headingLevel="h2" />
          ) : (
            <EmptyState>
              <p className="text-lg">No entries for this tag.</p>
              <Link
                href={basePath}
                className="font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Clear filter
              </Link>
            </EmptyState>
          )}
        </>
      )}
    </PageSection>
  )
}
