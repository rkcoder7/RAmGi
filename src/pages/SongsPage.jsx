import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { recording } from '../data/songs.js'
import { stories } from '../data/stories.js'
import ChapterHeader from '../components/ChapterHeader.jsx'
import Envelope from '../components/Envelope.jsx'
import NextScene from '../components/NextScene.jsx'
import PoemShelf from '../components/PoemShelf.jsx'
import Reveal from '../components/Reveal.jsx'
import Shot from '../components/Shot.jsx'
import SoundtrackStage from '../components/SoundtrackStage.jsx'
import StoryBook from '../components/StoryBook.jsx'

const ringSizes = [220, 340, 470, 610, 760]

export default function SongsPage() {
  const [opened, setOpened] = useState(false)

  return (
    <div>
      <ChapterHeader id="songs">
        A soundtrack for the whole library, a sealed envelope, and a shelf of stories and poems.
      </ChapterHeader>

      <Shot className="items-center">
        <SoundtrackStage />
      </Shot>

      <Shot className="items-center overflow-hidden">
        <div aria-hidden="true" className="rings absolute inset-0">
          {ringSizes.map((size, index) => (
            <span key={size} className="ring" style={{ width: size, height: size, animationDelay: `${index * 0.5}s` }} />
          ))}
        </div>
        <section aria-labelledby="listening-room" className="relative mx-auto w-full max-w-2xl">
          <h2 id="listening-room" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
            The listening room
          </h2>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: -90, rotate: -9 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 70, damping: 11, delay: 0.3 }}
          >
            <Envelope open={opened} onToggle={() => setOpened((value) => !value)} title={recording.title} controls="song-letter" />
            <p className="mt-5 text-center text-sm text-ink-soft">Sealed with a little gold star.</p>
          </motion.div>
          <div id="song-letter">
            <AnimatePresence initial={false}>
              {opened && (
                <motion.div
                  key="player"
                  initial={{ opacity: 0, y: -24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 0.8, 0.24, 1] }}
                  className="mx-auto mt-8 w-full max-w-xl rounded-[2rem] border border-gold/70 bg-cream px-7 py-10 text-center shadow-[0_24px_50px_-24px_rgba(42,37,82,0.55)] sm:px-12 sm:py-14"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-gold-deep">A little promise</p>
                  <p className="mt-6 font-display text-[clamp(2rem,6vw,3.5rem)] italic leading-tight text-ink">
                    I am always ready to sing for you at any time
                  </p>
                  <span role="img" aria-label="peeking eyes" className="mt-5 inline-block text-4xl">👀</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </Shot>

      <Shot className="items-center">
        <section aria-labelledby="reading-corner" className="mx-auto w-full max-w-3xl">
          <h2 id="reading-corner" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
            The reading corner
          </h2>
          <Reveal as="p" className="mx-auto mb-10 mt-4 max-w-md text-center font-display text-[1.4rem] italic text-ink/85">
            {`${stories.length} stories, written for this library, including a serial in ten chapters. Pick one and turn the pages.`}
          </Reveal>
          <Reveal>
            <StoryBook stories={stories} />
          </Reveal>
        </section>
      </Shot>

      <Shot className="items-center">
        <PoemShelf />
      </Shot>

      <NextScene id="songs" />
    </div>
  )
}
