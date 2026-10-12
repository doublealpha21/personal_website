// Wordmarks set in the site type rather than brand logo files, so the strip stays
// on-style and needs no third-party assets. Each note says what the connection was.
const organisations = [
  { name: 'v0 by Vercel', note: 'v0 IRL, Lagos' },
  { name: 'Harvard Aspire', note: 'Leaders Program, Cohort 5' },
  { name: 'PixelCrest', note: 'Qcast, UK' },
  { name: 'Blueroomcare', note: 'Health-tech' },
  { name: 'Hugheston', note: 'Energy' },
]

export function LogoStrip() {
  return (
    <section aria-labelledby="logo-strip-title" className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:gap-12 md:px-8">
        <h2
          id="logo-strip-title"
          className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          Worked with
        </h2>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:flex md:flex-1 md:flex-wrap md:items-baseline md:justify-between">
          {organisations.map((org) => (
            <li key={org.name} className="flex flex-col gap-1">
              <span className="text-xl font-semibold tracking-tight">{org.name}</span>
              <span className="font-mono text-xs text-muted-foreground">{org.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
