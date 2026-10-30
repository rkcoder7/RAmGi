import { essay } from '../data/essay.js'
import Reveal from './Reveal.jsx'

export default function EssaySection() {
  return (
    <section aria-labelledby="essay-heading" className="mx-auto w-full max-w-4xl">
      <h2 id="essay-heading" className="text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        {essay.title}
      </h2>
      <p className="mt-5 max-w-2xl font-display text-[1.45rem] italic leading-snug text-ink/90">{essay.intro}</p>
      <ol className="mt-14 grid gap-12">
        {essay.sections.map((section, index) => (
          <Reveal as="li" key={section.title} y={36} className="grid gap-3 sm:grid-cols-[5rem_1fr]">
            <span aria-hidden="true" className="font-display text-5xl text-rose sm:text-6xl">
              {index + 1}
            </span>
            <div>
              <h3 className="text-[clamp(1.8rem,4.4vw,2.6rem)] leading-tight text-ink">{section.title}</h3>
              <p className="mt-3 max-w-2xl font-display text-[1.35rem] leading-relaxed text-ink-soft">{section.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
