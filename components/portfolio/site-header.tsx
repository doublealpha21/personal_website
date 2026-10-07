import { profile } from '@/lib/portfolio-data'

const links = [
  { href: '#timeline', label: 'Timeline' },
  { href: '#results', label: 'Results' },
  { href: '#work', label: 'Work' },
  { href: '#capabilities', label: 'Capabilities' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-sm bg-primary font-mono text-xs font-medium text-primary-foreground"
          >
            PF
          </span>
          <span className="text-sm font-semibold">{profile.name}</span>
        </a>
        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-sm border border-foreground px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
        >
          Contact
        </a>
      </div>
    </header>
  )
}
