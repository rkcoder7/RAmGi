import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Shuffle } from 'lucide-react'
import { prompts } from '../data/prompts.js'

export default function PromptDeck() {
  const [index, setIndex] = useState(null)
  const [count, setCount] = useState(0)

  const draw = () => {
    setIndex((current) => {
      let next = Math.floor(Math.random() * prompts.length)
      if (next === current) next = (next + 1) % prompts.length
      return next
    })
    setCount((value) => value + 1)
  }

  return (
    <section aria-labelledby="deck-heading" className="mx-auto w-full max-w-3xl text-center">
      <h2 id="deck-heading" className="text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        A deck of sketch prompts
      </h2>
      <p className="mx-auto mt-5 max-w-xl font-display text-[1.4rem] italic text-ink/85">
        Sixteen small ideas to draw when a page feels too blank. Pull one from the deck.
      </p>
      <div className="mx-auto mt-10 min-h-[15rem] max-w-xl" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index === null ? 'empty' : index + '-' + count}
            className="flex min-h-[15rem] items-center justify-center rounded-3xl bg-cream p-8 shadow-[0_26px_54px_-24px_rgba(42,37,82,0.6)]"
            initial={{ opacity: 0, rotateY: 80, y: 20 }}
            animate={{ opacity: 1, rotateY: 0, y: 0 }}
            exit={{ opacity: 0, rotateY: -80 }}
            transition={{ duration: 0.45 }}
            style={{ transformPerspective: 900 }}
          >
            <p className="font-display text-[clamp(1.7rem,4.5vw,2.4rem)] leading-tight text-ink">
              {index === null ? 'The deck is face down. Tap the button to turn a card.' : prompts[index]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.button
        type="button"
        onClick={draw}
        whileTap={{ scale: 0.95 }}
        className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-ink px-8 text-lg font-medium text-cream transition hover:bg-ink-soft"
      >
        <Shuffle aria-hidden="true" size={20} />
        {index === null ? 'Draw a prompt' : 'Draw another'}
      </motion.button>
      {count > 0 && <p className="mt-4 text-sm text-ink/70">Prompts drawn so far: {count}</p>}
    </section>
  )
}
