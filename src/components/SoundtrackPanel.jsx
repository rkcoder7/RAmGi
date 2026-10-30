import { Music, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { soundtrack } from '../data/soundtrack.js'
import { site } from '../data/site.js'
import { useSoundtrack } from '../context/SoundtrackContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'

export function SoundtrackPlayer({ track }) {
  if (track.spotifyId) {
    return (
      <iframe
        title={`${track.title} on Spotify`}
        src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator`}
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl border-0"
      />
    )
  }
  return (
    <div className="rounded-xl bg-blush p-4 text-sm text-ink">
      <p>Open this song on an official service and keep this tab open while you read.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={track.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded bg-ink px-4 font-medium text-cream transition hover:bg-ink-soft"
        >
          Open on Spotify
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a
          href={track.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded border border-ink/40 px-4 transition hover:border-ink"
        >
          Search on YouTube
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      {site.showSetupNotes && (
        <p className="mt-3 text-xs text-ink-soft">
          Setup note: paste this track’s Spotify ID into src/data/soundtrack.js to play it right here.
        </p>
      )}
    </div>
  )
}

export default function SoundtrackPanel() {
  const { open, setOpen, active, loadedId, choose } = useSoundtrack()
  const { setFlag } = useProgress()
  const loadedTrack = soundtrack.find((item) => item.id === loadedId)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="soundtrack-panel"
        className="fixed right-3 top-3 z-40 inline-flex min-h-11 items-center gap-2 rounded-full bg-cream/90 px-4 text-sm font-medium text-ink shadow-[0_10px_30px_-10px_rgba(42,37,82,0.5)] backdrop-blur transition hover:bg-white"
      >
        {open ? <X aria-hidden="true" size={16} /> : <Music aria-hidden="true" size={16} />}
        <span>Soundtrack</span>
      </button>

      <motion.aside
        id="soundtrack-panel"
        aria-label="Library soundtrack"
        inert={!open}
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : -12 }}
        transition={{ duration: 0.3 }}
        style={{ visibility: open || loadedTrack ? 'visible' : 'hidden', pointerEvents: open ? 'auto' : 'none' }}
        className="fixed right-3 top-[3.9rem] z-40 w-[min(24rem,calc(100vw-1.5rem))] rounded-2xl bg-cream/95 p-4 text-ink shadow-[0_30px_60px_-20px_rgba(42,37,82,0.55)] backdrop-blur-md"
      >
        <h2 className="text-2xl">Library soundtrack</h2>
        <p className="mt-1 text-sm text-ink-soft">Three songs for reading by. Pick one and press play.</p>
        <div role="group" aria-label="Choose a song" className="mt-3 grid gap-1.5">
          {soundtrack.map((track) => (
            <button
              key={track.id}
              type="button"
              aria-pressed={track.id === active.id && loadedId === track.id}
              onClick={() => {
                choose(track.id)
                setFlag('soundtrack')
              }}
              className={`min-h-11 rounded-lg px-3 py-2 text-left transition ${
                track.id === loadedId ? 'bg-ink text-cream' : 'bg-blush text-ink hover:bg-white'
              }`}
            >
              <span className="block font-display text-xl leading-tight">{track.title}</span>
              <span className="block text-xs opacity-80">{track.album}</span>
            </button>
          ))}
        </div>
        <div className="mt-3">{loadedTrack ? <SoundtrackPlayer track={loadedTrack} /> : <p className="rounded-xl bg-blush p-3 text-sm">Nothing is playing. Choose a song above.</p>}</div>
      </motion.aside>
    </>
  )
}
