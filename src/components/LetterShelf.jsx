import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { letters } from '../data/letters.js'

export default function LetterShelf() {
  const [openId, setOpenId] = useState(null)

  return (
    <section aria-labelledby="letters-heading" className="mx-auto w-full max-w-3xl">
      <h2 id="letters-heading" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        Letters from the library
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center font-display text-[1.4rem] italic text-ink/85">
        Eight short letters, each one waiting in its own envelope.
      </p>
      <ul className="mt-12 grid gap-3">
        {letters.map((letter, index) => {
          const open = openId === letter.id
          return (
            <motion.li
              key={letter.id}
              className="overflow-hidden rounded-2xl bg-cream shadow-[0_16px_36px_-22px_rgba(42,37,82,0.5)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -6% 0px' }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`letter-${letter.id}`}
                  onClick={() => setOpenId(open ? null : letter.id)}
                  className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-3 text-left"
                >
                  <span className="font-display text-[1.6rem] leading-tight text-ink">{letter.title}</span>
                  <ChevronDown aria-hidden="true" size={22} className={`shrink-0 text-gold-deep transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                </button>
              </h3>
              <motion.div
                id={`letter-${letter.id}`}
                role="region"
                aria-label={letter.title}
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 0.8, 0.24, 1] }}
                className="overflow-hidden"
                hidden={!open}
              >
                <p className="px-6 pb-6 font-display text-[1.35rem] leading-relaxed text-ink/90">{letter.text}</p>
              </motion.div>
            </motion.li>
          )
        })}
      </ul>
    </section>
  )
}
