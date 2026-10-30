import { almanac } from '../data/almanac.js'
import Reveal from './Reveal.jsx'

export default function AlmanacSection() {
  return (
    <section aria-labelledby="almanac-heading" className="mx-auto w-full max-w-5xl">
      <h2 id="almanac-heading" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        The library almanac
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center font-display text-[1.4rem] italic text-ink/85">
        A year in the library, one month at a time.
      </p>
      <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {almanac.map((entry, index) => (
          <Reveal as="li" key={entry.month} y={40} delay={(index % 2) * 0.1} className="border-t border-ink/20 pt-5">
            <div className="flex items-baseline gap-3">
              <span aria-hidden="true" className="font-display text-4xl text-rose">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[1.9rem] leading-tight text-ink">{entry.month}</h3>
            </div>
            <p className="mt-1 font-display text-xl italic text-gold-deep">{entry.title}</p>
            <p className="mt-3 font-display text-[1.3rem] leading-relaxed text-ink/90">{entry.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
