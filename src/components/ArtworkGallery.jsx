import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useProgress } from '../context/ProgressContext.jsx'
import MediaImage from './MediaImage.jsx'
import Modal from './Modal.jsx'

export default function ArtworkGallery({ artworks }) {
  const { markViewed } = useProgress()
  const [index, setIndex] = useState(null)
  const lastIndex = useRef(0)
  if (index !== null) lastIndex.current = index
  const open = index !== null
  const shownIndex = index !== null ? index : lastIndex.current
  const current = artworks[shownIndex]

  const step = useCallback(
    (direction) => {
      setIndex((value) => (value === null ? value : (value + direction + artworks.length) % artworks.length))
    },
    [artworks.length],
  )

  useEffect(() => {
    if (index !== null) markViewed(artworks[index].id)
  }, [index, artworks, markViewed])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        step(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        step(-1)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, step])

  return (
    <>
      <ul className="mx-auto grid max-w-6xl gap-x-8 gap-y-16 px-1 pt-10 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork, position) => (
          <motion.li
            key={artwork.id}
            style={{ transformPerspective: 1000 }}
            initial={{ opacity: 0, y: 70, rotateX: -22 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1, delay: (position % 3) * 0.14, ease: [0.22, 0.8, 0.24, 1] }}
          >
            <figure className="spotlight relative">
              <button
                type="button"
                onClick={() => setIndex(position)}
                aria-haspopup="dialog"
                aria-label={`View ${artwork.title} full size`}
                className="frame-mat group relative block aspect-[4/5] w-full overflow-hidden transition duration-500 hover:-translate-y-1"
              >
                <span className="block h-full w-full overflow-hidden bg-[#efe3d0]">
                  <MediaImage src={artwork.src} alt={artwork.alt} kind="drawing" label="A drawing will hang here" fit="contain" />
                </span>
              </button>
              <figcaption className="mt-6 text-center">
                <p className="font-display text-2xl text-cream">{artwork.title}</p>
                <p className="mt-1 text-sm text-cream/80">{artwork.caption}</p>
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </ul>

      <Modal open={open} onClose={() => setIndex(null)} label={`${current.title}, artwork viewer`} size="xl">
        <div className="px-4 pb-6 pt-16 sm:px-10">
          <div className="frame-mat mx-auto flex max-h-[62svh] w-fit max-w-full items-center justify-center overflow-hidden">
            <div className="h-[58svh] w-[min(78vw,44rem)] max-w-full bg-[#efe3d0]">
              <MediaImage src={current.src} alt={current.alt} kind="drawing" label="A drawing will hang here" fit="contain" eager />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous artwork"
              className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/30 transition hover:border-ink"
            >
              <ChevronLeft aria-hidden="true" size={22} />
            </button>
            <div className="text-center" aria-live="polite">
              <h2 className="text-3xl text-ink">{current.title}</h2>
              <p className="mt-1 text-sm text-ink-soft">{current.caption}</p>
              <p className="mt-2 text-xs text-ink-soft">
                Artwork {shownIndex + 1} of {artworks.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next artwork"
              className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/30 transition hover:border-ink"
            >
              <ChevronRight aria-hidden="true" size={22} />
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
