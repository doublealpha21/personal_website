import { cn } from '@/lib/utils'

/** Neutral cover in the site palette, used when an entry has no cover or it fails to load. */
export function TitleCard({ title, label, className }: { title: string; label: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('bg-grid absolute inset-0 flex flex-col justify-between border-l-4 border-primary bg-secondary p-5', className)}
    >
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="line-clamp-3 text-balance text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
        {title}
      </span>
    </div>
  )
}
