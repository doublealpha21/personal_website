import { roles, type Role, type Track } from '@/lib/portfolio-data'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

const RANGE_START = { year: 2022, month: 7 }
const RANGE_MONTHS = 54
const PRESENT = '2026-10'
const YEARS = [2023, 2024, 2025, 2026]

function monthIndex(value: string) {
  const [year, month] = value.split('-').map(Number)
  return (year - RANGE_START.year) * 12 + (month - RANGE_START.month)
}

function toPercent(months: number) {
  return (months / RANGE_MONTHS) * 100
}

const tracks: { key: Track; label: string; rows: number }[] = [
  { key: 'engineering', label: 'Engineering', rows: 2 },
  { key: 'operations', label: 'Operations', rows: 3 },
]

function Bar({ role, index }: { role: Role; index: number }) {
  const start = monthIndex(role.start)
  const end = monthIndex(role.end ?? PRESENT) + 1
  const left = toPercent(start)
  const width = Math.max(toPercent(end - start), 2.2)
  const isOps = role.track === 'operations'

  return (
    <a
      href={`#role-${role.id}`}
      className={cn(
        'animate-grow group absolute top-1 flex h-9 items-center overflow-hidden rounded-sm px-2 text-xs font-medium transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2',
        isOps ? 'bg-foreground text-background' : 'bg-primary text-primary-foreground',
        role.id === 'v0' && 'bg-accent text-accent-foreground',
      )}
      style={{ left: `${left}%`, width: `${width}%`, animationDelay: `${index * 70}ms` }}
      title={`${role.title}, ${role.org} · ${role.period}`}
    >
      <span className="truncate">{role.end && end - start <= 1 ? '' : role.org}</span>
      <span className="sr-only">
        {role.title}, {role.org}, {role.period}
      </span>
    </a>
  )
}

export function DualTrackTimeline({ code = 'Sheet 01 — Timeline' }: { code?: string } = {}) {
  return (
    <section id="timeline" aria-labelledby="timeline-title" className="scroll-mt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          id="timeline-title"
          code={code}
          title="Two tracks, running in parallel."
          description="Engineering and operations were never sequential. Since 2023 I have shipped software and run delivery at the same time, so each one shapes how I do the other."
        />

        <div className="hidden flex-col gap-0 md:flex" role="img" aria-label="Timeline of engineering and operations roles from 2022 to 2026">
          <div className="flex">
            <div className="w-32 shrink-0" />
            <div className="relative h-6 flex-1">
              {YEARS.map((year) => (
                <span
                  key={year}
                  className="absolute top-0 -translate-x-1/2 font-mono text-xs text-muted-foreground"
                  style={{ left: `${toPercent(monthIndex(`${year}-01`))}%` }}
                >
                  {year}
                </span>
              ))}
            </div>
          </div>

          {tracks.map((track) => {
            const trackRoles = roles.filter((role) => role.track === track.key)
            return (
              <div key={track.key} className="flex border-t border-border">
                <div className="flex w-32 shrink-0 items-start gap-2 py-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-1 size-2.5 rounded-full',
                      track.key === 'operations' ? 'bg-foreground' : 'bg-primary',
                    )}
                  />
                  <span className="font-mono text-xs uppercase tracking-widest">{track.label}</span>
                </div>
                <div className="relative flex-1 py-2">
                  {YEARS.map((year) => (
                    <span
                      key={year}
                      aria-hidden="true"
                      className="absolute inset-y-0 w-px bg-border"
                      style={{ left: `${toPercent(monthIndex(`${year}-01`))}%` }}
                    />
                  ))}
                  {Array.from({ length: track.rows }).map((_, row) => (
                    <div key={row} className="relative h-11">
                      {trackRoles
                        .filter((role) => role.row === row)
                        .map((role) => (
                          <Bar key={role.id} role={role} index={roles.indexOf(role)} />
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          <div className="flex border-t border-foreground pt-3">
            <div className="w-32 shrink-0" />
            <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2.5 rounded-sm bg-primary" /> Mobile engineering
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2.5 rounded-sm bg-foreground" /> Operations and strategy
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2.5 rounded-sm bg-accent" /> v0 IRL, Feb 2026
              </span>
              <span className="ml-auto">Select a bar to jump to the role</span>
            </div>
          </div>
        </div>

        <ol className="flex flex-col md:hidden">
          {[...roles]
            .sort((a, b) => b.start.localeCompare(a.start))
            .map((role) => (
              <li key={role.id} className="border-t border-border">
                <a href={`#role-${role.id}`} className="flex items-start gap-3 py-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-1.5 size-2.5 shrink-0 rounded-full',
                      role.track === 'operations' ? 'bg-foreground' : 'bg-primary',
                      role.id === 'v0' && 'bg-accent',
                    )}
                  />
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="text-sm font-medium">{role.org}</span>
                    <span className="text-sm text-muted-foreground">{role.title}</span>
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{role.period}</span>
                </a>
              </li>
            ))}
        </ol>
      </div>
    </section>
  )
}
