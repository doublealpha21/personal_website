'use client'

import Image from 'next/image'
import { useState } from 'react'
import { TitleCard } from './title-card'
import { cn } from '@/lib/utils'

type CoverImageProps = {
  src: string | null
  title: string
  label: string
  priority?: boolean
  sizes: string
  className?: string
}

/** Fixed-ratio cover. Falls back to the title card if the image is missing or fails, with no layout shift. */
export function CoverImage({ src, title, label, priority, sizes, className }: CoverImageProps) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={cn('relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-muted', className)}>
      {src && !failed ? (
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <TitleCard title={title} label={label} />
      )}
    </div>
  )
}
