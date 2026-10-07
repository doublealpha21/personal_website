import { revalidatePath, revalidateTag } from 'next/cache'
import { CONTENT_TAG } from '@/lib/content'

/**
 * Refreshes the site's copy of Notion immediately, instead of waiting for the
 * ten-minute check. Call it with the secret in the query string, for example
 * from a Notion "Send webhook" automation:
 *   https://your-site.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET
 */
async function handle(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  const given = new URL(request.url).searchParams.get('secret')
  if (!secret || given !== secret) {
    return Response.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 })
  }
  revalidateTag(CONTENT_TAG, { expire: 0 })
  revalidatePath('/', 'layout')
  return Response.json({ revalidated: true, at: new Date().toISOString() })
}

export const GET = handle
export const POST = handle
