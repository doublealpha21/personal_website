import Link from 'next/link'
import type { Entry } from '@/lib/content'
import { formatDate } from '@/lib/site'
import { CoverImage } from './cover-image'
import { TagChip } from './tag-chip'

export function sectionLabel(type: Entry['type']) {
  return type === 'work' ? 'Case study' : 'Writing'
}

export function EntryCard({ entry, headingLevel = 'h3' }: { entry: Entry; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  const href = `/${entry.type}/${entry.slug}`
  return (
    <article className="group relative flex w-full min-w-0 flex-col gap-4 rounded-sm border border-border bg-card p-3 transition-colors focus-within:border-primary hover:border-foreground">
      <CoverImage
        src={entry.coverImage}
        title={entry.title}
        label={sectionLabel(entry.type)}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-3 px-1 pb-1">
        <time dateTime={entry.publishDate} className="font-mono text-xs text-muted-foreground">
          {formatDate(entry.publishDate)}
        </time>
        <Heading className="break-words text-xl font-semibold leading-snug tracking-tight">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {entry.title}
          </Link>
        </Heading>
        {entry.subtitle ? (
          <p className="break-words text-pretty leading-relaxed text-muted-foreground">{entry.subtitle}</p>
        ) : null}
        {entry.tags.length ? (
          <ul aria-label="Tags" className="mt-auto flex flex-wrap gap-2 pt-2">
            {entry.tags.map((tag) => (
              <li key={tag} className="min-w-0">
                <TagChip>{tag}</TagChip>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}

export function EntryGrid({ entries, headingLevel }: { entries: Entry[]; headingLevel?: 'h2' | 'h3' }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <li key={entry.id} className="flex min-w-0">
          <EntryCard entry={entry} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  )
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-sm border border-dashed border-border bg-card px-6 py-10 text-muted-foreground">
      {children}
    </div>
  )
}
