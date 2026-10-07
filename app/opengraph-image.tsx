import { ogCard, ogSize } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Praise Fakorede, operator and systems builder'

export default function Image() {
  return ogCard({ label: 'Lagos, Nigeria', title: 'I build the systems that hold under pressure.' })
}
