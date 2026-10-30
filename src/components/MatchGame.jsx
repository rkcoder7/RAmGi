import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Compass, Feather, Key, Moon, Music, Sparkles, Star, RotateCcw } from 'lucide-react'
import { useProgress } from '../context/ProgressContext.jsx'

const icons = [
  { id: 'book', Icon: BookOpen, name: 'Open book' },
  { id: 'star', Icon: Star, name: 'Star' },
  { id: 'moon', Icon: Moon, name: 'Moon' },
  { id: 'feather', Icon: Feather, name: 'Feather' },
  { id: 'key', Icon: Key, name: 'Key' },
  { id: 'music', Icon: Music, name: 'Music note' },
  { id: 'sparkles', Icon: Sparkles, name: 'Sparkles' },
  { id: 'compass', Icon: Compass, name: 'Compass' },
]

function shuffle(list) {
  const copy = [...list]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[other]] = [copy[other], copy[index]]
  }
  return copy
}

function deal() {
  return shuffle([...icons, ...icons].map((item, index) => ({ ...item, key: `${item.id}-${index}` })))
}

export default function MatchGame() {
  const { setFlag } = useProgress()
  const [cards, setCards] = useState(deal)
  const [open, setOpen] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)

  const won = matched.length === icons.length

  useEffect(() => {
    if (won) setFlag('match')
  }, [won, setFlag])

  useEffect(() => {
    if (open.length !== 2) return undefined
    const [first, second] = open.map((position) => cards[position])
    const timer = window.setTimeout(
      () => {
        if (first.id === second.id) setMatched((current) => [...current, first.id])
        setOpen([])
      },
      first.id === second.id ? 350 : 850,
    )
    return () => window.clearTimeout(timer)
  }, [open, cards])

  const flip = (position) => {
    if (open.length >= 2 || open.includes(position) || matched.includes(cards[position].id)) return
    const next = [...open, position]
    setOpen(next)
    if (next.length === 2) setMoves((value) => value + 1)
  }

  const restart = () => {
    setCards(deal())
    setOpen([])
    setMatched([])
    setMoves(0)
  }

  return (
    <section aria-labelledby="match-heading" className="mx-auto w-full max-w-3xl">
      <h2 id="match-heading" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        The matching shelf
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center font-display text-[1.4rem] italic text-ink/85">
        Eight pairs of book icons are hiding. Find them all.
      </p>
      <p className="mt-6 text-center text-sm text-ink" aria-live="polite">
        {won ? `All matched in ${moves} moves.` : `Moves: ${moves}. Pairs found: ${matched.length} of ${icons.length}.`}
      </p>
      <ul className="mx-auto mt-6 grid max-w-md grid-cols-4 gap-3">
        {cards.map((card, position) => {
          const faceUp = open.includes(position) || matched.includes(card.id)
          const { Icon } = card
          return (
            <li key={card.key}>
              <motion.button
                type="button"
                onClick={() => flip(position)}
                aria-label={faceUp ? card.name : 'Card, face down'}
                aria-pressed={faceUp}
                whileTap={{ scale: 0.94 }}
                animate={{ rotateY: faceUp ? 0 : 180 }}
                transition={{ duration: 0.35 }}
                style={{ transformPerspective: 600 }}
                className={`grid aspect-square w-full place-items-center rounded-2xl ${
                  faceUp ? (matched.includes(card.id) ? 'bg-rose text-ink' : 'bg-cream text-ink') : 'bg-ink text-cream'
                } shadow-[0_12px_26px_-14px_rgba(42,37,82,0.6)]`}
              >
                {faceUp ? <Icon aria-hidden="true" size={30} /> : <Star aria-hidden="true" size={18} className="opacity-60" />}
              </motion.button>
            </li>
          )
        })}
      </ul>
      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={restart}
          className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/40 px-6 transition hover:border-ink"
        >
          <RotateCcw aria-hidden="true" size={18} />
          Shuffle and start again
        </button>
      </div>
    </section>
  )
}
