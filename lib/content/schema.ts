import { z } from 'zod'

export const entryTypeSchema = z.enum(['work', 'writing'])
export type EntryType = z.infer<typeof entryTypeSchema>

/**
 * One schema for case studies and writing. Every content source
 * (Notion today, anything else later) must produce entries in this shape.
 */
export const entrySchema = z.object({
  id: z.string().min(1),
  type: entryTypeSchema,
  slug: z
    .string()
    .min(1, 'Slug is empty')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers and hyphens'),
  title: z.string().trim().min(1, 'Title is empty'),
  subtitle: z.string().trim().default(''),
  summary: z.string().trim().default(''),
  tags: z.array(z.string().trim().min(1)).default([]),
  publishDate: z.iso.date('Publish date is missing'),
  coverImage: z.string().nullable(),
  featured: z.boolean().default(false),
  role: z.string().nullable().default(null),
  substackUrl: z.url().nullable().default(null),
  updatedAt: z.string(),
})

export type Entry = z.infer<typeof entrySchema>

/** Rendered body, kept separate so list pages never pay for it. */
export type RichText = {
  text: string
  href: string | null
  bold: boolean
  italic: boolean
  strike: boolean
  underline: boolean
  code: boolean
}

export type Block =
  | { id: string; type: 'paragraph' | 'quote' | 'heading_2' | 'heading_3' | 'heading_4'; text: RichText[]; children?: Block[] }
  | { id: string; type: 'bulleted_list' | 'numbered_list'; items: { id: string; text: RichText[]; children?: Block[] }[] }
  | { id: string; type: 'todo'; text: RichText[]; checked: boolean }
  | { id: string; type: 'callout'; icon: string | null; text: RichText[]; children?: Block[] }
  | { id: string; type: 'code'; language: string; code: string; caption: RichText[] }
  | { id: string; type: 'divider' }
  | { id: string; type: 'image'; src: string; caption: RichText[] }
  | { id: string; type: 'link'; href: string; label: string }
  | { id: string; type: 'table'; hasHeaderRow: boolean; hasHeaderColumn: boolean; rows: RichText[][][] }
  | { id: string; type: 'toggle'; text: RichText[]; children?: Block[] }
  | { id: string; type: 'columns'; columns: Block[][] }

export type EntryWithBody = Entry & { blocks: Block[]; readingMinutes: number }
