import { getAllPosts, getAllWork } from '@/lib/content'
import { profile } from '@/lib/portfolio-data'
import { CONTENT_REVALIDATE_SECONDS, siteUrl } from '@/lib/site'

export const revalidate = 600

function escape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function GET() {
  const entries = [...(await getAllPosts()), ...(await getAllWork())].sort((a, b) =>
    b.publishDate.localeCompare(a.publishDate),
  )

  const items = entries
    .map((entry) => {
      const url = `${siteUrl}/${entry.type}/${entry.slug}`
      const description = entry.summary || entry.subtitle
      return `    <item>
      <title>${escape(entry.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(entry.publishDate).toUTCString()}</pubDate>
      <category>${entry.type === 'work' ? 'Case study' : 'Writing'}</category>${description ? `\n      <description>${escape(description)}</description>` : ''}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(profile.name)}</title>
    <link>${siteUrl}</link>
    <description>Case studies and writing by ${escape(profile.name)}, ${escape(profile.role.toLowerCase())}.</description>
    <language>en</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': `public, s-maxage=${CONTENT_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
    },
  })
}
