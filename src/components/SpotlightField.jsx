import { useEffect, useRef, useState } from 'react'
import { Flame, Sun } from 'lucide-react'

export default function SpotlightField({ children }) {
  const ref = useRef(null)
  const [fine, setFine] = useState(false)
  const [dim, setDim] = useState(true)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    setFine(window.matchMedia('(pointer: fine)').matches)
  }, [])

  const onMove = (event) => {
    if (!ref.current || event.pointerType !== 'mouse') return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${event.clientX - rect.left}px`)
    ref.current.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} onPointerMove={onMove} className="relative">
      {fine && (
        <div className="mx-auto mt-8 flex max-w-6xl justify-end px-1">
          <button
            type="button"
            aria-pressed={dim}
            onClick={() => setDim((value) => !value)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/50 px-5 text-sm text-cream transition hover:border-cream hover:bg-cream/10"
          >
            {dim ? <Sun aria-hidden="true" size={16} /> : <Flame aria-hidden="true" size={16} />}
            {dim ? 'Turn the lights up' : 'Candlelight mode'}
          </button>
        </div>
      )}
      {children}
      {fine && dim && <div aria-hidden="true" className="spotlight-dim pointer-events-none absolute inset-0 z-10" />}
    </div>
  )
}
