import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Entry, EntryWithBody } from '@/lib/content'
import { formatDate } from '@/lib/site'
import { CoverImage } from './cover-image'
import { NotionBlocks } from './notion-blocks'
import { TagChip } from './tag-chip'
import { sectionLabel } from './entry-card'

type EntryArticleProps = {
  entry: EntryWithBody
  newer: Entry | null
  older: Entry | null
  showReadingTime?: boolean
}

function Adjacent({ entry, direction }: { entry: Entry | null; direction: 'newer' | 'older' }) {
  if (!entry) return <span className="hidden md:block" />
  const isNewer = direction === 'newer'
  return (
    <Link
      href={`/${entry.type}/${entry.slug}`}
      rel={isNewer ? 'prev' : 'next'}
      className={`flex min-w-0 flex-col gap-2 rounded-sm border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 ${isNewer ? '' : 'md:items-end md:text-right'}`}
    >
      <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {isNewer ? <ArrowLeft className="size-3.5" aria-hidden="true" /> : null}
        {isNewer ? 'Newer' : 'Older'}
        {isNewer ? null : <ArrowRight className="size-3.5" aria-hidden="true" />}
      </span>
      <span className="break-words font-medium">{entry.title}</span>
    </Link>
  )
}

export function EntryArticle({ entry, newer, older, showReadingTime }: EntryArticleProps) {
  const label = sectionLabel(entry.type)
  return (
    <article className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 md:px-8 md:py-20">
      <nav aria-label="Breadcrumb">
        <Link
          href={`/${entry.type}`}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {entry.type === 'work' ? 'All case studies' : 'All writing'}
        </Link>
      </nav>

      <header className="flex flex-col gap-6 border-t border-foreground pt-4">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        <h1 className="max-w-4xl break-words text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          {entry.title}
        </h1>
        {entry.subtitle ? (
          <p className="max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground">{entry.subtitle}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-muted-foreground">
          <time dateTime={entry.publishDate}>{formatDate(entry.publishDate)}</time>
          {showReadingTime ? <span>{entry.readingMinutes} min read</span> : null}
          {entry.tags.length ? (
            <ul aria-label="Tags" className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <li key={tag}>
                  <TagChip href={`/${entry.type}?tag=${encodeURIComponent(tag.toLowerCase())}`}>{tag}</TagChip>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      <CoverImage
        src={entry.coverImage}
        title={entry.title}
        label={label}
        priority
        sizes="(min-width: 1152px) 1088px, 100vw"
        className="md:aspect-[21/9]"
      />

      <div className="notion-body mx-auto w-full max-w-[44rem]">
        {entry.blocks.length ? (
          <NotionBlocks blocks={entry.blocks} />
        ) : (
          <p className="text-muted-foreground">This page has no body yet.</p>
        )}
        {entry.substackUrl ? (
          <p className="mt-10 border-t border-border pt-6 text-base">
            <a href={entry.substackUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              Also published on Substack
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </p>
        ) : null}
      </div>

      {newer || older ? (
        <nav aria-label={`More ${entry.type === 'work' ? 'case studies' : 'writing'}`} className="grid gap-4 border-t border-border pt-8 md:grid-cols-2">
          <Adjacent entry={newer} direction="newer" />
          <Adjacent entry={older} direction="older" />
        </nav>
      ) : null}
    </article>
  )
}
