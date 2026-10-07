import type { Metadata } from 'next'
import Image from 'next/image'
import { Capabilities } from '@/components/portfolio/capabilities'
import { SectionHeader } from '@/components/site/section-header'
import { PageSection } from '@/components/site/page-section'
import { profile } from '@/lib/portfolio-data'

export const metadata: Metadata = {
  title: 'About',
  description:
    'How Praise Fakorede combines mobile engineering and operations, plus capabilities, education and credentials.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageSection aria-labelledby="about-title" className="bg-grid border-b border-border">
        <SectionHeader as="h1" id="about-title" code="Sheet 01 — About" title="Two tracks, one way of working." />
        <div className="grid gap-10 md:grid-cols-12">
          <div className="flex max-w-prose flex-col gap-6 text-lg leading-relaxed md:col-span-8">
            <p>
              I trained as an industrial and production engineer at the Federal University of Technology Akure, where
              the coursework covered operations management, project management and organisational behaviour. I started
              shipping mobile products in 2022, building in Flutter for a digital mental health platform, and by
              mid-2023 I was also running operations for BCP Origins.
            </p>
            <p>
              Since then the two tracks have run in parallel. On the engineering side I refactored a live health-tech
              codebase, built a proptech MVP from scratch in four months and led the modernisation of a video-first
              product for a UK company. On the operations side I built the operating roadmap for a team spread across
              five hubs in Nigeria and the UK, moved through four roles in thirteen months at an energy company, and
              ran technical operations for v0 by Vercel&apos;s live AI training in Lagos.
            </p>
            <p className="text-muted-foreground">
              Engineering taught me to look for the structural gap before touching the process layer, and that is how
              I approach an operation that is struggling. Operations keeps that thinking practical, because a roadmap or
              a service framework only counts if it holds when a live event, a vendor or a client puts it under
              pressure.
            </p>
          </div>
          <figure className="flex w-48 flex-col gap-2 md:col-span-4 md:w-auto md:max-w-64 md:justify-self-end">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-muted">
              <Image
                src="/images/bcp-coordination.jpg"
                alt="Praise coordinating with a lanyard-wearing team member during a BCP Origins event"
                fill
                sizes="(min-width: 768px) 256px, 192px"
                className="object-cover"
              />
            </div>
            <figcaption className="font-mono text-xs text-muted-foreground">At a BCP Origins event, {profile.location}</figcaption>
          </figure>
        </div>
      </PageSection>
      <Capabilities code="Sheet 02 — Capabilities" />
    </>
  )
}
