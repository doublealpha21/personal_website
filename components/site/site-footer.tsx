import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'

const linkClass =
  'inline-flex items-center gap-2 text-lg font-medium underline decoration-primary-foreground/40 underline-offset-4 transition-colors hover:decoration-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground'

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 md:px-8 md:py-24">
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs uppercase tracking-widest text-primary-foreground/80">Contact</span>
          <p className="max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Building something that needs to scale? Let&apos;s talk.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-10">
          <Link href="/contact" className={linkClass}>
            Send a message
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
          <a href={`mailto:${profile.email}`} className={linkClass}>
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {profile.linkedinLabel}
            <ArrowUpRight className="size-5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
        <div className="flex flex-col gap-3 border-t border-primary-foreground/25 pt-6 font-mono text-xs text-primary-foreground/80 md:flex-row md:items-center md:justify-between">
          <span>
            {profile.name} · {profile.role}
          </span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/portfolio" className="underline underline-offset-4 hover:text-primary-foreground">
              One-page portfolio
            </Link>
            <a href="/feed.xml" className="underline underline-offset-4 hover:text-primary-foreground">
              RSS feed
            </a>
            <span>{profile.location}</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
