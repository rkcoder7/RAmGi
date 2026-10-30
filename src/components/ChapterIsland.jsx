import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { ChapterEmblem } from './Emblem.jsx'

export default function ChapterIsland({ chapter, visited, current, onReplay }) {
  const style = { '--tint': chapter.tint, '--deep': chapter.deep }

  const body = (
    <>
      <span className="island-float block" style={{ animationDelay: `${chapter.number * -0.9}s` }}>
        <span className="island" style={style}>
          <span className="island-glow" />
          <span className="island-top" />
          <span className="island-rock" />
          <ChapterEmblem id={chapter.id} className="absolute left-1/2 top-[22%] size-14 -translate-x-1/2 text-ink" />
          {visited && (
            <span role="img" aria-label="Visited" className="absolute right-[12%] top-[34%] grid size-6 place-items-center rounded-full bg-ink text-cream">
              <Check aria-hidden="true" size={14} />
            </span>
          )}
        </span>
      </span>
      <span className="mt-3 block text-center font-display text-[1.65rem] leading-[1.05] text-ink">{chapter.title}</span>
      <span className="mt-2 block text-center text-sm leading-snug text-ink-soft">
        {current ? 'You are here. Tap to watch the book open again.' : chapter.blurb}
      </span>
    </>
  )

  if (current) {
    return (
      <button
        type="button"
        onClick={onReplay}
        className="island-link block w-full rounded-2xl p-2"
        aria-label={`Chapter ${chapter.number}: ${chapter.title}. You are here. Replay the opening.`}
      >
        {body}
      </button>
    )
  }

  return (
    <Link to={chapter.path} className="island-link block rounded-2xl p-2">
      {body}
    </Link>
  )
}
