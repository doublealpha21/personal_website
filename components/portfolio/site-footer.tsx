import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 md:px-8 md:py-24">
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs uppercase tracking-widest text-primary-foreground/70">
            Sheet 05 — Contact
          </span>
          <h2 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Building something that needs to scale? Let&apos;s talk.
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 text-lg font-medium underline decoration-primary-foreground/40 underline-offset-4 transition-colors hover:decoration-primary-foreground"
          >
            {profile.email}
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg font-medium underline decoration-primary-foreground/40 underline-offset-4 transition-colors hover:decoration-primary-foreground"
          >
            {profile.linkedinLabel}
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </a>
        </div>
        <div className="flex flex-col gap-2 border-t border-primary-foreground/25 pt-6 font-mono text-xs text-primary-foreground/70 md:flex-row md:justify-between">
          <span>
            {profile.name} · {profile.role}
          </span>
          <span>{profile.location}</span>
        </div>
      </div>
    </footer>
  )
}
