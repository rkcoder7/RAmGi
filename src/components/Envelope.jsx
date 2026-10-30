import { Star } from 'lucide-react'

export default function Envelope({ open, onToggle, title, controls }) {
  return (
    <button
      type="button"
      className="envelope mx-auto"
      data-open={open}
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
    >
      <span className="envelope-back" />
      <span className="envelope-flap" />
      <span className="envelope-front" />
      <span className="envelope-title">{title}</span>
      <span className="envelope-seal">
        <Star aria-hidden="true" size={20} className="fill-current" />
      </span>
      <span className="sr-only">{open ? 'Close the envelope' : 'Open the envelope'}</span>
    </button>
  )
}
