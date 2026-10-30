import { useMemo } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Castle from './Castle.jsx'
import FloatingBook from './FloatingBook.jsx'
import { seededRandom } from '../lib/random.js'

const skies = [
  'linear-gradient(180deg,#9db5ec 0%,#c7c6f2 45%,#f3d3e3 80%,#fbe6d8 100%)',
  'linear-gradient(180deg,#e9b7d0 0%,#f6c9d3 40%,#fbd9c6 80%,#fdebd2 100%)',
  'linear-gradient(180deg,#8fb6ea 0%,#b5d0f2 45%,#d9e5f7 80%,#f2e3ec 100%)',
  'linear-gradient(180deg,#b9a4ea 0%,#d4b8ee 40%,#f0c3dd 80%,#fbdccb 100%)',
  'linear-gradient(180deg,#a8c4f0 0%,#c9d6f4 45%,#f2d4e4 80%,#fdebd9 100%)',
  'linear-gradient(180deg,#c8b1ee 0%,#e6bde0 40%,#f8cbd6 80%,#ffe3c7 100%)',
  'linear-gradient(180deg,#f0c0b8 0%,#f9d4b4 40%,#fce6b8 75%,#fff1d6 100%)',
]

const bookColors = ['#f4b8cb', '#bcd2f2', '#d9c6f2', '#fbd9b3', '#c9e4e8']

function Cloud({ cloud }) {
  return (
    <div
      className="cloud-drift absolute"
      style={{
        left: `${cloud.left}vw`,
        top: `${cloud.top}%`,
        opacity: cloud.opacity,
        '--s': cloud.scale,
        animationDelay: `${cloud.delay}s`,
        animationDuration: `${cloud.duration}s`,
      }}
    >
      <svg viewBox="0 0 240 90" width="260" height="98" aria-hidden="true" focusable="false" style={{ filter: 'blur(1.5px)' }}>
        <g fill="#ffffff">
          <ellipse cx="62" cy="58" rx="58" ry="26" />
          <ellipse cx="112" cy="44" rx="52" ry="34" />
          <ellipse cx="164" cy="56" rx="58" ry="28" />
          <ellipse cx="108" cy="70" rx="96" ry="18" />
        </g>
      </svg>
    </div>
  )
}

function Layer({ index, factor, width, y, children }) {
  return (
    <motion.div
      className="absolute inset-y-0 left-0"
      style={{ width: `${width}vw` }}
      animate={{ x: `${-index * factor}vw` }}
      transition={{ type: 'spring', stiffness: 36, damping: 17 }}
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function World({ index }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const farY = useTransform(scrollY, [0, 1500], reduce ? [0, 0] : [0, -30])
  const midY = useTransform(scrollY, [0, 1500], reduce ? [0, 0] : [0, -70])
  const nearY = useTransform(scrollY, [0, 1500], reduce ? [0, 0] : [0, -130])

  const clouds = useMemo(() => {
    const random = seededRandom(11)
    return Array.from({ length: 22 }, () => ({
      left: random() * 190,
      top: 4 + random() * 62,
      scale: 0.7 + random() * 1.1,
      opacity: 0.35 + random() * 0.4,
      delay: -random() * 30,
      duration: 40 + random() * 40,
    }))
  }, [])

  const stars = useMemo(() => {
    const random = seededRandom(5)
    return Array.from({ length: 34 }, (_, id) => ({
      id,
      left: random() * 100,
      top: random() * 34,
      size: random() * 1.8 + 0.8,
      delay: random() * 6,
      duration: 3 + random() * 4,
    }))
  }, [])

  const islands = useMemo(() => {
    const random = seededRandom(23)
    return Array.from({ length: 8 }, (_, id) => ({
      id,
      left: 6 + id * 26 + random() * 10,
      top: 14 + random() * 44,
      scale: 0.5 + random() * 0.5,
      delay: random() * 5,
      tint: ['#e6d9f7', '#f8d8e4', '#d3e3f7', '#fbe6c8'][id % 4],
      deep: ['#a99ad0', '#d09ab4', '#8fabd6', '#d9a870'][id % 4],
    }))
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {skies.map((sky, position) => (
        <div key={position} className="sky" data-active={position === index} style={{ background: sky }} />
      ))}

      <motion.div
        className="sun-glow absolute aspect-square w-[min(110vw,52rem)] -translate-x-1/2 -translate-y-1/2"
        animate={{ left: `${42 + index * 3}%`, top: `${76 - index * 8}%` }}
        transition={{ type: 'spring', stiffness: 24, damping: 18 }}
      />

      <motion.div className="absolute inset-0" animate={{ opacity: Math.max(0.05, 0.9 - index * 0.17) }} transition={{ duration: 1.5 }}>
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </motion.div>

      <Layer index={index} factor={7} width={140} y={farY}>
        <Castle className="absolute bottom-[8vh] left-[28vw] h-[34vh] w-[46vw] min-w-[22rem] opacity-70" />
        <svg viewBox="0 0 1400 200" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-[22vh] w-full" focusable="false">
          <path d="M0 120 C180 70 320 130 520 96 C720 60 860 140 1060 100 C1200 76 1320 110 1400 90 V200 H0 Z" fill="#b9b6ea" opacity="0.6" />
        </svg>
      </Layer>

      <Layer index={index} factor={16} width={180} y={midY}>
        {clouds.map((cloud, position) => (
          <Cloud key={position} cloud={cloud} />
        ))}
      </Layer>

      <Layer index={index} factor={26} width={230} y={midY}>
        {islands.map((island) => (
          <div
            key={island.id}
            className="absolute"
            style={{ left: `${island.left}vw`, top: `${island.top}%`, transform: `scale(${island.scale})` }}
          >
            <div className="island-float" style={{ animationDelay: `${island.delay}s` }}>
              <div className="island w-44" style={{ '--tint': island.tint, '--deep': island.deep }}>
                <span className="island-top" />
                <span className="island-rock" />
              </div>
            </div>
          </div>
        ))}
        {bookColors.map((color, position) => (
          <div
            key={color}
            className="absolute"
            style={{ left: `${14 + position * 44}vw`, top: `${20 + (position % 3) * 22}%` }}
          >
            <FloatingBook width={34} height={48} rotate={position % 2 ? 12 : -10} delay={position * 1.2} duration={9 + position} color={color} trim="#ffffff" />
          </div>
        ))}
      </Layer>

      <Layer index={index} factor={38} width={270} y={nearY}>
        <svg viewBox="0 0 2700 240" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-[20vh] w-full" focusable="false">
          <path d="M0 150 C250 90 500 170 760 120 C1020 70 1240 170 1500 120 C1760 70 1980 160 2240 110 C2420 80 2580 130 2700 100 V240 H0 Z" fill="#ffffff" opacity="0.5" />
        </svg>
      </Layer>
    </div>
  )
}
