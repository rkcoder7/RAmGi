import { Link } from 'react-router-dom'
import Shot from '../components/Shot.jsx'

export default function NotFoundPage() {
  return (
    <Shot className="items-center text-center">
      <h1 className="text-[clamp(2.6rem,8vw,5.5rem)] leading-[1.02] text-ink">This shelf is empty</h1>
      <p className="mx-auto mt-5 max-w-xl font-display text-2xl italic text-ink/90">
        There is no book at this address. The library is still where you left it.
      </p>
      <div className="mt-8">
        <Link to="/" className="inline-flex min-h-14 items-center rounded-full bg-ink px-8 text-lg font-medium text-cream transition hover:bg-ink-soft">
          Return to the library
        </Link>
      </div>
    </Shot>
  )
}
