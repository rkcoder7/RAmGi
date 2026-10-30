import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { readJson, writeJson } from '../lib/storage.js'
import { useProgress } from '../context/ProgressContext.jsx'

const KEY = 'library-of-little-universes:wishes'
const LIMIT = 140

export default function WishWriter() {
  const { setFlag } = useProgress()
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(() => readJson(KEY, []))
  const [lanterns, setLanterns] = useState([])
  const [message, setMessage] = useState('')
  const counter = useRef(0)

  useEffect(() => {
    writeJson(KEY, saved)
  }, [saved])

  const release = (event) => {
    event.preventDefault()
    const wish = text.trim()
    if (!wish) {
      setMessage('Write a wish first, even a small one.')
      return
    }
    counter.current += 1
    const id = counter.current
    setLanterns((current) => [...current, { id, text: wish, left: 15 + Math.random() * 70 }])
    setSaved((current) => [wish, ...current].slice(0, 12))
    setText('')
    setMessage('Your wish is on its way up.')
    setFlag('wish')
  }

  const remove = (id) => setLanterns((current) => current.filter((item) => item.id !== id))

  return (
    <section aria-labelledby="wish-heading" className="mx-auto w-full max-w-5xl">
      <h2 id="wish-heading" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        Send a wish up the tower
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center font-display text-[1.4rem] italic text-ink/85">
        Write it down and it rises as a lantern. Wishes stay on this device only.
      </p>

      <div className="on-dark relative mt-12 min-h-[28rem] overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-dusk-deep via-dusk to-[#7b5aa6] p-6 text-cream shadow-[0_40px_90px_-30px_rgba(23,28,69,0.8)] sm:p-10">
        <AnimatePresence>
          {lanterns.map((lantern) => (
            <motion.div
              key={lantern.id}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-24 z-10 flex w-24 flex-col items-center"
              style={{ left: `${lantern.left}%` }}
              initial={{ y: 0, opacity: 0, scale: 0.6 }}
              animate={{ y: -380, opacity: [0, 1, 1, 0], scale: 1, x: [0, 14, -10, 8] }}
              transition={{ duration: 7, ease: 'easeOut' }}
              onAnimationComplete={() => remove(lantern.id)}
            >
              <span className="block h-16 w-12 rounded-t-3xl rounded-b-lg bg-gradient-to-b from-[#ffe2a8] to-[#f6a96b] shadow-[0_0_40px_10px_rgba(255,200,120,0.55)]" />
            </motion.div>
          ))}
        </AnimatePresence>

        <form onSubmit={release} noValidate className="relative z-20 mx-auto max-w-xl">
          <label htmlFor="wish-text" className="block text-center font-display text-3xl">
            What do you wish for?
          </label>
          <textarea
            id="wish-text"
            value={text}
            maxLength={LIMIT}
            rows={3}
            onChange={(event) => {
              setText(event.target.value)
              setMessage('')
            }}
            aria-describedby="wish-count wish-message"
            className="mt-4 block w-full rounded-2xl border border-cream/40 bg-dusk-deep/70 p-4 text-lg text-cream placeholder:text-cream/50"
            placeholder="A small wish is still a wish."
          />
          <div className="mt-2 flex items-center justify-between text-sm text-cream/80">
            <span id="wish-message" role="status">
              {message}
            </span>
            <span id="wish-count">{`${text.length} of ${LIMIT}`}</span>
          </div>
          <div className="mt-5 text-center">
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              className="inline-flex min-h-14 items-center gap-3 rounded-full bg-gold px-8 text-lg font-medium text-ink transition hover:bg-cream"
            >
              <Sparkles aria-hidden="true" size={20} />
              Release into the sky
            </motion.button>
          </div>
        </form>

        {saved.length > 0 && (
          <div className="relative z-20 mx-auto mt-10 max-w-2xl">
            <h3 className="text-center text-2xl text-gold">Wishes already in the sky</h3>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {saved.map((wish, index) => (
                <li key={`${wish}-${index}`} className="rounded-full bg-cream/15 px-4 py-1.5 text-sm text-cream">
                  {wish}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
