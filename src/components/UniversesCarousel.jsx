import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { universes } from '../data/universes.js'

export default function UniversesCarousel() {
  const ref = useRef(null)

  const scrollBy = (direction) => {
    const node = ref.current
    if (!node) return
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.8, 360), behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="universes-heading" className="mx-auto w-full max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="universes-heading" className="text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
            Twelve little universes
          </h2>
          <p className="mt-4 max-w-xl font-display text-[1.4rem] italic text-ink/85">
            Each shelf holds a tiny world. Swipe, scroll, or use the arrows.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll universes left" className="grid size-12 place-items-center rounded-full bg-ink text-cream transition hover:bg-ink-soft active:scale-95">
            <ChevronLeft aria-hidden="true" size={22} />
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll universes right" className="grid size-12 place-items-center rounded-full bg-ink text-cream transition hover:bg-ink-soft active:scale-95">
            <ChevronRight aria-hidden="true" size={22} />
          </button>
        </div>
      </div>
      <ul
        ref={ref}
        tabIndex={0}
        aria-label="Little universes"
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:thin]"
      >
        {universes.map((item, index) => (
          <li
            key={item.id}
            className="min-h-[19rem] w-[78vw] shrink-0 snap-start rounded-3xl bg-cream p-7 shadow-[0_24px_50px_-24px_rgba(42,37,82,0.55)] sm:w-[22rem]"
            style={{ transform: `rotate(${index % 2 ? 0.8 : -0.8}deg)` }}
          >
            <span className="font-display text-5xl text-rose">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 text-[1.9rem] leading-[1.05] text-ink">{item.title}</h3>
            <p className="mt-4 font-display text-[1.3rem] leading-snug text-ink/90">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
