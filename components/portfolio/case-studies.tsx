import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { roles, type Role, type Track } from '@/lib/portfolio-data'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

export function RoleEntry({ role, caseStudyHref }: { role: Role; caseStudyHref?: string }) {
  const isOps = role.track === 'operations'
  return (
    <article
      id={`role-${role.id}`}
      aria-labelledby={`role-${role.id}-title`}
      className="grid scroll-mt-20 grid-cols-1 gap-6 border-t border-border py-10 md:grid-cols-12 md:gap-8"
    >
      <div className="flex flex-col gap-2 md:col-span-4">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{role.period}</span>
        <h4 id={`role-${role.id}-title`} className="text-2xl font-semibold tracking-tight">
          {role.org}
        </h4>
        <p className="text-sm text-muted-foreground">
          {role.title} · {role.location}
        </p>
        {role.outcome ? (
          <div className="mt-4 flex flex-col gap-1 border-l-2 border-foreground pl-4">
            <span className={cn('font-mono text-3xl font-medium', isOps ? 'text-foreground' : 'text-primary')}>
              {role.outcome.value}
            </span>
            <span className="text-sm text-muted-foreground">{role.outcome.label}</span>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-6 md:col-span-8">
        <p className="text-pretty text-lg leading-relaxed">{role.summary}</p>
        <ul className="flex flex-col gap-3">
          {role.highlights.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
              <span
                aria-hidden="true"
                className={cn('mt-2.5 h-px w-4 shrink-0', isOps ? 'bg-foreground' : 'bg-primary')}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <ul aria-label="Skills used" className="flex flex-wrap gap-2">
          {role.tags.map((tag) => (
            <li key={tag} className="rounded-sm bg-secondary px-2 py-1 font-mono text-xs text-secondary-foreground">
              {tag}
            </li>
          ))}
        </ul>
        {caseStudyHref ? (
          <Link
            href={caseStudyHref}
            className="inline-flex items-center gap-2 self-start rounded-sm bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Read the case study
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        ) : null}
        {role.link ? (
          <a
            href={role.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-sm border border-border px-3 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            {role.link.label}
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
      </div>
      {role.photos?.length ? (
        <ul
          aria-label={`Photos from ${role.org}`}
          className={cn(
            'grid grid-cols-2 gap-3 md:col-span-12',
            role.photos.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2',
          )}
        >
          {role.photos.map((photo, index) => (
            <li
              key={photo.src}
              className={cn(
                'relative overflow-hidden rounded-sm border border-border bg-muted',
                index === 0 && role.photos!.length % 2 === 1
                  ? 'col-span-2 aspect-[16/10] md:col-span-1 md:aspect-[4/5]'
                  : 'aspect-[4/5]',
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={role.photos!.length >= 3 ? '(min-width: 768px) 33vw, 100vw' : '(min-width: 768px) 50vw, 50vw'}
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

const groups: { track: Track; code: string; title: string; blurb: string }[] = [
  {
    track: 'operations',
    code: 'Track A',
    title: 'Operations and strategy',
    blurb: 'Roadmaps, service frameworks, SOPs and vendor networks for teams that need to scale.',
  },
  {
    track: 'engineering',
    code: 'Track B',
    title: 'Mobile engineering',
    blurb: 'Flutter products shipped across fintech, health-tech, proptech, Web3 and video.',
  },
]

type CaseStudiesProps = {
  code?: string
  title?: string
  description?: string
  caseStudyLinks?: Record<string, string>
}

export function CaseStudies({
  code = 'Sheet 03 — Work',
  title = 'What I built, and what changed.',
  description = 'Operations comes first because it is where I spend most of my time now. The engineering work explains how I run it.',
  caseStudyLinks = {},
}: CaseStudiesProps = {}) {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          id="work-title"
          code={code}
          title={title}
          description={description}
        />
        {groups.map((group) => (
          <div key={group.track} className="flex flex-col">
            <div className="flex flex-col gap-2 pb-6 md:flex-row md:items-baseline md:justify-between">
              <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest">
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-2.5 rounded-full',
                    group.track === 'operations' ? 'bg-foreground' : 'bg-primary',
                  )}
                />
                <span className="font-mono text-muted-foreground">{group.code}</span>
                {group.title}
              </h3>
              <p className="text-sm text-muted-foreground">{group.blurb}</p>
            </div>
            {roles
              .filter((role) => role.track === group.track)
              .map((role) => (
                <RoleEntry key={role.id} role={role} caseStudyHref={caseStudyLinks[role.id]} />
              ))}
          </div>
        ))}
      </div>
    </section>
  )
}
