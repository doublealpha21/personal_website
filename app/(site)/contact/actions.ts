'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { contactSchema, type ContactState, type ContactValues } from '@/lib/contact'
import { rateLimit } from '@/lib/rate-limit'

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values: ContactValues = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    subject: String(formData.get('subject') ?? ''),
    message: String(formData.get('message') ?? ''),
  }

  // Honeypot: people never see this field, bots usually fill it. Pretend it worked.
  if (String(formData.get('company') ?? '').trim()) {
    return { status: 'sent', values: { name: '', email: '', subject: '', message: '' }, errors: {} }
  }

  const parsed = contactSchema.safeParse(values)
  if (!parsed.success) {
    const errors: ContactState['errors'] = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactValues
      if (!errors[field]) errors[field] = issue.message
    }
    return { status: 'invalid', values, errors }
  }

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  const limit = rateLimit(ip)
  if (!limit.ok) {
    return {
      status: 'error',
      values,
      errors: {},
      message: `Too many messages from this connection. Try again in ${limit.retryInMinutes} minutes, or email me directly.`,
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !to) {
    console.error('[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set.')
    return { status: 'error', values, errors: {}, message: 'The form is not connected yet, so the message was not sent.' }
  }

  const { name, email, subject, message } = parsed.data
  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'Website contact form <onboarding@resend.dev>',
      to: [to],
      replyTo: email,
      subject: `[Website] ${subject}`,
      text: `${message}\n\n${name}\n${email}`,
    })
    if (error) throw new Error(error.message)
  } catch (error) {
    console.error('[contact] Send failed:', error)
    return { status: 'error', values, errors: {}, message: 'The message did not send.' }
  }

  return { status: 'sent', values: { name: '', email: '', subject: '', message: '' }, errors: {} }
}
