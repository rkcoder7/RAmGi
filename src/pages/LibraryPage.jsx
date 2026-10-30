import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { chapters } from '../data/chapters.js'
import { site } from '../data/site.js'
import { useProgress } from '../context/ProgressContext.jsx'
import AlmanacSection from '../components/AlmanacSection.jsx'
import Catalogue from '../components/Catalogue.jsx'
import ChapterIsland from '../components/ChapterIsland.jsx'
import HeroBook from '../components/HeroBook.jsx'
import HiddenBook from '../components/HiddenBook.jsx'
import LibraryCard from '../components/LibraryCard.jsx'
import RulesShelf from '../components/RulesShelf.jsx'
import ScrollStory from '../components/ScrollStory.jsx'
import Shot from '../components/Shot.jsx'
import SplitHeading from '../components/SplitHeading.jsx'
import UniversesCarousel from '../components/UniversesCarousel.jsx'

export default function LibraryPage() {
  const { progress, setEntered, resetProgress } = useProgress()
  const open = progress.entered
  const initiallyOpen = useRef(open)
  const timers = useRef([])
  const islandsRef = useRef(null)

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((id) => window.clearTimeout(id))
  }, [])

  const later = (fn, ms) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const enter = () => {
    setEntered(true)
    later(() => islandsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 1700)
  }

  const replay = () => {
    initiallyOpen.current = false
    setEntered(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    later(() => enter(), 1200)
  }

  const startOver = () => {
    resetProgress()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <Shot className="items-center text-center">
        <SplitHeading
          text={site.title}
          className="mx-auto max-w-5xl text-[clamp(2rem,6.6vw,5.2rem)] uppercase leading-[1.05] tracking-[0.1em] text-ink"
        />
        <motion.span
          aria-hidden="true"
          className="mx-auto mt-6 block h-px w-32 origin-center bg-gold-deep/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.9 }}
        />
        <motion.p
          className="mx-auto mt-6 max-w-2xl font-display text-[1.4rem] italic leading-snug text-ink/90 sm:text-[1.75rem]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
        >
          {site.subtitle}
        </motion.p>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.7, ease: [0.22, 0.8, 0.24, 1] }}
        >
          <HeroBook open={open} />
        </motion.div>
        <div className="relative min-h-14">
          <AnimatePresence mode="wait" initial={false}>
            {!open ? (
              <motion.button
                key="enter"
                type="button"
                onClick={enter}
                className="inline-flex min-h-14 items-center gap-3 rounded-full bg-ink px-9 text-lg font-medium text-cream shadow-[0_20px_44px_-14px_rgba(42,37,82,0.7)] transition hover:bg-ink-soft"
                exit={{ opacity: 0, y: 8 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <BookOpen aria-hidden="true" size={22} />
                Enter the Library
              </motion.button>
            ) : (
              <motion.p
                key="choose"
                className="font-display text-3xl text-ink sm:text-4xl"
                initial={initiallyOpen.current ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: initiallyOpen.current ? 0 : 1.1 }}
              >
                Seven rooms are waiting below
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </Shot>

      {open && (
        <>
          <Shot className="items-center">
            <div ref={islandsRef} className="mx-auto w-full max-w-7xl">
              <h2 className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">Choose where to begin</h2>
              <p className="mx-auto mt-4 max-w-xl text-center font-display text-[1.4rem] italic text-ink/85">
                Every island is a different room. There is no wrong order, and no rush.
              </p>
              <ul className="mt-12 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {chapters.map((chapter, index) => (
                  <motion.li
                    key={chapter.id}
                    className={index % 2 ? 'lg:mt-10' : ''}
                    initial={initiallyOpen.current ? false : { opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 0.8, 0.24, 1], delay: initiallyOpen.current ? 0 : 1.2 + index * 0.1 }}
                  >
                    <ChapterIsland
                      chapter={chapter}
                      current={chapter.id === 'library'}
                      visited={progress.visited.includes(chapter.id) && chapter.id !== 'library'}
                      onReplay={replay}
                    />
                  </motion.li>
                ))}
              </ul>
            </div>
          </Shot>

          <ScrollStory />

          <Shot className="items-center">
            <RulesShelf />
          </Shot>

          <Shot className="items-center">
            <UniversesCarousel />
          </Shot>

          <Shot className="items-center">
            <AlmanacSection />
          </Shot>

          <Shot className="items-center">
            <Catalogue />
          </Shot>

          <Shot className="items-center">
            <LibraryCard />
            <HiddenBook />
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={startOver}
                className="min-h-11 rounded px-4 text-sm text-ink/70 underline decoration-ink/40 underline-offset-4 transition hover:text-ink"
              >
                Start the journey over
              </button>
              <p className="mt-3 text-sm text-ink/70">Made with care by {site.creator} for {site.recipient}.</p>
            </div>
          </Shot>
        </>
      )}
    </div>
  )
}
