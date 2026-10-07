import type { Metadata } from 'next'
import { DualTrackTimeline } from '@/components/portfolio/dual-track-timeline'
import { CaseStudies } from '@/components/portfolio/case-studies'
import { getWorkByRole } from '@/lib/content'
import { roles } from '@/lib/portfolio-data'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Every engineering and operations role Praise Fakorede has held since 2022, on one two-track timeline.',
  alternates: { canonical: '/experience' },
}

export default async function ExperiencePage() {
  const byRole = await getWorkByRole()

  // A case study links to a role when its Notion "Role" matches the role id or organisation name.
  const caseStudyLinks: Record<string, string> = {}
  for (const role of roles) {
    const match = byRole[role.id] ?? byRole[role.org.toLowerCase()]
    if (match) caseStudyLinks[role.id] = `/work/${match.slug}`
  }

  return (
    <>
      <h1 className="sr-only">Experience</h1>
      <DualTrackTimeline code="Sheet 01 — Timeline" />
      <CaseStudies
        code="Sheet 02 — Roles"
        title="What I built, and what changed."
        caseStudyLinks={caseStudyLinks}
      />
    </>
  )
}
