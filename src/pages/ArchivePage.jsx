import { useState } from 'react'
import { Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { bonusMemory, memories } from '../data/memories.js'
import { useProgress } from '../context/ProgressContext.jsx'
import BeliefCards from '../components/BeliefCards.jsx'
import ChapterHeader from '../components/ChapterHeader.jsx'
import MemoryLightbox from '../components/MemoryLightbox.jsx'
import MemoryShot from '../components/MemoryShot.jsx'
import NextScene from '../components/NextScene.jsx'
import Shot from '../components/Shot.jsx'

export default function ArchivePage() {
  const { progress, markOpened } = useProgress()
  const [activeId, setActiveId] = useState(null)

  const opened = new Set(progress.opened)
  const openedCount = memories.filter((memory) => opened.has(memory.id)).length
  const unlocked = openedCount === memories.length
  const all = [...memories, bonusMemory]
  const active = all.find((memory) => memory.id === activeId) || null

  const open = (memory) => {
    markOpened(memory.id)
    setActiveId(memory.id)
  }

  return (
    <div>
      <ChapterHeader id="archive">
        Five small stories from the same row, kept in drawers that only open for you.
      </ChapterHeader>

      <div
        aria-live="polite"
        className="fixed bottom-[8.5rem] left-1/2 z-30 w-[min(20rem,calc(100vw-1.5rem))] -translate-x-1/2 rounded-full bg-cream/90 px-5 py-2 text-center text-sm text-ink shadow-[0_10px_30px_-10px_rgba(42,37,82,0.45)] backdrop-blur sm:bottom-[9.5rem]"
      >
        <span>{unlocked ? 'Every memory opened. A bonus shelf is waiting.' : `${openedCount} of ${memories.length} memories opened`}</span>
        <span className="mt-1 block h-1 overflow-hidden rounded-full bg-ink/10">
          <motion.span
            className="block h-full rounded-full bg-gradient-to-r from-rose to-gold-deep"
            initial={false}
            animate={{ width: `${(openedCount / memories.length) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </span>
      </div>

      {memories.map((memory, index) => (
        <MemoryShot key={memory.id} memory={memory} index={index} opened={opened.has(memory.id)} onOpen={() => open(memory)} />
      ))}

      {unlocked ? (
        <MemoryShot memory={bonusMemory} index={memories.length} bonus opened={opened.has(bonusMemory.id)} onOpen={() => open(bonusMemory)} />
      ) : (
        <Shot className="items-center text-center">
          <div className="mx-auto max-w-xl rounded-3xl border-2 border-dashed border-ink/30 bg-white/30 p-10">
            <Lock aria-hidden="true" size={30} className="mx-auto text-gold-deep" />
            <h2 className="mt-4 text-[clamp(2rem,5vw,3rem)] text-ink">A sixth shelf is sealed</h2>
            <p className="mt-3 text-ink-soft">
              Open all five memories above to unlock a bonus memory. {memories.length - openedCount} to go.
            </p>
          </div>
        </Shot>
      )}

      <Shot className="items-center">
        <BeliefCards />
      </Shot>

      <MemoryLightbox memory={active} open={Boolean(active)} onClose={() => setActiveId(null)} />
      <NextScene id="archive" />
    </div>
  )
}
