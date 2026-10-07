import type { Metadata } from 'next'
import { EntryIndex } from '@/components/site/entry-index'
import { getAllTags, getAllWork } from '@/lib/content'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Work',
  description: 'Case studies by Praise Fakorede on operations, finance and the systems behind them.',
  alternates: { canonical: '/work' },
}

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ tag?: string | string[] }> }) {
  const { tag } = await searchParams
  const [entries, tags] = await Promise.all([getAllWork(), getAllTags('work')])
  return (
    <EntryIndex
      type="work"
      code="Sheet 01 — Work"
      title="Case studies."
      description="How I found the structural gap, what I built, and what changed."
      entries={entries}
      tags={tags}
      activeTag={typeof tag === 'string' ? tag : null}
    />
  )
}
