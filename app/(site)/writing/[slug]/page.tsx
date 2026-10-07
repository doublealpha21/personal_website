import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EntryArticle } from '@/components/site/entry-article'
import { getAllPosts, getPostBySlug, getAdjacent } from '@/lib/content'

export const revalidate = 600
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getAllPosts()).map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = (await getAllPosts()).find((e) => e.slug === slug)
  if (!entry) return { title: 'Not found', robots: { index: false } }
  const description = entry.summary || entry.subtitle || undefined
  return {
    title: entry.title,
    description,
    alternates: { canonical: `/writing/${entry.slug}` },
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
  const entry = await getPostBySlug(slug)
  if (!entry) notFound()
  const { newer, older } = await getAdjacent('writing', slug)
  return <EntryArticle entry={entry} newer={newer} older={older} showReadingTime={true} />
}
