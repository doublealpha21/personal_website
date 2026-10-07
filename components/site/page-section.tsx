import { cn } from '@/lib/utils'

export function PageSection({
  children,
  className,
  tone = 'plain',
  ...props
}: React.ComponentProps<'section'> & { tone?: 'plain' | 'card' }) {
  return (
    <section {...props} className={cn('scroll-mt-16', tone === 'card' && 'border-t border-border bg-card', className)}>
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-16 md:px-8 md:py-24">{children}</div>
    </section>
  )
}
