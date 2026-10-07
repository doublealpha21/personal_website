import { getAllWork } from '@/lib/content'
import { ogCard, ogSize } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Case study by Praise Fakorede'
export const revalidate = 600

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = (await getAllWork()).find((e) => e.slug === slug)
  return ogCard({ label: 'Case study', title: entry?.title ?? 'Case study', subtitle: entry?.subtitle || entry?.summary })
}
