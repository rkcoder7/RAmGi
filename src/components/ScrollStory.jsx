import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { scenes } from '../data/scenes.js'
import SceneArt from './SceneArt.jsx'

const tints = [
  'rgba(255, 255, 255, 0.22)',
  'rgba(244, 184, 203, 0.3)',
  'rgba(169, 200, 242, 0.34)',
  'rgba(212, 184, 238, 0.32)',
  'rgba(200, 228, 238, 0.34)',
  'rgba(243, 208, 230, 0.32)',
  'rgba(251, 224, 184, 0.34)',
]

function SceneContent({ scene, active }) {
  return (
    <div className="mx-auto grid h-full w-full max-w-6xl content-center items-center gap-6 px-6 md:grid-cols-2 md:gap-14">
      <div className="mx-auto aspect-[5/4] w-full max-w-[17rem] md:order-2 md:max-w-lg">
        <SceneArt id={scene.id} />
      </div>
      <div className="md:order-1">
        <h3 className="text-[clamp(2.2rem,6.2vw,4.4rem)] leading-[1.02] text-ink">{scene.title}</h3>
        <p className="mt-5 max-w-lg font-display text-[1.35rem] leading-snug text-ink/90 sm:text-2xl">{scene.text}</p>
        <Link
          to={scene.path}
          tabIndex={active ? 0 : -1}
          className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-cream transition hover:bg-ink-soft active:scale-[0.97]"
        >
          {scene.cta}
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>
    </div>
  )
}

function Scene({ scene, index, progress, active }) {
  const total = scenes.length
  const segment = 1 / total
  const start = index * segment
  const end = start + segment
  const fade = segment * 0.22

  const first = index === 0
  const last = index === total - 1
  const inputs = first ? [0, end - fade, end] : last ? [start, start + fade, 1] : [start, start + fade, end - fade, end]
  const opacityOut = first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0]
  const yOut = first ? [0, 0, -70] : last ? [70, 0, 0] : [70, 0, 0, -70]
  const scaleOut = first ? [1, 1, 1.06] : last ? [0.94, 1, 1] : [0.94, 1, 1, 1.06]

  const opacity = useTransform(progress, inputs, opacityOut)
  const y = useTransform(progress, inputs, yOut)
  const scale = useTransform(progress, inputs, scaleOut)

  return (
    <motion.div aria-hidden={!active} className="absolute inset-0" style={{ opacity, y, scale, pointerEvents: active ? 'auto' : 'none' }}>
      <SceneContent scene={scene} active={active} />
    </motion.div>
  )
}

function StaticStory() {
  return (
    <section aria-labelledby="walk-heading" className="mx-auto max-w-6xl px-4 py-16">
      <h2 id="walk-heading" className="text-center text-[clamp(2.2rem,6vw,3.6rem)]">
        A walk through the library
      </h2>
      <div className="mt-12 grid gap-24">
        {scenes.map((scene) => (
          <div key={scene.id} className="min-h-[24rem]">
            <SceneContent scene={scene} active />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function ScrollStory() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [current, setCurrent] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const background = useTransform(scrollYProgress, tints.map((_, index) => index / (tints.length - 1)), tints)
  const barHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setCurrent(Math.min(scenes.length - 1, Math.max(0, Math.floor(value * scenes.length))))
  })

  if (reduce) return <StaticStory />

  return (
    <section ref={ref} aria-labelledby="walk-heading" className="relative" style={{ height: `${scenes.length * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: background }} />
        <h2 id="walk-heading" className="sr-only">
          A walk through the library
        </h2>
        <p aria-hidden="true" className="absolute inset-x-0 top-20 text-center font-display text-xl italic text-ink/85 sm:text-2xl">
          Keep scrolling. The library has more rooms.
        </p>
        {scenes.map((scene, index) => (
          <Scene key={scene.id} scene={scene} index={index} progress={scrollYProgress} active={index === current} />
        ))}
        <div aria-hidden="true" className="absolute bottom-28 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {scenes.map((scene, index) => (
            <span key={scene.id} className={`block h-2 rounded-full transition-all duration-500 ${index === current ? 'w-8 bg-ink' : 'w-2 bg-ink/30'}`} />
          ))}
        </div>
        <div aria-hidden="true" className="absolute inset-y-24 right-4 hidden w-px bg-ink/15 md:block">
          <motion.span className="block w-px bg-ink" style={{ height: barHeight }} />
        </div>
      </div>
    </section>
  )
}
