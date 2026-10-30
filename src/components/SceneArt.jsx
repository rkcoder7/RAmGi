const gold = '#b98a3c'
const stroke = { fill: 'none', stroke: gold, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const twinkle = '#6b5bb5'

function LibraryArt() {
  const books = [
    [70, 150, 26, 74, '#4a5aa8'],
    [100, 132, 22, 92, '#6a5bb0'],
    [126, 146, 28, 78, '#c46a8f'],
    [210, 138, 24, 86, '#4a5aa8'],
    [238, 152, 26, 72, '#c46a8f'],
    [268, 130, 22, 94, '#6a5bb0'],
  ]
  const floaters = [[150, 52, -14, 0], [196, 36, 10, 1.4], [236, 66, -6, 0.7]]
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden="true" focusable="false">
      <path d="M40 232h320" {...stroke} />
      {books.map(([x, y, w, h, fill], index) => (
        <g key={index} className="art-float" style={{ animationDelay: `${index * 0.35}s` }}>
          <rect x={x} y={y} width={w} height={h} rx="3" fill={fill} stroke={gold} strokeOpacity="0.8" />
          <path d={`M${x + 5} ${y + 16}h${w - 10}`} stroke="#fff8f2" strokeOpacity="0.7" />
        </g>
      ))}
      {floaters.map(([x, y, rotate, delay], index) => (
        <g key={index} className="art-float-big" style={{ animationDelay: `${delay}s` }}>
          <rect x={x} y={y} width="34" height="46" rx="3" fill="#8a7bd8" stroke="#fff8f2" strokeOpacity="0.9" transform={`rotate(${rotate} ${x + 17} ${y + 23})`} />
        </g>
      ))}
      <circle cx="320" cy="90" r="2.5" fill={twinkle} className="art-twinkle" />
      <circle cx="70" cy="70" r="2" fill={twinkle} className="art-twinkle" style={{ animationDelay: '1s' }} />
    </svg>
  )
}

function ArchiveArt() {
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden="true" focusable="false">
      {[0, 1, 2].map((row) => (
        <g key={row} className="art-drawer" style={{ animationDelay: `${row * 0.9}s` }}>
          <rect x="90" y={70 + row * 78} width="220" height="64" rx="4" fill="#5b4a9a" stroke={gold} strokeOpacity="0.9" />
          <rect x="190" y={92 + row * 78} width="20" height="8" rx="3" fill="#f2d79a" />
          <rect x="116" y={50 + row * 78} width="76" height="30" rx="2" fill="#fff8f2" className="art-card" style={{ animationDelay: `${row * 0.9}s` }} />
          <path d={`M126 ${60 + row * 78}h44M126 ${68 + row * 78}h30`} stroke="#2a2552" strokeOpacity="0.5" />
        </g>
      ))}
    </svg>
  )
}

function ObservatoryArt() {
  const stars = [[70, 60], [120, 110], [330, 70], [350, 150], [60, 180], [300, 40], [160, 40]]
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden="true" focusable="false">
      {stars.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={index % 2 ? 2.2 : 1.6} fill={twinkle} className="art-twinkle" style={{ animationDelay: `${index * 0.5}s` }} />
      ))}
      <path d="M110 260V176a90 90 0 0 1 180 0v84z" fill="#3c3f86" stroke={gold} strokeWidth="2" />
      <path d="M200 86v90" stroke="#dce6f8" strokeWidth="14" />
      <g className="art-sweep">
        <path d="M200 176l62-92" stroke="#f2d79a" strokeWidth="9" strokeLinecap="round" />
        <circle cx="262" cy="84" r="9" fill="#e98aa9" />
      </g>
      <path d="M150 260v-34h100v34" {...stroke} />
    </svg>
  )
}

function SongsArt() {
  const bars = Array.from({ length: 17 }, (_, index) => 26 + ((index * 37) % 70))
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden="true" focusable="false">
      {[40, 78, 116, 154].map((radius, index) => (
        <circle key={radius} cx="200" cy="160" r={radius} fill="none" stroke="#fff8f2" strokeOpacity="0.9" strokeWidth="1.5" className="art-ring" style={{ animationDelay: `${index * 0.45}s` }} />
      ))}
      {bars.map((height, index) => (
        <rect key={index} x={72 + index * 15.5} y={160 - height / 2} width="6" height={height} rx="3" fill={index % 3 === 0 ? '#e98aa9' : '#6a5bb0'} className="art-bar" style={{ animationDelay: `${(index % 7) * 0.12}s` }} />
      ))}
    </svg>
  )
}

function PuzzlesArt() {
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden="true" focusable="false">
      <g className="art-float-big">
        <rect x="110" y="70" width="100" height="100" rx="10" fill="#6a5bb0" stroke={gold} strokeWidth="2" />
        <circle cx="210" cy="120" r="16" fill="#6a5bb0" stroke={gold} strokeWidth="2" />
      </g>
      <g className="art-float" style={{ animationDelay: '0.8s' }}>
        <rect x="220" y="150" width="100" height="100" rx="10" fill="#e98aa9" stroke={gold} strokeWidth="2" />
        <circle cx="270" cy="150" r="16" fill="#e98aa9" stroke={gold} strokeWidth="2" />
      </g>
      <g className="art-float-big" style={{ animationDelay: '1.6s' }}>
        <circle cx="130" cy="230" r="26" fill="#fff8f2" stroke={gold} strokeWidth="2" />
        <path d="M156 230h70M200 230v16M214 230v12" stroke={gold} strokeWidth="5" strokeLinecap="round" />
      </g>
      <circle cx="340" cy="80" r="2.4" fill={twinkle} className="art-twinkle" />
    </svg>
  )
}

function TowerArt() {
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden="true" focusable="false">
      <path d="M160 290V120l40-50 40 50v170z" fill="#6a5bb0" stroke={gold} strokeWidth="2" />
      <rect x="190" y="150" width="20" height="30" rx="10" fill="#f2d79a" />
      <rect x="190" y="210" width="20" height="30" rx="10" fill="#f2d79a" />
      {[[110, 200], [290, 160], [320, 240], [90, 110]].map(([x, y], index) => (
        <g key={index} className="art-float-big" style={{ animationDelay: `${index * 0.8}s` }}>
          <rect x={x} y={y} width="22" height="30" rx="8" fill="#f9c9a0" stroke={gold} />
          <circle cx={x + 11} cy={y + 15} r="4" fill="#fff8f2" />
        </g>
      ))}
      <path d="M200 60l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill={twinkle} className="art-twinkle" />
    </svg>
  )
}

function UnwrittenArt() {
  const points = [[60, 240], [130, 150], [210, 200], [290, 90], [350, 170]]
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden="true" focusable="false">
      <polyline points={points.map((point) => point.join(',')).join(' ')} fill="none" stroke={gold} strokeOpacity="0.9" strokeWidth="1.8" strokeDasharray="4 8" className="art-dash" />
      {points.map(([x, y], index) => (
        <g key={index}>
          <circle cx={x} cy={y} r="14" fill="#e98aa9" opacity="0.3" className="art-twinkle" style={{ animationDelay: `${index * 0.4}s` }} />
          <circle cx={x} cy={y} r="5.5" fill="#6a5bb0" />
        </g>
      ))}
      <path d="M200 30l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" fill="#f2d79a" stroke={gold} className="art-twinkle" />
    </svg>
  )
}

const arts = {
  library: LibraryArt,
  archive: ArchiveArt,
  observatory: ObservatoryArt,
  songs: SongsArt,
  puzzles: PuzzlesArt,
  tower: TowerArt,
  unwritten: UnwrittenArt,
}

export default function SceneArt({ id }) {
  const Art = arts[id]
  return <Art />
}
