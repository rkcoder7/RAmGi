import { useEffect, useState } from 'react'
import Placeholder from './Placeholder.jsx'

export default function MediaImage({
  src,
  alt,
  kind = 'photo',
  label,
  className = '',
  fit = 'cover',
  eager = false,
}) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  if (!src || failed) {
    return <Placeholder kind={kind} label={label} alt={alt} />
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`block h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
    />
  )
}
