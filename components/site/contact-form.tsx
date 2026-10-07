'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { sendMessage } from '@/app/(site)/contact/actions'
import { emptyContactState, type ContactValues } from '@/lib/contact'
import { profile } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

const fieldClass =
  'w-full rounded-sm border border-input bg-card px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary aria-invalid:border-destructive'

function Field({
  name,
  label,
  error,
  defaultValue,
  type = 'text',
  multiline,
  autoComplete,
}: {
  name: keyof ContactValues
  label: string
  error?: string
  defaultValue: string
  type?: string
  multiline?: boolean
  autoComplete?: string
}) {
  const errorId = `${name}-error`
  const shared = {
    id: name,
    name,
    defaultValue,
    required: true,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: fieldClass,
  }
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={7} minLength={10} maxLength={5000} className={cn(fieldClass, 'resize-y')} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}
      {error ? (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function SubmitButton({ retry }: { retry: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="inline-flex items-center justify-center self-start rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Sending…' : retry ? 'Try sending again' : 'Send message'}
    </button>
  )
}

export function ContactForm() {
  const [state, action] = useActionState(sendMessage, emptyContactState)
  const v = state.values

  if (state.status === 'sent') {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-sm border border-primary bg-card p-6">
        <p className="text-xl font-semibold">Message sent.</p>
        <p className="leading-relaxed text-muted-foreground">
          Thanks for writing. I read every message and reply from {profile.email}, usually within a few days.
        </p>
      </div>
    )
  }

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(
    `${v.message}\n\n${v.name}`,
  )}`

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      {state.status === 'error' ? (
        <div role="alert" className="flex flex-col gap-2 rounded-sm border border-destructive bg-card p-4 text-sm">
          <p className="font-medium text-destructive">{state.message}</p>
          <p className="text-muted-foreground">
            Your message is still below. Try again, or{' '}
            <a href={mailto} className="font-medium text-primary underline underline-offset-4">
              send it from your email app
            </a>{' '}
            with everything filled in.
          </p>
        </div>
      ) : null}
      {state.status === 'invalid' ? (
        <p role="alert" className="text-sm font-medium text-destructive">
          Check the highlighted fields and send again.
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Name" autoComplete="name" defaultValue={v.name} error={state.errors.name} />
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          defaultValue={v.email}
          error={state.errors.email}
        />
      </div>
      <Field name="subject" label="Subject" defaultValue={v.subject} error={state.errors.subject} />
      <Field name="message" label="Message" multiline defaultValue={v.message} error={state.errors.message} />

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <SubmitButton retry={state.status === 'error'} />
    </form>
  )
}
