import { getFreshImageUrl } from '@/lib/content'

/**
 * Notion file links expire after about an hour, so images are served through
 * this route, which asks Notion for a fresh link each time the cache misses.
 * The last segment of the path changes whenever the page is edited, so each
 * URL always maps to one version of the image and can be cached for a long time.
 */

const ID_PATTERN = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i

export async function GET(_request: Request, { params }: { params: Promise<{ kind: string; id: string; version: string }> }) {
  const { kind, id } = await params
  if ((kind !== 'page' && kind !== 'block') || !ID_PATTERN.test(id)) {
    return new Response('Not found', { status: 404 })
  }

  try {
    const url = await getFreshImageUrl(kind, id)
    if (!url) return new Response('Not found', { status: 404 })

    const upstream = await fetch(url, { cache: 'no-store' })
    const type = upstream.headers.get('content-type') ?? ''
    if (!upstream.ok || !upstream.body || !type.startsWith('image/')) {
      return new Response('Image unavailable', { status: 502 })
    }

    return new Response(upstream.body, {
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('[notion-image]', error)
    return new Response('Image unavailable', { status: 502 })
  }
}
