import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { rules } from '../data/rules.js'
import Reveal from './Reveal.jsx'

export default function RulesShelf() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section aria-labelledby="rules-heading" className="mx-auto w-full max-w-4xl">
      <h2 id="rules-heading" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        The twelve rules of the library
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center font-display text-[1.4rem] italic text-ink/85">
        Pinned above the front desk, in handwriting that changes slightly every morning.
      </p>
      <ol ref={ref} className="relative mt-14 grid gap-10 pl-10 sm:pl-16">
        <span aria-hidden="true" className="absolute bottom-0 left-3 top-0 w-px bg-ink/15 sm:left-6" />
        <motion.span aria-hidden="true" className="absolute bottom-0 left-3 top-0 w-[3px] origin-top bg-gradient-to-b from-rose to-gold-deep sm:left-[22px]" style={{ scaleY }} />
        {rules.map((rule, index) => (
          <Reveal as="li" key={rule} x={index % 2 ? 50 : -50} y={0} className="relative">
            <span className="absolute -left-10 top-1 font-display text-3xl text-gold-deep sm:-left-16 sm:text-4xl" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-display text-[clamp(1.6rem,4.4vw,2.6rem)] leading-tight text-ink">{rule}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
