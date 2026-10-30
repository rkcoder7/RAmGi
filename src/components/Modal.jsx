import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([disabled]), select, audio[controls], video[controls], [tabindex]:not([tabindex="-1"])'

export default function Modal({ open, onClose, label, children, size = 'lg', closeLabel = 'Close' }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return undefined
    const previous = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const preferred = panelRef.current?.querySelector('[data-autofocus]')
    ;(preferred || closeRef.current)?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const items = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)).filter(
        (node) => !node.hasAttribute('disabled') && node.getAttribute('aria-hidden') !== 'true',
      )
      if (items.length === 0) {
        event.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (previous && typeof previous.focus === 'function') previous.focus()
    }
  }, [open])

  const widths = { md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
            onClick={() => onCloseRef.current()}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={`relative max-h-[92svh] w-full ${widths[size]} overflow-y-auto rounded-xl border border-gold bg-cream text-ink shadow-[0_30px_80px_-20px_rgba(42,37,82,0.7)]`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 0.8, 0.24, 1] }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => onCloseRef.current()}
              aria-label={closeLabel}
              className="absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full border border-ink/20 bg-white text-ink transition hover:border-ink"
            >
              <X aria-hidden="true" size={20} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
