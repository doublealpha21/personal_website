import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(100, 'Keep your name under 100 characters.'),
  email: z.email('Enter an email address I can reply to, like name@example.com.').trim().max(200),
  subject: z.string().trim().min(2, 'Add a short subject.').max(150, 'Keep the subject under 150 characters.'),
  message: z
    .string()
    .trim()
    .min(10, 'Write a little more so I know how to help (at least 10 characters).')
    .max(5000, 'Keep the message under 5,000 characters.'),
})

export type ContactValues = { name: string; email: string; subject: string; message: string }

export type ContactState = {
  status: 'idle' | 'invalid' | 'error' | 'sent'
  values: ContactValues
  errors: Partial<Record<keyof ContactValues, string>>
  message?: string
}

export const emptyContactState: ContactState = {
  status: 'idle',
  values: { name: '', email: '', subject: '', message: '' },
  errors: {},
}
