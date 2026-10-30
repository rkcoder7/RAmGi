import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { chapters } from '../data/chapters.js'
import Reveal from './Reveal.jsx'
import Shot from './Shot.jsx'

export default function NextScene({ id }) {
  const index = chapters.findIndex((chapter) => chapter.id === id)
  const next = chapters[index + 1]
  if (!next) return null
  return (
    <Shot className="items-center text-center">
      <Reveal className="mx-auto max-w-3xl">
        <p className="font-display text-2xl italic text-ink/85">That is the end of this room. Next, the sky carries you to</p>
        <h2 className="mt-4 text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">{next.title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-ink-soft">{next.blurb}</p>
        <Link
          to={next.path}
          className="mt-9 inline-flex min-h-14 items-center gap-3 rounded-full bg-ink px-8 text-lg font-medium text-cream transition hover:bg-ink-soft active:scale-[0.97]"
        >
          Fly there
          <ArrowRight aria-hidden="true" size={20} />
        </Link>
      </Reveal>
    </Shot>
  )
}
