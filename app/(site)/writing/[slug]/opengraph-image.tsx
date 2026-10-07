import { getAllPosts } from '@/lib/content'
import { ogCard, ogSize } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Writing by Praise Fakorede'
export const revalidate = 600

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = (await getAllPosts()).find((e) => e.slug === slug)
  return ogCard({ label: 'Writing', title: entry?.title ?? 'Writing', subtitle: entry?.subtitle || entry?.summary })
}
