import { TagChip } from './tag-chip'

export function TagFilter({ basePath, tags, active }: { basePath: string; tags: string[]; active: string | null }) {
  if (!tags.length) return null
  return (
    <nav aria-label="Filter by tag">
      <ul className="flex flex-wrap gap-2">
        <li>
          <TagChip href={basePath} active={!active}>
            All
          </TagChip>
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <TagChip
              href={`${basePath}?tag=${encodeURIComponent(tag.toLowerCase())}`}
              active={active?.toLowerCase() === tag.toLowerCase()}
            >
              {tag}
            </TagChip>
          </li>
        ))}
      </ul>
    </nav>
  )
}
