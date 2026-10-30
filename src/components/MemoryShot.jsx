import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import useParallax from '../hooks/useParallax.js'
import MediaImage from './MediaImage.jsx'
import Shot from './Shot.jsx'
import TiltCard from './TiltCard.jsx'

export default function MemoryShot({ memory, index, opened, onOpen, bonus = false }) {
  const ref = useRef(null)
  const imageY = useParallax(ref, 50)
  const textY = useParallax(ref, 24)
  const flip = index % 2 === 1
  const aspect = memory.aspect || '4 / 3'
  const [w, h] = aspect.split('/').map((part) => Number(part.trim()))
  const narrow = w / h < 0.9

  return (
    <Shot className="items-center">
      <div ref={ref} className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <motion.div style={{ y: imageY }} className={flip ? 'md:order-2' : ''}>
          <motion.div
            initial={{ opacity: 0, x: flip ? 80 : -80, rotate: flip ? 6 : -6 }}
            whileInView={{ opacity: 1, x: 0, rotate: flip ? 2 : -2 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 1, ease: [0.22, 0.8, 0.24, 1] }}
          >
            <TiltCard>
              <button
                type="button"
                onClick={onOpen}
                aria-haspopup="dialog"
                aria-label={`Open ${memory.title} full size`}
                className={`mx-auto block w-full rounded-md bg-cream p-3 pb-14 ${narrow ? 'max-w-sm' : ''} shadow-[0_30px_60px_-24px_rgba(42,37,82,0.6)] transition hover:shadow-[0_36px_70px_-24px_rgba(42,37,82,0.7)]`}
              >
                <span className="block overflow-hidden bg-blush" style={{ aspectRatio: aspect }}>
                  <MediaImage src={memory.image} alt={memory.imageAlt} kind="photo" label="A photo will go here" fit={memory.fit || 'cover'} />
                </span>
                <span className="mt-4 block text-center font-display text-xl italic text-ink-soft">{bonus ? 'a bonus shelf' : `memory ${index + 1}`}</span>
              </button>
            </TiltCard>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <h2 className="text-[clamp(2.4rem,6.5vw,4.6rem)] leading-[1.02] text-ink">{memory.title}</h2>
            <p className="mt-6 font-display text-[clamp(1.45rem,3.2vw,2rem)] italic leading-snug text-ink/90">{memory.caption}</p>
            {memory.story && <p className="mt-5 max-w-md font-display text-[1.3rem] leading-relaxed text-ink-soft">{memory.story}</p>}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpen}
                aria-haspopup="dialog"
                className="inline-flex min-h-12 items-center rounded-full bg-ink px-7 font-medium text-cream transition hover:bg-ink-soft active:scale-[0.97]"
              >
                {`Read the full story: ${memory.title}`}
              </button>
              {opened && (
                <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
                  <Star aria-hidden="true" size={16} className="fill-gold-deep text-gold-deep" />
                  Opened
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Shot>
  )
}
