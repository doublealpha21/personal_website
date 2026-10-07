'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/site'
import { profile } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteNav() {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDetailsElement>(null)

  // Close the mobile menu after navigating or on Escape.
  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false
  }, [pathname])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && menuRef.current?.open) {
        menuRef.current.open = false
        menuRef.current.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4">
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-sm bg-primary font-mono text-xs font-medium text-primary-foreground"
          >
            PF
          </span>
          <span className="text-sm font-semibold">{profile.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href)
              const isContact = link.href === '/contact'
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'font-mono text-xs uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-4',
                      isContact
                        ? 'rounded-sm border border-foreground px-3 py-1.5 hover:bg-foreground hover:text-background'
                        : 'text-muted-foreground hover:text-foreground',
                      active && !isContact && 'text-foreground underline decoration-primary decoration-2 underline-offset-8',
                      active && isContact && 'bg-foreground text-background',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <details ref={menuRef} className="group lg:hidden">
          <summary
            className="flex cursor-pointer list-none items-center gap-2 rounded-sm border border-foreground px-3 py-1.5 font-mono text-xs uppercase tracking-widest focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden"
            aria-label="Menu"
          >
            <Menu className="size-4 group-open:hidden" aria-hidden="true" />
            <X className="hidden size-4 group-open:block" aria-hidden="true" />
            <span aria-hidden="true">Menu</span>
          </summary>
          <nav aria-label="Main" className="absolute inset-x-0 top-full border-b border-border bg-background">
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2 md:px-8">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href)
                return (
                  <li key={link.href} className="border-t border-border first:border-t-0">
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between py-4 text-lg font-medium focus-visible:outline-2 focus-visible:outline-offset-2',
                        active ? 'text-primary' : 'text-foreground',
                      )}
                    >
                      {link.label}
                      {active ? <span className="font-mono text-xs uppercase tracking-widest">Current</span> : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  )
}
