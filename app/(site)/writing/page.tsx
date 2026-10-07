import type { Metadata } from 'next'
import { EntryIndex } from '@/components/site/entry-index'
import { getAllPosts, getAllTags } from '@/lib/content'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays and notes by Praise Fakorede on operations, finance and building systems.',
  alternates: { canonical: '/writing' },
}

export default async function WritingPage({ searchParams }: { searchParams: Promise<{ tag?: string | string[] }> }) {
  const { tag } = await searchParams
  const [entries, tags] = await Promise.all([getAllPosts(), getAllTags('writing')])
  return (
    <EntryIndex
      type="writing"
      code="Sheet 01 — Writing"
      title="Writing."
      description="Essays and notes on operations, finance and building systems, published as I write them."
      entries={entries}
      tags={tags}
      activeTag={typeof tag === 'string' ? tag : null}
    />
  )
}
