import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Eraser, Plus, Save, Undo2 } from 'lucide-react'
import { readJson, writeJson } from '../lib/storage.js'
import { useProgress } from '../context/ProgressContext.jsx'

const KEY = 'library-of-little-universes:constellation'
const MAX = 12
const W = 600
const H = 340

export default function ConstellationMaker() {
  const { setFlag } = useProgress()
  const [stars, setStars] = useState(() => readJson(KEY, { stars: [] }).stars || [])
  const [name, setName] = useState(() => readJson(KEY, { name: '' }).name || '')
  const [savedName, setSavedName] = useState(() => readJson(KEY, { saved: '' }).saved || '')
  const [message, setMessage] = useState('')

  useEffect(() => {
    writeJson(KEY, { stars, name, saved: savedName })
  }, [stars, name, savedName])

  const place = (x, y) => {
    setStars((current) => (current.length >= MAX ? current : [...current, { x: Math.round(x), y: Math.round(y) }]))
    setSavedName('')
  }

  const onClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    place(((event.clientX - rect.left) / rect.width) * W, ((event.clientY - rect.top) / rect.height) * H)
  }

  const addRandom = () => place(30 + Math.random() * (W - 60), 30 + Math.random() * (H - 60))

  const save = () => {
    if (stars.length < 3) {
      setMessage('Place at least three stars first.')
      return
    }
    if (!name.trim()) {
      setMessage('Give your constellation a name.')
      return
    }
    setSavedName(name.trim())
    setMessage('')
    setFlag('star')
  }

  const points = stars.map((star) => `${star.x},${star.y}`).join(' ')

  return (
    <section aria-labelledby="stars-heading" className="mx-auto w-full max-w-5xl">
      <h2 id="stars-heading" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        Build a constellation
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center font-display text-[1.4rem] italic text-ink/85">
        Tap the sky to place up to twelve stars, then name the shape they make.
      </p>

      <div className="on-dark mt-12 rounded-[2.5rem] bg-gradient-to-b from-dusk-deep to-dusk p-4 text-cream shadow-[0_40px_90px_-30px_rgba(23,28,69,0.8)] sm:p-8">
        <div
          role="img"
          aria-label={`Sky canvas with ${stars.length} stars placed`}
          onClick={onClick}
          className="relative mx-auto aspect-[600/340] w-full cursor-crosshair overflow-hidden rounded-2xl bg-dusk-deep/80"
        >
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" focusable="false" aria-hidden="true">
            {stars.length > 1 && <polyline points={points} fill="none" stroke="#e3c07f" strokeOpacity="0.8" strokeWidth="1.5" strokeDasharray="4 6" />}
            {stars.map((star, index) => (
              <motion.g key={`${star.x}-${star.y}-${index}`} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                <circle cx={star.x} cy={star.y} r="14" fill="#e3c07f" opacity="0.18" />
                <circle cx={star.x} cy={star.y} r="4.5" fill="#fff8f2" />
              </motion.g>
            ))}
          </svg>
        </div>

        <div className="mt-5 flex flex-wrap items-end gap-3">
          <div className="min-w-[14rem] flex-1">
            <label htmlFor="constellation-name" className="text-sm text-cream/85">
              Name your constellation
            </label>
            <input
              id="constellation-name"
              type="text"
              maxLength={40}
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setMessage('')
              }}
              className="mt-1 block min-h-12 w-full rounded-xl border border-cream/40 bg-dusk-deep/70 px-4 text-cream placeholder:text-cream/50"
              placeholder="The Reading Lamp"
            />
          </div>
          <button type="button" onClick={addRandom} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-cream/50 px-5 transition hover:bg-cream/10">
            <Plus aria-hidden="true" size={18} />
            Add a star
          </button>
          <button type="button" onClick={() => setStars((current) => current.slice(0, -1))} disabled={stars.length === 0} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-cream/50 px-5 transition hover:bg-cream/10 disabled:opacity-40">
            <Undo2 aria-hidden="true" size={18} />
            Undo
          </button>
          <button type="button" onClick={() => { setStars([]); setSavedName('') }} disabled={stars.length === 0} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-cream/50 px-5 transition hover:bg-cream/10 disabled:opacity-40">
            <Eraser aria-hidden="true" size={18} />
            Clear
          </button>
          <button type="button" onClick={save} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 font-medium text-ink transition hover:bg-cream">
            <Save aria-hidden="true" size={18} />
            Save it
          </button>
        </div>
        <p role="status" className="mt-4 min-h-6 text-center text-cream/90">
          {message || (savedName ? `Saved: ${savedName}, ${stars.length} stars. It will be here when you come back.` : `${stars.length} of ${MAX} stars placed.`)}
        </p>
      </div>
    </section>
  )
}
