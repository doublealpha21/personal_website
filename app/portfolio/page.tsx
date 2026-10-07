import type { Metadata } from 'next'
import { SiteHeader } from '@/components/portfolio/site-header'
import { Hero } from '@/components/portfolio/hero'
import { Results } from '@/components/portfolio/results'
import { DualTrackTimeline } from '@/components/portfolio/dual-track-timeline'
import { CaseStudies } from '@/components/portfolio/case-studies'
import { Capabilities } from '@/components/portfolio/capabilities'
import { SiteFooter } from '@/components/portfolio/site-footer'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'One-page portfolio of Praise Fakorede: engineering and operations work across fintech, health-tech, proptech, Web3, live events and energy.',
  alternates: { canonical: '/portfolio' },
}

/** The original one-page portfolio, kept intact so it can be shared on its own. */
export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <DualTrackTimeline />
        <Results />
        <CaseStudies />
        <Capabilities />
      </main>
      <SiteFooter />
    </>
  )
}
