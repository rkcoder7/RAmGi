import { useEffect, useRef } from 'react'
import { Link, useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { chapters } from '../data/chapters.js'
import { useProgress } from '../context/ProgressContext.jsx'
import Dock from './Dock.jsx'
import { LibraryCrest } from './Emblem.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import SoundtrackPanel from './SoundtrackPanel.jsx'
import StampToast from './StampToast.jsx'
import World from './World.jsx'

export default function AppLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  const { markVisited } = useProgress()
  const mainRef = useRef(null)
  const firstRender = useRef(true)

  const found = chapters.findIndex((item) => item.path === location.pathname)
  const index = found === -1 ? 0 : found

  useEffect(() => {
    if (found !== -1) markVisited(chapters[found].id)
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo({ top: 0, left: 0 })
    mainRef.current?.focus({ preventScroll: true })
  }, [location.pathname, found, markVisited])

  return (
    <div className="relative isolate min-h-svh">
      <World index={index} />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Link
        to="/"
        aria-label="Return to the library"
        className="fixed left-3 top-3 z-40 flex min-h-11 items-center gap-2 rounded-full bg-cream/90 px-3 text-ink shadow-[0_10px_30px_-10px_rgba(42,37,82,0.5)] backdrop-blur transition hover:bg-white"
      >
        <LibraryCrest className="size-7" />
        <span className="hidden font-display text-xl sm:inline">Little Universes</span>
      </Link>
      <SoundtrackPanel />
      <StampToast />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          id="main"
          ref={mainRef}
          tabIndex={-1}
          className="pb-36 outline-none"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.28 } }}
          transition={{ duration: 0.7, ease: [0.22, 0.8, 0.24, 1] }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <Dock index={index} />
    </div>
  )
}
