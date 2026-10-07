import Link from 'next/link'
import { cn } from '@/lib/utils'

const base = 'inline-block max-w-full break-words rounded-sm px-2 py-1 font-mono text-xs'

export function TagChip({ children, href, active }: { children: React.ReactNode; href?: string; active?: boolean }) {
  if (!href) return <span className={cn(base, 'bg-secondary text-secondary-foreground')}>{children}</span>
  return (
    <Link
      href={href}
      aria-current={active ? 'true' : undefined}
      scroll={false}
      className={cn(
        base,
        'border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground',
      )}
    >
      {children}
    </Link>
  )
}
