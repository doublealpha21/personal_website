import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { ContactForm } from '@/components/site/contact-form'
import { SectionHeader } from '@/components/site/section-header'
import { PageSection } from '@/components/site/page-section'
import { profile } from '@/lib/portfolio-data'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send Praise Fakorede a message, or reach him by email or LinkedIn.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <PageSection aria-labelledby="contact-title">
      <SectionHeader
        as="h1"
        id="contact-title"
        code="Sheet 01 — Contact"
        title="Send me a message."
        description="Tell me what you are building and where it is getting stuck. I reply to every message, usually within a few days."
      />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <ContactForm />
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
