import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, DoorClosed, Lightbulb } from 'lucide-react'
import { riddles } from '../data/riddles.js'
import { normalizeAnswer } from '../lib/text.js'
import { useProgress } from '../context/ProgressContext.jsx'

function Door({ riddle, index }) {
  const { progress, markSolved } = useProgress()
  const solved = progress.solved.includes(riddle.id)
  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)
  const [hint, setHint] = useState(false)
  const [shaking, setShaking] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    const guess = normalizeAnswer(value)
    if (riddle.answers.some((answer) => normalizeAnswer(answer) === guess)) {
      markSolved(riddle.id)
      setWrong(false)
    } else {
      setWrong(true)
      setShaking(true)
    }
  }

  return (
    <motion.li
      className={`rounded-3xl p-6 ${solved ? 'bg-cream shadow-[0_20px_44px_-22px_rgba(42,37,82,0.5)]' : 'bg-cream/85 shadow-[0_20px_44px_-26px_rgba(42,37,82,0.5)]'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1 }}
    >
      <div className="flex items-start gap-4">
        <span className={`grid size-12 shrink-0 place-items-center rounded-full ${solved ? 'bg-ink text-cream' : 'bg-rose text-ink'}`}>
          {solved ? <Check aria-hidden="true" size={22} /> : <DoorClosed aria-hidden="true" size={22} />}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[1.7rem] leading-tight text-ink">{`Door ${index + 1}${solved ? ', open' : ''}`}</h3>
          <p className="mt-2 font-display text-[1.35rem] leading-snug text-ink/90">{riddle.text}</p>
          {solved ? (
            <p className="mt-4 text-sm text-ink-soft" role="status">
              The door swings open. Answer: {riddle.answers[0]}.
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="mt-4">
              <label htmlFor={`riddle-${riddle.id}`} className="sr-only">
                {`Answer for door ${index + 1}`}
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  id={`riddle-${riddle.id}`}
                  type="text"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck="false"
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value)
                    setWrong(false)
                  }}
                  onAnimationEnd={() => setShaking(false)}
                  aria-invalid={wrong}
                  aria-describedby={`riddle-feedback-${riddle.id}`}
                  placeholder="Your answer"
                  className={`min-h-12 min-w-0 flex-1 rounded-xl border bg-white px-4 text-ink placeholder:text-ink/40 ${wrong ? 'border-rose' : 'border-ink/25'} ${shaking ? 'shake' : ''}`}
                />
                <button type="submit" className="min-h-12 rounded-full bg-ink px-6 font-medium text-cream transition hover:bg-ink-soft active:scale-[0.97]">
                  Knock
                </button>
              </div>
              <p id={`riddle-feedback-${riddle.id}`} role="alert" className="mt-2 min-h-5 text-sm text-[#a3334f]">
                {wrong ? 'The door stays shut. Try again.' : ''}
              </p>
              <button
                type="button"
                onClick={() => setHint((current) => !current)}
                aria-expanded={hint}
                className="mt-1 inline-flex min-h-11 items-center gap-2 rounded text-sm text-ink-soft underline decoration-ink/30 underline-offset-4 hover:text-ink"
              >
                <Lightbulb aria-hidden="true" size={16} />
                {hint ? 'Hide the hint' : 'Need a hint?'}
              </button>
              {hint && <p className="mt-1 text-sm text-ink-soft">{riddle.hint}</p>}
            </form>
          )}
        </div>
      </div>
    </motion.li>
  )
}

export default function RiddleDoors() {
  const { progress } = useProgress()
  return (
    <section aria-labelledby="riddles-heading" className="mx-auto w-full max-w-5xl">
      <h2 id="riddles-heading" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        Eight riddle doors
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center font-display text-[1.4rem] italic text-ink/85">
        Each door opens for one word. {progress.solved.length} of {riddles.length} open.
      </p>
      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {riddles.map((riddle, index) => (
          <Door key={riddle.id} riddle={riddle} index={index} />
        ))}
      </ul>
    </section>
  )
}
