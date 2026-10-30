import { useState } from 'react'
import { motion } from 'framer-motion'
import { beliefs } from '../data/beliefs.js'

function Card({ belief, index }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.li
      className="min-h-[13.5rem]"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08 }}
    >
      <button
        type="button"
        aria-pressed={flipped}
        onClick={() => setFlipped((value) => !value)}
        className="relative block h-full min-h-[13.5rem] w-full text-left"
      >
        <motion.span
          className="absolute inset-0 block"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.8, 0.24, 1] }}
        >
          <span
            className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-cream p-6 shadow-[0_20px_44px_-22px_rgba(42,37,82,0.55)]"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="font-display text-4xl text-rose">{String(index + 1).padStart(2, '0')}</span>
            <span className="font-display text-[1.65rem] leading-tight text-ink">{belief.front}</span>
            <span className="text-sm text-ink-soft">{flipped ? '' : 'Tap to turn over'}</span>
          </span>
          <span
            className="absolute inset-0 flex items-center rounded-3xl bg-ink p-6 text-cream shadow-[0_20px_44px_-22px_rgba(42,37,82,0.7)]"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="font-display text-[1.45rem] leading-snug">{belief.back}</span>
          </span>
        </motion.span>
        <span className="sr-only">{flipped ? belief.back : belief.front}</span>
      </button>
    </motion.li>
  )
}

export default function BeliefCards() {
  return (
    <section aria-labelledby="beliefs-heading" className="mx-auto w-full max-w-6xl">
      <h2 id="beliefs-heading" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        Twelve things this archive believes
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center font-display text-[1.4rem] italic text-ink/85">
        Turn each card over for the small print.
      </p>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {beliefs.map((belief, index) => (
          <Card key={belief.id} belief={belief} index={index} />
        ))}
      </ul>
    </section>
  )
}
