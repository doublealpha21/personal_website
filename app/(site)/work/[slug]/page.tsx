import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EntryArticle } from '@/components/site/entry-article'
import { getAllWork, getWorkBySlug, getAdjacent } from '@/lib/content'

export const revalidate = 600
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getAllWork()).map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = (await getAllWork()).find((e) => e.slug === slug)
  if (!entry) return { title: 'Not found', robots: { index: false } }
  const description = entry.summary || entry.subtitle || undefined
  return {
    title: entry.title,
    description,
    alternates: { canonical: `/work/${entry.slug}` },
    openGraph: {
      type: 'article',
      title: entry.title,
      description,
      publishedTime: entry.publishDate,
      modifiedTime: entry.updatedAt,
      tags: entry.tags,
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const entry = await getWorkBySlug(slug)
  if (!entry) notFound()
  const { newer, older } = await getAdjacent('work', slug)
  return <EntryArticle entry={entry} newer={newer} older={older} showReadingTime={false} />
}
