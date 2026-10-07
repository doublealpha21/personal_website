import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'

const sectors = ['Fintech', 'Health-tech', 'Web3', 'Live events', 'Media', 'Energy']

export function Hero({ actions }: { actions?: React.ReactNode } = {}) {
  return (
    <section id="top" aria-labelledby="hero-title" className="bg-grid border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <div className="animate-rise flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span>{profile.location}</span>
          <span aria-hidden="true">/</span>
          <span>Engineering × Operations</span>
          <span aria-hidden="true">/</span>
          <span>2022 — 2026</span>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h1
            id="hero-title"
            className="animate-rise max-w-4xl text-balance text-5xl font-semibold leading-none tracking-tight md:text-7xl lg:text-8xl"
            style={{ animationDelay: '80ms' }}
          >
            I build the systems that{' '}
            <span className="text-primary">hold under pressure.</span>
          </h1>

          <figure
            className="animate-rise flex w-40 shrink-0 flex-col gap-2 md:w-52"
            style={{ animationDelay: '120ms' }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-muted">
              <Image
                src="/images/hero-portrait.jpg"
                alt="Praise Fakorede smiling, in a black t-shirt against a warm ochre wall"
                fill
                priority
                sizes="(min-width: 768px) 208px, 160px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {profile.name}
            </figcaption>
          </figure>
        </div>

        <div
          className="animate-rise flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          style={{ animationDelay: '160ms' }}
        >
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{profile.intro}</p>
          {actions ?? (
            <a
              href="#timeline"
              className="inline-flex items-center gap-2 self-start rounded-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 md:self-auto"
            >
              See the two tracks
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <ul
          aria-label="Sectors"
          className="animate-rise flex flex-wrap gap-2"
          style={{ animationDelay: '240ms' }}
        >
          {sectors.map((sector) => (
            <li
              key={sector}
              className="rounded-sm border border-border bg-card px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {sector}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
