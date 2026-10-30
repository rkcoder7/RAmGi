import { motion } from 'framer-motion'
import { letter } from '../data/letter.js'

export default function LetterBook() {
  return (
    <div className="mx-auto w-full max-w-2xl" style={{ perspective: 1600 }}>
      <motion.article
        aria-label="A letter for Rakshi"
        className="letter-paper rounded-r-xl rounded-l-sm px-7 pb-12 pt-12 sm:px-16 sm:pb-16 sm:pt-16"
        style={{ transformOrigin: 'top center' }}
        initial={{ opacity: 0, rotateX: -78, y: -30 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 0.8, 0.24, 1] }}
      >
        <span
          aria-hidden="true"
          className="absolute -top-1 right-8 block h-16 w-4 bg-gradient-to-b from-rose to-[#b84a6d] [clip-path:polygon(0_0,100%_0,100%_100%,50%_82%,0_100%)]"
        />
        <h2 className="text-[2.1rem] italic text-ink sm:text-5xl">{letter.salutation}</h2>
        <div className="mt-6 grid gap-5 font-display text-[1.3rem] leading-[1.65] sm:text-[1.5rem]">
          {letter.paragraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? 'text-[1.5rem] font-semibold sm:text-[1.8rem]' : undefined}>
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-9 text-right font-display text-[1.7rem] italic text-ink sm:text-3xl">{letter.signature}</p>
      </motion.article>
    </div>
  )
}
