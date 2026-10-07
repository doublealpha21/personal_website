import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/portfolio/hero'
import { Results } from '@/components/portfolio/results'
import { SectionHeader } from '@/components/site/section-header'
import { PageSection } from '@/components/site/page-section'
import { EntryGrid } from '@/components/site/entry-card'
import { getAllPosts, getFeaturedWork } from '@/lib/content'
import { results } from '@/lib/portfolio-data'

export const revalidate = 600

const selectedResults = results.filter((r) => ['85%', '5 hubs', '+47%', '−20%'].includes(r.value))

function SeeAll({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 self-start rounded-sm border border-border px-3 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  )
}

export default async function HomePage() {
  const [work, posts] = await Promise.all([getFeaturedWork(3), getAllPosts()])
  const latestPosts = posts.slice(0, 3)

  return (
    <>
      <Hero
        actions={
          <div className="flex flex-wrap gap-3 self-start md:self-auto">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              See the two tracks
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-sm border border-foreground px-4 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              One-page portfolio
            </Link>
          </div>
        }
      />

      <Results
        items={selectedResults}
        code="Sheet 01 — Measured output"
        title="Selected results."
        description="Each figure comes from a system I designed or a codebase I owned, measured after it went live."
      />

      {work.length ? (
        <PageSection aria-labelledby="featured-work-title">
          <SectionHeader
            id="featured-work-title"
            code="Sheet 02 — Selected work"
            title="Case studies."
            description="How I found the structural gap, what I built, and what changed."
          />
          <EntryGrid entries={work} />
          <SeeAll href="/work">All case studies</SeeAll>
        </PageSection>
      ) : null}

      {latestPosts.length ? (
        <PageSection aria-labelledby="latest-writing-title" tone="card">
          <SectionHeader id="latest-writing-title" code={`Sheet 0${work.length ? 3 : 2} — Writing`} title="Latest writing." />
          <EntryGrid entries={latestPosts} />
          <SeeAll href="/writing">All writing</SeeAll>
        </PageSection>
      ) : null}
    </>
  )
}
