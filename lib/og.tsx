import { ImageResponse } from 'next/og'
import { profile } from '@/lib/portfolio-data'

export const ogSize = { width: 1200, height: 630 }

/** Open Graph card in the site palette, for link previews on LinkedIn and WhatsApp. */
export function ogCard({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#eceee9',
          color: '#11151c',
          padding: '64px 72px',
          borderLeft: '16px solid #1d3cc9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 26, color: '#565d68' }}>
          <div
            style={{
              display: 'flex',
              width: 52,
              height: 52,
              alignItems: 'center',
              justifyContent: 'center',
              background: '#1d3cc9',
              color: '#f6f7f3',
              fontSize: 22,
              borderRadius: 4,
            }}
          >
            PF
          </div>
          <span>{label}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: title.length > 60 ? 54 : 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ display: 'flex', fontSize: 30, color: '#565d68', lineHeight: 1.3 }}>
              {subtitle.length > 140 ? `${subtitle.slice(0, 137)}…` : subtitle}
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#565d68', borderTop: '2px solid #11151c', paddingTop: 20 }}>
          <span>{profile.name}</span>
          <span>{profile.role}</span>
        </div>
      </div>
    ),
    ogSize,
  )
}
