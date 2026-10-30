import { useId } from 'react'

const GLYPHS = {
  photo: (
    <g fill="none" stroke="#D8BA7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="168" y="112" width="64" height="48" rx="6" />
      <circle cx="200" cy="136" r="11" />
      <path d="M184 112l5-8h22l5 8" />
    </g>
  ),
  drawing: (
    <g fill="none" stroke="#D8BA7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M176 164l6-22 38-38 16 16-38 38z" />
      <path d="M214 110l16 16" />
      <path d="M176 164l22-6" />
    </g>
  ),
}

export default function Placeholder({ kind = 'photo', label, alt, className = '' }) {
  const id = useId()
  return (
    <svg
      role="img"
      aria-label={alt || label}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#29234D" />
          <stop offset="1" stopColor="#14142E" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#BCA8FF" stopOpacity="0.28" />
          <stop offset="1" stopColor="#BCA8FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} />
      <rect width="400" height="300" fill={`url(#${id}-glow)`} />
      <g fill="#F1E9D8" opacity="0.55">
        <circle cx="52" cy="48" r="1.5" />
        <circle cx="340" cy="62" r="1.2" />
        <circle cx="96" cy="238" r="1.2" />
        <circle cx="318" cy="226" r="1.6" />
        <circle cx="258" cy="36" r="1" />
      </g>
      {GLYPHS[kind]}
      {label && (
        <text
          x="200"
          y="196"
          textAnchor="middle"
          fill="#F1E9D8"
          opacity="0.75"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="19"
          fontStyle="italic"
        >
          {label}
        </text>
      )}
    </svg>
  )
}
