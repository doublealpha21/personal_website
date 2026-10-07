type SectionHeadingProps = {
  code: string
  title: string
  description?: string
  id: string
  as?: 'h1' | 'h2'
}

export function SectionHeading({ code, title, description, id, as: Heading = 'h2' }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-foreground pt-4 md:flex-row md:items-start md:justify-between md:gap-12">
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{code}</span>
        <Heading
          id={id}
          className={
            Heading === 'h1'
              ? 'text-balance text-4xl font-semibold tracking-tight md:text-6xl'
              : 'text-balance text-3xl font-semibold tracking-tight md:text-4xl'
          }
        >
          {title}
        </Heading>
      </div>
      {description ? (
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground md:pt-7">{description}</p>
      ) : null}
    </div>
  )
}
