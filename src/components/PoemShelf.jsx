import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { poems } from '../data/poems.js'
import { useProgress } from '../context/ProgressContext.jsx'

export default function PoemShelf() {
  const { markRead, progress } = useProgress()
  const [index, setIndex] = useState(0)
  const poem = poems[index]

  const choose = (position) => {
    setIndex(position)
    markRead(`poem:${poems[position].id}`)
  }

  return (
    <section aria-labelledby="poems-heading" className="mx-auto w-full max-w-5xl">
      <h2 id="poems-heading" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        The poetry stacks
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center font-display text-[1.4rem] italic text-ink/85">
        Eight short poems, written for this library. Open one at a time.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-[17rem_1fr]">
        <div role="group" aria-label="Choose a poem" className="grid content-start gap-2">
          {poems.map((item, position) => {
            const read = progress.read.includes(`poem:${item.id}`)
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={position === index}
                onClick={() => choose(position)}
                className={`flex min-h-12 items-center justify-between gap-3 rounded-xl px-4 py-2 text-left transition ${
                  position === index ? 'bg-ink text-cream' : 'bg-cream/80 text-ink hover:bg-white'
                }`}
              >
                <span className="font-display text-xl leading-tight">{item.title}</span>
                {read && <span className="text-xs opacity-75">Read</span>}
              </button>
            )
          })}
        </div>
        <div className="letter-paper min-h-[22rem] rounded-r-xl rounded-l-sm px-8 py-10 sm:px-14" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-center text-[2.1rem] text-ink sm:text-[2.6rem]">{poem.title}</h3>
              <span aria-hidden="true" className="mx-auto my-5 block h-px w-16 bg-gold-deep/70" />
              <div className="text-center font-display text-[1.35rem] italic leading-[1.8] text-ink sm:text-[1.5rem]">
                {poem.lines.map((line, lineIndex) => (line === '' ? <div key={lineIndex} className="h-5" /> : <p key={lineIndex}>{line}</p>))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
