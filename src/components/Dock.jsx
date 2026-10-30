import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { chapters } from '../data/chapters.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { ChapterEmblem } from './Emblem.jsx'

export default function Dock({ index }) {
  const { progress } = useProgress()
  const current = chapters[index]
  const visitedCount = chapters.filter((chapter) => progress.visited.includes(chapter.id)).length

  return (
    <nav aria-label="Chapters" className="fixed inset-x-0 bottom-3 z-40 flex flex-col items-center gap-2 px-2 sm:bottom-5">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={current.id}
          aria-hidden="true"
          className="rounded-full bg-cream/80 px-4 py-1 font-display text-lg italic leading-tight text-ink backdrop-blur"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          {current.title}
        </motion.p>
      </AnimatePresence>
      <ul className="flex items-center gap-0.5 rounded-full bg-cream/90 p-1.5 shadow-[0_14px_40px_-12px_rgba(42,37,82,0.5)] backdrop-blur-md sm:gap-1">
        {chapters.map((chapter) => {
          const visited = progress.visited.includes(chapter.id)
          return (
            <li key={chapter.id} className="relative">
              <NavLink
                to={chapter.path}
                end
                aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
                className={({ isActive }) =>
                  `group relative grid size-10 place-items-center rounded-full transition sm:size-12 ${
                    isActive ? 'bg-ink text-cream' : 'text-ink hover:bg-blush'
                  }`
                }
              >
                <ChapterEmblem id={chapter.id} className="size-6 sm:size-7" />
                {visited && (
                  <span aria-hidden="true" className="absolute right-1 top-1 block size-1.5 rounded-full bg-rose" />
                )}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full mb-3 hidden w-max max-w-[12rem] rounded bg-ink px-3 py-1.5 text-xs text-cream opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
                >
                  {chapter.short}
                </span>
              </NavLink>
            </li>
          )
        })}
      </ul>
      <span className="sr-only">{`${visitedCount} of ${chapters.length} chapters visited`}</span>
    </nav>
  )
}
