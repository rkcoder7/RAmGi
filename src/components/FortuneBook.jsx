import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { fortunes } from '../data/fortunes.js'
import { useProgress } from '../context/ProgressContext.jsx'

export default function FortuneBook() {
  const { setFlag } = useProgress()
  const [fortune, setFortune] = useState(null)
  const [count, setCount] = useState(0)
  const deck = useRef([])

  const draw = () => {
    if (deck.current.length === 0) {
      deck.current = fortunes.map((_, index) => index).sort(() => Math.random() - 0.5)
    }
    setFortune(fortunes[deck.current.pop()])
    setCount((value) => value + 1)
    setFlag('fortune')
  }

  return (
    <section aria-labelledby="fortune-heading" className="mx-auto w-full max-w-3xl text-center">
      <h2 id="fortune-heading" className="text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        The fortune book
      </h2>
      <p className="mx-auto mt-5 max-w-xl font-display text-[1.4rem] italic text-ink/85">
        Forty fortunes, shuffled every time. Open the book and see which page it falls on.
      </p>
      <div className="mx-auto mt-10 min-h-[14rem] max-w-xl" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={count}
            className="letter-paper flex min-h-[14rem] items-center justify-center rounded-xl p-8"
            initial={{ opacity: 0, rotateX: -50, y: -20 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            style={{ transformPerspective: 900, transformOrigin: 'top center' }}
            transition={{ duration: 0.6, ease: [0.22, 0.8, 0.24, 1] }}
          >
            <p className="font-display text-[clamp(1.7rem,4.4vw,2.4rem)] italic leading-snug text-ink">
              {fortune || 'The book is closed. Open it whenever you like.'}
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
        <BookOpen aria-hidden="true" size={20} />
        {fortune ? 'Turn to another page' : 'Open the fortune book'}
      </motion.button>
      {count > 0 && <p className="mt-4 text-sm text-ink/70">Pages turned: {count}</p>}
    </section>
  )
}
