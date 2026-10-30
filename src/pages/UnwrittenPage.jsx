import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Library, RotateCcw } from 'lucide-react'
import { letter } from '../data/letter.js'
import { useProgress } from '../context/ProgressContext.jsx'
import ChapterHeader from '../components/ChapterHeader.jsx'
import Constellation from '../components/Constellation.jsx'
import LetterBook from '../components/LetterBook.jsx'
import LibraryCard from '../components/LibraryCard.jsx'
import Shot from '../components/Shot.jsx'
import Sunrise from '../components/Sunrise.jsx'
import Wishes from '../components/Wishes.jsx'

export default function UnwrittenPage() {
  const { setFlag } = useProgress()
  const [letterOpen, setLetterOpen] = useState(false)
  const [instant, setInstant] = useState(false)
  const [runId, setRunId] = useState(0)
  const letterRef = useRef(null)

  const onComplete = useCallback(() => {}, [])

  const openLetter = () => {
    setInstant(true)
    setLetterOpen(true)
    setFlag('letter')
    window.setTimeout(() => {
      letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }

  const replay = () => {
    setLetterOpen(false)
    setInstant(false)
    setRunId((value) => value + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <ChapterHeader id="unwritten">
        Seven chapters have found their place among the stars. Follow the lights, or open the letter that has been waiting for you.
      </ChapterHeader>

      <Shot className="items-center" dark>
        <div className="on-dark mx-auto w-full max-w-5xl rounded-[2.5rem] bg-gradient-to-b from-dusk-deep to-dusk px-4 pb-14 pt-12 text-cream shadow-[0_40px_90px_-30px_rgba(23,28,69,0.8)] sm:px-10">
          <h2 className="text-center text-[clamp(2.2rem,6vw,4rem)] leading-[1.02]">The star map</h2>
          <p className="mx-auto mt-4 max-w-lg text-center font-display text-[1.35rem] italic text-cream/85">
            Each light is a room you have visited. Tap one to fly back.
          </p>
          <div className="mt-8">
            <Constellation key={runId} instant={instant} onComplete={onComplete} />
          </div>
          <div className="mt-6 text-center">
            <AnimatePresence initial={false}>
              {!letterOpen && (
                <motion.button
                  key="open"
                  type="button"
                  onClick={openLetter}
                  exit={{ opacity: 0, y: 8 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex min-h-14 items-center gap-3 rounded-full bg-gold px-9 text-lg font-medium text-ink shadow-[0_20px_44px_-14px_rgba(227,192,127,0.6)] transition hover:bg-cream"
                >
                  <BookOpen aria-hidden="true" size={22} />
                  Open Your Letter
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Shot>

      <div ref={letterRef} className="scroll-mt-4" aria-live="polite">
        {letterOpen && (
          <>
            <Shot className="items-center">
              <LetterBook />
            </Shot>
            <Shot className="items-center">
              <Wishes />
            </Shot>
          </>
        )}
      </div>

      {letterOpen && (
        <Shot className="items-center overflow-hidden text-center">
          <Sunrise />
          <motion.section
            aria-label="Closing message"
            className="relative mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1.1, ease: [0.22, 0.8, 0.24, 1] }}
          >
            <p className="font-display text-[1.7rem] italic leading-snug text-ink sm:text-3xl">{letter.finale}</p>
            <span aria-hidden="true" className="mx-auto my-8 block h-px w-24 bg-gold-deep/70" />
            <p className="font-display text-[clamp(3rem,10vw,6.5rem)] leading-none text-ink">{letter.wish}</p>
            <p className="mt-5 text-ink/85">{letter.credit}</p>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                to="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-medium text-cream transition hover:bg-ink-soft active:scale-[0.97]"
              >
                <Library aria-hidden="true" size={18} />
                Revisit the Library
              </Link>
              <button
                type="button"
                onClick={replay}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/50 bg-cream/60 px-7 transition hover:border-ink"
              >
                <RotateCcw aria-hidden="true" size={18} />
                Replay the constellation
              </button>
            </div>
          </motion.section>
        </Shot>
      )}

      {letterOpen && (
        <Shot className="items-center">
          <LibraryCard />
        </Shot>
      )}
    </div>
  )
}
