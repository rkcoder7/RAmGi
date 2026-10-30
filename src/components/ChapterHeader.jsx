import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { chapters } from '../data/chapters.js'
import Reveal from './Reveal.jsx'
import Shot from './Shot.jsx'
import SplitHeading from './SplitHeading.jsx'

export default function ChapterHeader({ id, children }) {
  const chapter = chapters.find((item) => item.id === id)

  return (
    <Shot className="items-center text-center">
      <div className="mx-auto max-w-5xl">
        <SplitHeading text={chapter.title} className="text-[clamp(2.7rem,9vw,7rem)] leading-[0.98] text-ink" />
        <Reveal delay={0.55} y={0} className="mx-auto mt-7 h-px w-28 bg-gold-deep/70" aria-hidden="true" />
        {children && (
          <Reveal as="p" delay={0.7} className="mx-auto mt-7 max-w-2xl font-display text-[1.45rem] italic leading-snug text-ink/90 sm:text-[1.75rem]">
            {children}
          </Reveal>
        )}
      </div>
      <motion.div
        aria-hidden="true"
        className="absolute bottom-28 left-1/2 flex -translate-x-1/2 flex-col items-center text-sm text-ink/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6 }, y: { duration: 2, repeat: Infinity, delay: 1.6 } }}
      >
        Scroll
        <ChevronDown size={20} />
      </motion.div>
    </Shot>
  )
}
