const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const star = 'M32 4l2.4 6.2 6.6 2.4-6.6 2.4L32 21.2l-2.4-6.2L23 12.6l6.6-2.4z'

const emblems = {
  library: (
    <g {...common}>
      <path d={star} />
      <path d="M8 46c10-6 18-6 24-2 6-4 14-4 24 2V26c-10-6-18-6-24-2-6-4-14-4-24 2z" />
      <path d="M32 24v20" />
    </g>
  ),
  archive: (
    <g {...common}>
      <path d={star} />
      <rect x="10" y="26" width="44" height="9" rx="1.5" />
      <rect x="10" y="37" width="44" height="9" rx="1.5" />
      <rect x="10" y="48" width="44" height="9" rx="1.5" />
      <path d="M29 30.5h6M29 41.5h6M29 52.5h6" />
    </g>
  ),
  observatory: (
    <g {...common}>
      <path d="M12 52V36a20 20 0 0 1 40 0v16z" />
      <path d="M32 16v20" />
      <path d="M22 52v-8h20v8" />
      <circle cx="50" cy="12" r="2" />
      <circle cx="14" cy="14" r="1.4" />
    </g>
  ),
  songs: (
    <g {...common}>
      <path d="M10 30v6M18 22v22M26 14v38M34 24v18M42 18v30M50 28v10" />
      <circle cx="54" cy="12" r="2" />
    </g>
  ),
  puzzles: (
    <g {...common}>
      <circle cx="22" cy="22" r="10" />
      <path d="M30 30l22 22M44 44l6-6M38 38l6-6" />
      <circle cx="22" cy="22" r="3" />
    </g>
  ),
  tower: (
    <g {...common}>
      <path d={star} />
      <path d="M24 58V28l8-8 8 8v30z" />
      <path d="M24 38h16M28 48h8" />
      <path d="M28 28h8" />
    </g>
  ),
  unwritten: (
    <g {...common}>
      <path d="M10 48l12-18 14 8 14-24 6 14" />
      <circle cx="10" cy="48" r="2.4" />
      <circle cx="22" cy="30" r="2.4" />
      <circle cx="36" cy="38" r="2.4" />
      <circle cx="50" cy="14" r="2.4" />
      <circle cx="56" cy="28" r="2.4" />
    </g>
  ),
}

export function ChapterEmblem({ id, className = '' }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      {emblems[id]}
    </svg>
  )
}

export function LibraryCrest({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="60" cy="60" r="46" />
        <circle cx="60" cy="60" r="38" strokeDasharray="2 5" />
        <path d="M60 20l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" fill="currentColor" fillOpacity="0.25" />
        <path d="M30 82c10-6 19-6 30-1 11-5 20-5 30 1V62c-10-5-19-5-30 0-11-5-20-5-30 0z" />
        <path d="M60 61v20" />
      </g>
      <g fill="currentColor">
        <circle cx="22" cy="30" r="1.6" />
        <circle cx="98" cy="36" r="1.4" />
        <circle cx="94" cy="92" r="1.6" />
        <circle cx="26" cy="96" r="1.2" />
      </g>
    </svg>
  )
}
