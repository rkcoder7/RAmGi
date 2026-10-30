import { motion } from 'framer-motion'
import { LibraryCrest } from './Emblem.jsx'
import { site } from '../data/site.js'

export default function HeroBook({ open }) {
  return (
    <div className="hero-scene" data-testid="hero-book">
      <div className="hero-shift" data-open={open}>
        <div className="hero-book" data-open={open}>
          <div className="hero-pages">
            <div className="hero-glow" />
            <div className="hero-page-text">
              <p className="font-display text-[clamp(1.5rem,5vw,2.3rem)] italic leading-tight">For {site.recipient}</p>
              <span aria-hidden="true" className="mx-auto my-2 block h-px w-10 bg-gold-deep" />
              <p className="text-[0.8rem] text-ink-soft">{site.birthday}</p>
            </div>
          </div>
          <motion.div
            className="hero-cover"
            initial={false}
            animate={{ rotateY: open ? -164 : 0 }}
            transition={{ duration: 1.5, ease: [0.22, 0.8, 0.24, 1] }}
          >
            <div className="cover-face cover-front">
              <div className="grid justify-items-center gap-2 px-4 text-center">
                <LibraryCrest className="w-[62%] max-w-36" />
                <p className="font-display text-[clamp(1rem,3.4vw,1.35rem)] italic text-cream/95">for {site.recipient}</p>
              </div>
            </div>
            <div className="cover-face cover-back" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
