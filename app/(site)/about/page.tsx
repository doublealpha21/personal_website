import type { Metadata } from 'next'
import Image from 'next/image'
import { Capabilities } from '@/components/portfolio/capabilities'
import { SectionHeader } from '@/components/site/section-header'
import { PageSection } from '@/components/site/page-section'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Praise Fakorede runs operations, with an engineering background as the advantage. The story, capabilities, education and credentials.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageSection aria-labelledby="about-title" className="bg-grid border-b border-border">
        <SectionHeader
          as="h1"
          id="about-title"
          code="Sheet 01 — About"
          title="Operations is the job. Engineering is the edge."
        />
        <div className="grid gap-10 md:grid-cols-12">
          <div className="flex max-w-prose flex-col gap-6 text-lg leading-relaxed md:col-span-8">
            <p>
              I run operations. Roadmaps, service delivery, vendors, SLAs and policy, for teams whose work has grown
              faster than the systems behind it. Since 2023 I have led operations at BCP Origins, where I built the
              operating roadmap for a team spread across five hubs in Nigeria and the UK and a service framework that
              has held an 85% satisfaction rating for three years.
            </p>
            <p>
              What I bring to the job is an engineer&apos;s training. I studied industrial and production engineering at
              the Federal University of Technology Akure, then spent three years shipping production mobile apps: a
              refactor of a live health-tech codebase, a proptech MVP built from scratch in four months, and the
              modernisation of a video-first product for a UK company. I can read the systems a business runs on, talk
              to its engineers in their own terms, and scope technical work honestly.
            </p>
            <p>
              That shows up in the operations work. At Hugheston Energies the CEO brought me in as an executive
              assistant and kept handing me the next unsolved problem, from designing the Solar division to building the
              back office for the Energy Trading desk. At v0 by Vercel&apos;s live AI training in Lagos I ran technical
              operations, sitting between the instructor and the logistics team so the room stayed stable.
            </p>
            <p className="text-muted-foreground">
              Engineering taught me to look for the structural gap before touching the process layer. Operations is
              where that gets tested, because a roadmap or a service framework only counts if it holds when a live
              event, a vendor or a client puts it under pressure.
            </p>
          </div>
          <figure className="flex w-48 flex-col gap-2 md:col-span-4 md:w-auto md:max-w-64 md:justify-self-end">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-muted">
              <Image
                src="/images/bcp-coordination.jpg"
                alt="Praise coordinating with a lanyard-wearing team member during a BCP Origins event in Akure"
                fill
                sizes="(min-width: 768px) 256px, 192px"
                className="object-cover"
              />
            </div>
            <figcaption className="font-mono text-xs text-muted-foreground">At a BCP Origins event, Akure</figcaption>
          </figure>
        </div>
      </PageSection>
      <Capabilities code="Sheet 02 — Capabilities" />
    </>
  )
}
