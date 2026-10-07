import { results } from '@/lib/portfolio-data'
import { SectionHeading } from './section-heading'

type ResultsProps = {
  items?: typeof results
  code?: string
  title?: string
  description?: string
}

export function Results({
  items = results,
  code = 'Sheet 02 — Measured output',
  title = 'Results that held.',
  description = 'Each figure comes from a system I designed or a codebase I owned, measured after it went live.',
}: ResultsProps = {}) {
  return (
    <section id="results" aria-labelledby="results-title" className="scroll-mt-16 bg-foreground text-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 md:px-8 md:py-28">
        <div className="[&>div]:border-background [&_p]:text-background/70 [&_span]:text-background/60">
          <SectionHeading
            id="results-title"
            code={code}
            title={title}
            description={description}
          />
        </div>
        <dl className={`grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-background/15 sm:grid-cols-2 ${items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {items.map((result) => (
            <div key={result.label} className="flex flex-col gap-3 bg-foreground p-6 md:p-8">
              <dt className="order-2 flex flex-col gap-1">
                <span className="text-base font-medium">{result.label}</span>
                <span className="text-sm leading-relaxed text-background/60">{result.context}</span>
              </dt>
              <dd className="order-1 font-mono text-4xl font-medium tracking-tight md:text-5xl">{result.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
