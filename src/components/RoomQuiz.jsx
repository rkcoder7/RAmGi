import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { quiz, quizRooms } from '../data/quiz.js'
import { useProgress } from '../context/ProgressContext.jsx'

export default function RoomQuiz() {
  const { setFlag } = useProgress()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const total = quiz.questions.length
  const done = step >= total

  const result = () => {
    const tally = answers.reduce((counts, room) => ({ ...counts, [room]: (counts[room] || 0) + 1 }), {})
    const best = Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0]
    return quizRooms[best]
  }

  const choose = (room) => {
    const next = [...answers, room]
    setAnswers(next)
    setStep(step + 1)
    if (next.length === total) setFlag('quiz')
  }

  const restart = () => {
    setAnswers([])
    setStep(0)
  }

  return (
    <section aria-labelledby="quiz-heading" className="mx-auto w-full max-w-3xl">
      <h2 id="quiz-heading" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        {quiz.title}
      </h2>
      <div className="mt-10 rounded-3xl bg-cream p-7 shadow-[0_26px_54px_-26px_rgba(42,37,82,0.55)] sm:p-10" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {!done ? (
            <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
              <p className="text-sm text-ink-soft">{`Question ${step + 1} of ${total}`}</p>
              <span aria-hidden="true" className="mt-2 block h-1 overflow-hidden rounded-full bg-ink/10">
                <span className="block h-full rounded-full bg-rose transition-all duration-500" style={{ width: `${(step / total) * 100}%` }} />
              </span>
              <h3 className="mt-6 text-[clamp(1.8rem,4.5vw,2.5rem)] leading-tight text-ink">{quiz.questions[step].text}</h3>
              <div className="mt-6 grid gap-3">
                {quiz.questions[step].options.map((option) => (
                  <motion.button
                    key={option.text}
                    type="button"
                    onClick={() => choose(option.room)}
                    whileTap={{ scale: 0.98 }}
                    className="min-h-14 rounded-2xl border border-ink/20 bg-white px-5 py-3 text-left font-display text-[1.3rem] text-ink transition hover:border-ink hover:bg-blush"
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
              <p className="text-sm text-ink-soft">You are</p>
              <h3 className="mt-2 text-[clamp(2.4rem,7vw,4rem)] leading-[1.02] text-ink">{result().title}</h3>
              <p className="mt-5 font-display text-[1.45rem] leading-relaxed text-ink/90">{result().text}</p>
              <button
                type="button"
                onClick={restart}
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-cream transition hover:bg-ink-soft active:scale-[0.97]"
              >
                <RotateCcw aria-hidden="true" size={18} />
                Take the quiz again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
