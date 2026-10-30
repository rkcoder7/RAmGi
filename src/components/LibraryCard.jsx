import { motion } from 'framer-motion'
import { Stamp } from 'lucide-react'
import { stamps } from '../data/stamps.js'
import { useProgress } from '../context/ProgressContext.jsx'

export default function LibraryCard() {
  const { earned } = useProgress()
  return (
    <section aria-labelledby="card-heading" className="mx-auto w-full max-w-5xl">
      <h2 id="card-heading" className="text-center text-[clamp(2.2rem,6vw,4rem)] text-ink">
        Your library card
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center font-display text-[1.4rem] italic text-ink/85">
        Every room has a stamp to collect. {earned.length} of {stamps.length} found.
      </p>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stamps.map((stamp, index) => {
          const has = earned.includes(stamp.id)
          return (
            <motion.li
              key={stamp.id}
              className={`flex min-h-24 items-center gap-4 rounded-2xl p-4 ${
                has ? 'bg-cream shadow-[0_14px_30px_-16px_rgba(42,37,82,0.5)]' : 'border border-dashed border-ink/30 bg-white/30'
              }`}
              initial={{ opacity: 0, y: 20, rotate: has ? -2 : 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: has ? (index % 2 ? 1.5 : -1.5) : 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
            >
              <span className={`grid size-12 shrink-0 place-items-center rounded-full ${has ? 'bg-rose text-ink' : 'bg-ink/10 text-ink/40'}`}>
                <Stamp aria-hidden="true" size={22} />
              </span>
              <span>
                <span className={`block font-display text-2xl leading-tight ${has ? 'text-ink' : 'text-ink/60'}`}>{stamp.title}</span>
                <span className={`block text-sm ${has ? 'text-ink-soft' : 'text-ink/55'}`}>
                  {stamp.text}
                  {has ? <span className="sr-only"> Collected.</span> : <span className="sr-only"> Not collected yet.</span>}
                </span>
              </span>
            </motion.li>
          )
        })}
      </ul>
    </section>
  )
}
