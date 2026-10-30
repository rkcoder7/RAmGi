export default function FloatingBook({
  className = '',
  color = '#29234D',
  trim = '#D8BA7A',
  width = 44,
  height = 60,
  rotate = 0,
  delay = 0,
  duration = 9,
}) {
  return (
    <span
      aria-hidden="true"
      className={`fbook ${className}`}
      style={{
        width,
        height,
        '--c': color,
        '--t': trim,
        '--r': `${rotate}deg`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  )
}
