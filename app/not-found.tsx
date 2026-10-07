import Link from 'next/link'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/site-footer'

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <section className="bg-grid border-b border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-24 md:px-8 md:py-32">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Sheet 404 — Not found</span>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              This page does not exist, or it has moved.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Check the link, or go to the case studies and writing to find what you were looking for.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/work" className="rounded-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2">
                Go to Work
              </Link>
              <Link href="/writing" className="rounded-sm border border-foreground px-4 py-3 text-sm font-medium hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2">
                Go to Writing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
