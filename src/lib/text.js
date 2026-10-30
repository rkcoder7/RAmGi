export function normalizeAnswer(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const whole = Math.floor(seconds)
  const minutes = Math.floor(whole / 60)
  const rest = String(whole % 60).padStart(2, '0')
  return `${minutes}:${rest}`
}
