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
  // Sent to clients directly, so keep it out of search results.
  robots: { index: false, follow: false },
}

/** The original one-page portfolio, unlinked from the site and sent to clients directly as a deck. */
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
