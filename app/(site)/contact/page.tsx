import type { Metadata } from 'next'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { SectionHeader } from '@/components/site/section-header'
import { PageSection } from '@/components/site/page-section'
import { profile } from '@/lib/portfolio-data'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a 30-minute call with Praise Fakorede, or reach him by email or LinkedIn.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <PageSection aria-labelledby="contact-title">
      <SectionHeader
        as="h1"
        id="contact-title"
        code="Sheet 01 — Contact"
        title="Book a call."
        description="Thirty minutes to understand what you are building, where it is getting stuck, and whether I can help. Come with the problem; no prep needed."
      />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="flex flex-col gap-6 rounded-sm border border-border bg-card p-6 md:p-8">
            <p className="text-pretty text-lg leading-relaxed">
              Pick a time that suits you. The booking page shows my availability in your time zone and sends a calendar
              invite with the call link.
            </p>
            <a
              href={profile.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <CalendarDays className="size-4" aria-hidden="true" />
              Book a 30-minute call
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens cal.com in a new tab)</span>
            </a>
          </div>
        </div>
        <aside aria-labelledby="direct-title" className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
          <h2 id="direct-title" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Or reach me directly
          </h2>
          <ul className="flex flex-col">
            <li className="flex flex-col gap-1 border-t border-border py-4">
              <span className="text-sm text-muted-foreground">Email</span>
              <a href={`mailto:${profile.email}`} className="break-all font-medium underline underline-offset-4 hover:text-primary">
                {profile.email}
              </a>
            </li>
            <li className="flex flex-col gap-1 border-y border-border py-4">
              <span className="text-sm text-muted-foreground">LinkedIn</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium underline underline-offset-4 hover:text-primary"
              >
                {profile.linkedinLabel}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">Based in {profile.location}.</p>
        </aside>
      </div>
    </PageSection>
  )
}
