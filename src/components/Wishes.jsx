import { motion } from 'framer-motion'
import { wishes } from '../data/wishes.js'

export default function Wishes() {
  return (
    <section aria-labelledby="wishes-heading" className="mx-auto w-full max-w-6xl">
      <motion.h2
        id="wishes-heading"
        className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Twelve wishes for the next chapter
      </motion.h2>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {wishes.map((wish, index) => (
          <motion.li
            key={wish.id}
            className={`rounded-3xl bg-cream p-6 shadow-[0_22px_46px_-24px_rgba(42,37,82,0.55)] ${index % 2 === 1 ? 'lg:mt-8' : ''}`}
            style={{ transformPerspective: 900 }}
            initial={{ opacity: 0, y: 60, rotateX: -35 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease: [0.22, 0.8, 0.24, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
          >
            <h3 className="text-[1.75rem] text-gold-deep">{wish.title}</h3>
            <p className="mt-3 font-display text-[1.3rem] leading-snug text-ink/90">{wish.text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
