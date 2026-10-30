import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { readMinutes } from '../data/stories.js'
import { useProgress } from '../context/ProgressContext.jsx'

export default function StoryBook({ stories }) {
  const { markRead, progress } = useProgress()
  const [storyIndex, setStoryIndex] = useState(0)
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const story = stories[storyIndex]
  const last = story.pages.length - 1

  useEffect(() => {
    if (page === last) markRead(`story:${story.id}`)
  }, [page, last, story.id, markRead])

  const go = (delta) => {
    setDirection(delta)
    setPage((value) => Math.min(last, Math.max(0, value + delta)))
  }

  const choose = (index) => {
    setDirection(1)
    setStoryIndex(index)
    setPage(0)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div role="group" aria-label="Choose a story" className="mb-8 grid gap-2 sm:grid-cols-2">
        {stories.map((item, index) => {
          const done = progress.read.includes(`story:${item.id}`)
          return (
            <motion.button
              key={item.id}
              type="button"
              aria-pressed={index === storyIndex}
              onClick={() => choose(index)}
              whileTap={{ scale: 0.97 }}
              className={`flex min-h-16 items-center justify-between gap-3 rounded-2xl px-4 py-2 text-left transition ${
                index === storyIndex ? 'bg-ink text-cream' : 'bg-cream/80 text-ink hover:bg-white'
              }`}
            >
              <span className="font-display text-xl leading-tight">{item.title}</span>
              <span className="shrink-0 text-xs opacity-80">
                {done ? 'Read' : `${readMinutes(item)} min`}
              </span>
            </motion.button>
          )
        })}
      </div>
      <div className="letter-paper rounded-r-xl rounded-l-sm px-8 py-10 sm:px-14 sm:py-14">
        <h3 className="text-center text-[1.9rem] text-ink sm:text-4xl">{story.title}</h3>
        <span aria-hidden="true" className="mx-auto my-5 block h-px w-16 bg-gold-deep/70" />
        <div className="relative min-h-[17rem] sm:min-h-[15rem]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.p
              key={`${story.id}-${page}`}
              className="font-display text-[1.3rem] leading-[1.7] sm:text-[1.45rem]"
              initial={{ opacity: 0, x: direction * 28, rotateY: direction * 8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: direction * -28 }}
              transition={{ duration: 0.32 }}
            >
              {story.pages[page]}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="mt-6 text-center text-xs text-ink-soft">
          Page {page + 1} of {story.pages.length}
        </p>
      </div>
      <div className="mt-5 flex justify-between gap-3">
        <motion.button
          type="button"
          onClick={() => go(-1)}
          disabled={page === 0}
          whileTap={{ scale: 0.96 }}
          className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/40 px-5 transition hover:border-ink disabled:opacity-35"
        >
          <ChevronLeft aria-hidden="true" size={18} />
          Previous page
        </motion.button>
        <motion.button
          type="button"
          onClick={() => go(1)}
          disabled={page === last}
          whileTap={{ scale: 0.96 }}
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-5 text-cream transition hover:bg-ink-soft disabled:opacity-35"
        >
          Next page
          <ChevronRight aria-hidden="true" size={18} />
        </motion.button>
      </div>
    </div>
  )
}
