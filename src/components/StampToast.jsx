import { AnimatePresence, motion } from 'framer-motion'
import { Stamp } from 'lucide-react'
import { useProgress } from '../context/ProgressContext.jsx'

export default function StampToast() {
  const { toast, dismissToast } = useProgress()
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 top-16 z-50 flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.button
            key={toast.id}
            type="button"
            onClick={dismissToast}
            className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-left text-cream shadow-[0_24px_50px_-16px_rgba(42,37,82,0.7)]"
            initial={{ opacity: 0, y: -40, rotate: -4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          >
            <Stamp aria-hidden="true" size={26} className="shrink-0 text-gold" />
            <span>
              <span className="block text-xs text-gold">New stamp on your library card</span>
              <span className="block font-display text-2xl leading-tight">{toast.title}</span>
              <span className="block text-sm opacity-85">{toast.text}</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
