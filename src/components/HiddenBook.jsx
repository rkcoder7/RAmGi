import { useRef, useState } from 'react'
import { Check, Lock } from 'lucide-react'
import Modal from './Modal.jsx'
import { hiddenBook } from '../data/secrets.js'
import { normalizeAnswer } from '../lib/text.js'
import { useProgress } from '../context/ProgressContext.jsx'

export default function HiddenBook() {
  const { progress, markHiddenBook } = useProgress()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('idle')
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef(null)

  const found = progress.hiddenBook || status === 'correct'

  const close = () => {
    setOpen(false)
    setStatus('idle')
    setValue('')
  }

  const submit = (event) => {
    event.preventDefault()
    const guess = normalizeAnswer(value)
    const correct = hiddenBook.answers.some((answer) => normalizeAnswer(answer) === guess)
    if (correct) {
      markHiddenBook()
      setStatus('correct')
    } else {
      setStatus('wrong')
      setShaking(true)
      inputRef.current?.focus()
    }
  }

  return (
    <>
      <div className="relative mx-auto mt-16 max-w-5xl px-4">
        <div className="relative flex h-16 items-end justify-center gap-1.5">
          <span aria-hidden="true" className="h-9 w-3.5 rounded-sm bg-[#8a7bd8]" />
          <span aria-hidden="true" className="h-12 w-4 rounded-sm bg-[#c46a8f]" />
          <span aria-hidden="true" className="h-10 w-3 rounded-sm bg-[#f2d79a]" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-label={`${hiddenBook.label}. Opens a small puzzle.`}
            className={`relative h-14 w-4 rotate-6 rounded-sm border transition hover:-translate-y-1 hover:rotate-0 ${
              found
                ? 'border-gold-deep bg-gold shadow-[0_0_18px_rgba(185,138,60,0.7)]'
                : 'border-gold-deep/70 bg-cream hover:border-gold-deep'
            }`}
          >
            <span className="absolute inset-x-0 top-3 mx-auto block h-px w-2 bg-gold-deep" />
          </button>
          <span aria-hidden="true" className="h-11 w-3.5 rounded-sm bg-[#4a5aa8]" />
          <span aria-hidden="true" className="h-9 w-4 rounded-sm bg-[#fff8f2]" />
        </div>
        <span aria-hidden="true" className="block h-1 w-full rounded bg-gradient-to-r from-transparent via-gold-deep/60 to-transparent" />
      </div>

      <Modal open={open} onClose={close} label={hiddenBook.label} size="md">
        <div className="px-6 pb-8 pt-12 sm:px-10">
          {found ? (
            <div aria-live="polite">
              <div className="mx-auto grid size-14 place-items-center rounded-full border border-gold-deep text-gold-deep">
                <Check aria-hidden="true" size={26} />
              </div>
              <h2 className="mt-5 text-center text-4xl">{hiddenBook.successTitle}</h2>
              <div className="mt-5 grid gap-3 font-display text-xl leading-relaxed text-ink/90">
                {hiddenBook.successParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="mx-auto grid size-14 place-items-center rounded-full border border-gold-deep/60 text-gold-deep">
                <Lock aria-hidden="true" size={24} />
              </div>
              <h2 className="mt-5 text-center text-4xl">{hiddenBook.label}</h2>
              <p id="hidden-book-clue" className="mt-4 text-center font-display text-xl italic text-ink/85">
                {hiddenBook.clue}
              </p>
              <label htmlFor="hidden-book-answer" className="sr-only">
                Your answer
              </label>
              <input
                id="hidden-book-answer"
                ref={inputRef}
                data-autofocus
                type="text"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck="false"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value)
                  if (status === 'wrong') setStatus('idle')
                }}
                aria-describedby="hidden-book-clue hidden-book-feedback"
                aria-invalid={status === 'wrong'}
                placeholder={hiddenBook.placeholder}
                onAnimationEnd={() => setShaking(false)}
                className={`mt-6 block min-h-12 w-full rounded border bg-white px-4 text-center text-lg text-ink placeholder:text-ink/40 ${
                  status === 'wrong' ? 'border-rose' : 'border-ink/30'
                } ${shaking ? 'shake' : ''}`}
              />
              <p
                id="hidden-book-feedback"
                role="alert"
                className="mt-3 min-h-6 text-center text-sm text-[#a3334f]"
              >
                {status === 'wrong' ? hiddenBook.wrongMessage : ''}
              </p>
              <button
                type="submit"
                className="mt-4 min-h-12 w-full rounded border bg-ink px-6 font-medium text-cream transition hover:bg-ink-soft"
              >
                Open the book
              </button>
            </form>
          )}
        </div>
      </Modal>
    </>
  )
}
