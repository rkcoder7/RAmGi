import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { chapters } from '../data/chapters.js'
import useMediaQuery from '../hooks/useMediaQuery.js'

const wide = {
  width: 900,
  height: 340,
  points: [
    { x: 60, y: 230 },
    { x: 195, y: 100 },
    { x: 320, y: 230 },
    { x: 450, y: 95 },
    { x: 580, y: 225 },
    { x: 710, y: 100 },
    { x: 840, y: 215 },
  ],
}

const tall = {
  width: 360,
  height: 760,
  points: [
    { x: 80, y: 70 },
    { x: 250, y: 170 },
    { x: 110, y: 290 },
    { x: 255, y: 400 },
    { x: 110, y: 510 },
    { x: 250, y: 610 },
    { x: 120, y: 710 },
  ],
}

const satellites = [
  [
    [-34, -22],
    [-14, 26],
    [30, -30],
    [38, 18],
  ],
  [
    [-30, 22],
    [26, -26],
    [34, 24],
    [-8, -34],
  ],
  [
    [-36, -10],
    [18, 30],
    [36, -22],
    [-12, 32],
  ],
  [
    [-28, 26],
    [-10, -32],
    [34, -8],
    [30, 30],
  ],
  [
    [-34, 14],
    [-8, -30],
    [30, -24],
    [26, 28],
  ],
  [
    [-30, -18],
    [20, 28],
    [34, -20],
    [-14, 30],
  ],
  [
    [-32, 20],
    [-6, -30],
    [32, -14],
    [24, 30],
  ],
]

const STEP = 0.7

export default function Constellation({ onComplete, instant }) {
  const isWide = useMediaQuery('(min-width: 768px)')
  const layout = isWide ? wide : tall

  useEffect(() => {
    if (instant && onComplete) onComplete()
  }, [instant, onComplete])

  const stage = (index) => (instant ? 0 : index * STEP)
  const dur = instant ? 0 : 0.6
  const lastIndex = layout.points.length - 1

  return (
    <div
      className="relative mx-auto w-full max-w-4xl"
      style={{ aspectRatio: `${layout.width} / ${layout.height}` }}
    >
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        {layout.points.slice(1).map((point, i) => {
          const from = layout.points[i]
          return (
            <motion.line
              key={`link-${i}`}
              x1={from.x}
              y1={from.y}
              x2={point.x}
              y2={point.y}
              stroke="#D8BA7A"
              strokeOpacity="0.55"
              strokeWidth="1.2"
              strokeDasharray="3 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: dur, delay: stage(i + 1) - 0.1 * (instant ? 0 : 1), ease: 'easeOut' }}
              onAnimationComplete={i + 1 === lastIndex && !instant ? onComplete : undefined}
            />
          )
        })}
        {layout.points.map((point, i) => (
          <g key={`cluster-${i}`}>
            {satellites[i].map(([dx, dy], s) => {
              const sx = point.x + dx
              const sy = point.y + dy
              return (
                <g key={s}>
                  <motion.line
                    x1={point.x}
                    y1={point.y}
                    x2={sx}
                    y2={sy}
                    stroke="#BCA8FF"
                    strokeOpacity="0.6"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: dur, delay: stage(i) + s * 0.08 }}
                  />
                  <motion.circle
                    cx={sx}
                    cy={sy}
                    r="2.4"
                    fill="#F1E9D8"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    transition={{ duration: dur * 0.7, delay: stage(i) + s * 0.08 }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                </g>
              )
            })}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="13"
              fill="#D8BA7A"
              fillOpacity="0.14"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: dur, delay: stage(i) }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="5.5"
              fill="#D8BA7A"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: dur, delay: stage(i) }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </g>
        ))}
      </svg>

      <ul className="absolute inset-0 m-0 list-none p-0">
        {layout.points.map((point, i) => {
          const chapter = chapters[i]
          const alignRight = !isWide && point.x > layout.width / 2
          return (
            <motion.li
              key={chapter.id}
              className="absolute"
              style={{
                left: `${(point.x / layout.width) * 100}%`,
                top: `${(point.y / layout.height) * 100}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: dur, delay: stage(i) }}
            >
              <Link
                to={chapter.path}
                aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
                className="group absolute grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
              >
                <span
                  className={`pointer-events-none absolute top-1/2 w-max max-w-[8.5rem] -translate-y-1/2 font-display text-[1.05rem] leading-tight text-cream/95 transition group-hover:text-gold group-focus-visible:text-gold sm:max-w-[9rem] sm:text-lg ${
                    isWide
                      ? 'left-1/2 top-[3.4rem] -translate-x-1/2 text-center'
                      : alignRight
                        ? 'right-[3.2rem] text-right'
                        : 'left-[3.2rem]'
                  }`}
                >
                  {chapter.title}
                </span>
              </Link>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
