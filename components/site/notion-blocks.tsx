import Image from 'next/image'
import type { Block } from '@/lib/content'
import type { RichText as RichTextItem } from '@/lib/content/schema'

function isExternal(href: string) {
  return /^https?:\/\//.test(href)
}

export function RichText({ items }: { items: RichTextItem[] }) {
  return (
    <>
      {items.map((item, i) => {
        let node: React.ReactNode = item.text
        if (item.code) node = <code>{node}</code>
        if (item.bold) node = <strong>{node}</strong>
        if (item.italic) node = <em>{node}</em>
        if (item.strike) node = <s>{node}</s>
        if (item.underline) node = <u>{node}</u>
        if (item.href) {
          node = isExternal(item.href) ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {node}
            </a>
          ) : (
            <a href={item.href}>{node}</a>
          )
        }
        return <span key={i}>{node}</span>
      })}
    </>
  )
}

function Children({ blocks }: { blocks?: Block[] }) {
  return blocks?.length ? <NotionBlocks blocks={blocks} /> : null
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'paragraph':
      if (!block.text.length && !block.children?.length) return null
      return (
        <>
          <p>
            <RichText items={block.text} />
          </p>
          {block.children?.length ? (
            <div className="pl-6">
              <Children blocks={block.children} />
            </div>
          ) : null}
        </>
      )
    case 'heading_2':
      return (
        <h2>
          <RichText items={block.text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3>
          <RichText items={block.text} />
        </h3>
      )
    case 'heading_4':
      return (
        <h4>
          <RichText items={block.text} />
        </h4>
      )
    case 'quote':
      return (
        <blockquote>
          <p>
            <RichText items={block.text} />
          </p>
          <Children blocks={block.children} />
        </blockquote>
      )
    case 'bulleted_list':
    case 'numbered_list': {
      const List = block.type === 'bulleted_list' ? 'ul' : 'ol'
      return (
        <List>
          {block.items.map((item) => (
            <li key={item.id}>
              <RichText items={item.text} />
              <Children blocks={item.children} />
            </li>
          ))}
        </List>
      )
    }
    case 'todo':
      return (
        <p className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-1.5 inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-foreground text-[10px] leading-none"
          >
            {block.checked ? '✓' : ''}
          </span>
          <span>
            <span className="sr-only">{block.checked ? 'Done: ' : 'To do: '}</span>
            <RichText items={block.text} />
          </span>
        </p>
      )
    case 'callout':
      return (
        <aside className="notion-callout">
          {block.icon ? (
            <span aria-hidden="true" className="text-lg leading-7">
              {block.icon}
            </span>
          ) : null}
          <div className="min-w-0">
            <p>
              <RichText items={block.text} />
            </p>
            <Children blocks={block.children} />
          </div>
        </aside>
      )
    case 'code':
      return (
        <figure>
          <div className="notion-scroll" tabIndex={0} role="region" aria-label={`Code, ${block.language}`}>
            <pre>
              <code>{block.code}</code>
            </pre>
          </div>
          {block.caption.length ? (
            <figcaption>
              <RichText items={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      )
    case 'divider':
      return <hr />
    case 'image': {
      const alt = block.caption.map((c) => c.text).join('')
      return (
        <figure>
          <Image
            src={block.src}
            alt={alt}
            width={1600}
            height={1000}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full rounded-sm border border-border"
          />
          {block.caption.length ? (
            <figcaption>
              <RichText items={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      )
    }
    case 'link':
      return (
        <p>
          <a href={block.href} target="_blank" rel="noopener noreferrer" className="notion-bookmark">
            {block.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      )
    case 'table': {
      const [first, ...rest] = block.rows
      const bodyRows = block.hasHeaderRow ? rest : block.rows
      return (
        <div className="notion-scroll" tabIndex={0} role="region" aria-label="Table">
          <table>
            {block.hasHeaderRow && first ? (
              <thead>
                <tr>
                  {first.map((cell, i) => (
                    <th key={i} scope="col">
                      <RichText items={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {bodyRows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, i) =>
                    block.hasHeaderColumn && i === 0 ? (
                      <th key={i} scope="row">
                        <RichText items={cell} />
                      </th>
                    ) : (
                      <td key={i}>
                        <RichText items={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    case 'toggle':
      return (
        <details>
          <summary>
            <RichText items={block.text} />
          </summary>
          <Children blocks={block.children} />
        </details>
      )
    case 'columns':
      return (
        <div className="grid gap-6 md:grid-flow-col md:auto-cols-fr">
          {block.columns.map((column, i) => (
            <div key={i} className="min-w-0">
              <NotionBlocks blocks={column} />
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

export function NotionBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => (
        <BlockView key={block.id} block={block} />
      ))}
    </>
  )
}
