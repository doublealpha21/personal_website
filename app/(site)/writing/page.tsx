import type { Metadata } from 'next'
import { EntryIndex } from '@/components/site/entry-index'
import { getAllPosts, getAllTags } from '@/lib/content'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Thoughts by Praise Fakorede on faith, finance, work and growth.',
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
      description="Thoughts on faith, finance, work and growth. A place to think out loud and sharpen my writing."
      entries={entries}
      tags={tags}
      activeTag={typeof tag === 'string' ? tag : null}
    />
  )
}
