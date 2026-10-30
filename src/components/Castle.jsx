const windows = [
  [412, 190], [440, 190], [468, 190], [700, 190], [728, 190], [756, 190], [784, 190],
  [347, 130], [347, 170], [827, 110], [827, 150], [586, 70], [586, 105], [607, 70],
  [204, 175], [972, 165], [580, 190], [616, 190],
]

export default function Castle({ className = '' }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 -40 1200 300" preserveAspectRatio="xMidYMax meet" className={className}>
      <g fill="#8d97d6">
        <path d="M0 250 C120 215 220 235 330 222 L330 260 L0 260 Z" />
        <path d="M870 222 C990 232 1090 212 1200 240 L1200 260 L870 260 Z" />
        <rect x="380" y="150" width="440" height="110" />
        <path d="M380 150 h24 v-12 h22 v12 h22 v-12 h22 v12 h22 v-12 h22 v12 h22 v-12 h22 v12 h22 v-12 h22 v12 h22 v-12 h22 v12 h22 v-12 h22 v12 h22 v-12 h22 v12 h22 v-12 h22 v12 H820 V150 Z" />
        <rect x="335" y="88" width="55" height="172" />
        <path d="M328 88 L362 20 L396 88 Z" />
        <rect x="815" y="68" width="55" height="192" />
        <path d="M808 68 L842 -8 L876 68 Z" />
        <rect x="562" y="36" width="76" height="120" />
        <path d="M552 36 L600 -38 L648 36 Z" />
        <rect x="190" y="150" width="30" height="110" />
        <path d="M184 150 L205 104 L226 150 Z" />
        <rect x="958" y="142" width="32" height="118" />
        <path d="M952 142 L974 94 L996 142 Z" />
        <rect x="250" y="190" width="100" height="70" />
        <rect x="860" y="186" width="100" height="74" />
        <rect x="0" y="244" width="1200" height="16" />
      </g>
      <g fill="#fff3d1">
        {windows.map(([x, y], index) => (
          <rect key={index} x={x} y={y} width="7" height="13" rx="3" opacity="0.85" />
        ))}
      </g>
    </svg>
  )
}
