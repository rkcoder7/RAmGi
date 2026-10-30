import { Music } from 'lucide-react'
import { motion } from 'framer-motion'
import { soundtrack } from '../data/soundtrack.js'
import { useSoundtrack } from '../context/SoundtrackContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import Reveal from './Reveal.jsx'

export default function SoundtrackStage() {
  const { setOpen, choose, loadedId } = useSoundtrack()
  const { setFlag } = useProgress()

  const play = (id) => {
    choose(id)
    setOpen(true)
    setFlag('soundtrack')
  }

  return (
    <section aria-labelledby="soundtrack-heading" className="mx-auto w-full max-w-6xl">
      <h2 id="soundtrack-heading" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        The library soundtrack
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-center font-display text-[1.4rem] italic text-ink/85">
        Three songs to read by. Pick one and the player stays with you across every room.
      </p>
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {soundtrack.map((track, index) => (
          <Reveal as="li" key={track.id} y={50} delay={index * 0.1}>
            <motion.div
              className="flex h-full flex-col rounded-3xl bg-cream p-7 shadow-[0_26px_54px_-26px_rgba(42,37,82,0.55)]"
              whileHover={{ y: -6 }}
            >
              <span className="text-sm text-ink-soft">{track.album}</span>
              <h3 className="mt-2 text-[2.2rem] leading-[1.02] text-ink">{track.title}</h3>
              <p className="mt-4 font-display text-[1.3rem] leading-snug text-ink/90">{track.mood}</p>
              <button
                type="button"
                onClick={() => play(track.id)}
                className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-ink px-6 pt-0 font-medium text-cream transition hover:bg-ink-soft active:scale-[0.97]"
                style={{ marginTop: '1.75rem' }}
              >
                <Music aria-hidden="true" size={18} />
                {loadedId === track.id ? `Now chosen: ${track.title}` : `Play ${track.title}`}
              </button>
            </motion.div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
