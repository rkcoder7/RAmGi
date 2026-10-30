import { useRef } from 'react'
import Modal from './Modal.jsx'
import MediaImage from './MediaImage.jsx'

export default function MemoryLightbox({ memory, open, onClose }) {
  const last = useRef(memory)
  if (memory) last.current = memory
  const shown = memory || last.current

  return (
    <Modal open={open && Boolean(shown)} onClose={onClose} label={shown ? shown.title : 'Memory'} size="xl">
      {shown && (
        <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
          <div className="bg-blush">
            {shown.video ? (
              <video controls preload="metadata" playsInline poster={shown.image || undefined} className="aspect-[4/3] h-full w-full bg-black object-contain">
                <source src={shown.video} />
                Your browser can’t play this video.
              </video>
            ) : (
              <div className="flex h-full min-h-[18rem] w-full items-center justify-center p-2 md:max-h-[88svh]">
                <MediaImage src={shown.image} alt={shown.imageAlt} kind="photo" label="A photo will go here" fit="contain" eager className="max-h-[80svh]" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 pt-14 sm:p-9 md:pt-9">
            <h2 className="text-4xl text-ink">{shown.title}</h2>
            <span aria-hidden="true" className="block h-px w-16 bg-gold-deep/70" />
            <p className="font-display text-2xl italic leading-snug text-ink-soft">{shown.caption}</p>
            {shown.story && <p className="font-display text-xl leading-relaxed text-ink/90">{shown.story}</p>}
          </div>
        </div>
      )}
    </Modal>
  )
}
