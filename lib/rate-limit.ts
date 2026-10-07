import 'server-only'

/**
 * Basic in-memory rate limit: a few messages per visitor per window.
 * Serverless instances do not share memory, so this is a speed bump rather than
 * a hard guarantee. The honeypot field does most of the spam filtering.
 */
const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5
const hits = new Map<string, number[]>()

export function rateLimit(key: string) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= LIMIT) {
    hits.set(key, recent)
    return { ok: false, retryInMinutes: Math.ceil((WINDOW_MS - (now - recent[0])) / 60000) }
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) hits.clear()
  return { ok: true, retryInMinutes: 0 }
}
