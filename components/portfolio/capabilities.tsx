import { capabilities, credentials } from '@/lib/portfolio-data'
import { SectionHeading } from './section-heading'

export function Capabilities({
  code = 'Sheet 04 — Capabilities',
  title = 'The toolkit, and where it came from.',
}: { code?: string; title?: string } = {}) {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="scroll-mt-16 border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          id="capabilities-title"
          code={code}
          title={title}
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Education and credentials
          </h3>
          <ul className="flex flex-col">
            {credentials.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-1 border-t border-border py-4 md:flex-row md:items-baseline md:gap-8"
              >
                <span className="font-mono text-xs text-muted-foreground md:w-40 md:shrink-0">{item.date}</span>
                <span className="flex flex-1 flex-col gap-1">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.issuer}
                    {item.note ? ` · ${item.note}` : ''}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
