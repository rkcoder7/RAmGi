import { useEffect, useMemo, useRef, useState } from 'react'
import { Music, Pause, Play, RotateCcw } from 'lucide-react'
import { seededRandom } from '../lib/random.js'
import { formatTime } from '../lib/text.js'
import { site } from '../data/site.js'

const BAR_COUNT = 48

export default function AudioPlayer({ src, title, onPlayingChange, onEnded }) {
  const audioRef = useRef(null)
  const [status, setStatus] = useState(src ? 'loading' : 'missing')
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  const bars = useMemo(() => {
    const random = seededRandom(21)
    return Array.from({ length: BAR_COUNT }, (_, index) => ({
      height: 22 + Math.round((Math.sin(index / 3.2) * 0.5 + 0.5) * 40 + random() * 34),
      delay: (index % 12) * 0.09,
    }))
  }, [])

  useEffect(() => {
    setStatus(src ? 'loading' : 'missing')
    setPlaying(false)
    setCurrent(0)
    setDuration(0)
  }, [src])

  useEffect(() => {
    if (onPlayingChange) onPlayingChange(playing)
  }, [playing, onPlayingChange])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setStatus('missing')
      }
    } else {
      audio.pause()
    }
  }

  const replay = async () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    setCurrent(0)
    try {
      await audio.play()
    } catch {
      setStatus('missing')
    }
  }

  const seek = (event) => {
    const audio = audioRef.current
    const value = Number(event.target.value)
    if (audio) audio.currentTime = value
    setCurrent(value)
  }

  if (status === 'missing') {
    return (
      <div className="rounded-3xl border-2 border-dashed border-ink/30 bg-white/40 p-6 text-center" role="status">
        <Music aria-hidden="true" size={28} className="mx-auto text-gold-deep" />
        <p className="mt-3 font-display text-2xl">This recording is still being tuned</p>
        <p className="mt-2 text-sm text-ink-soft">
          {site.showSetupNotes
            ? 'Add your recording as public/audio/song-from-ram.mp3 (or change the path in src/data/songs.js), then refresh the page.'
            : 'Check back soon.'}
        </p>
      </div>
    )
  }

  const progress = duration > 0 ? current / duration : 0
  const ready = status === 'ready'

  return (
    <div className="rounded-3xl bg-cream p-5 shadow-[0_24px_50px_-24px_rgba(42,37,82,0.55)] sm:p-6">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration)
          setStatus('ready')
        }}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false)
          if (onEnded) onEnded()
        }}
        onError={() => setStatus('missing')}
      />
      <p className="text-center font-display text-2xl">{title}</p>

      <div
        aria-hidden="true"
        className={`mt-5 flex h-20 items-center justify-center gap-[3px] ${playing ? 'wave-playing' : ''}`}
      >
        {bars.map((bar, index) => {
          const played = (index + 1) / BAR_COUNT <= progress
          return (
            <span
              key={index}
              className="wave-bar"
              style={{
                height: `${bar.height}%`,
                animationDelay: `${bar.delay}s`,
                backgroundColor: played ? '#a9782b' : 'rgba(106,91,176,0.35)',
              }}
            />
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          disabled={!ready}
          aria-label={playing ? 'Pause' : 'Play'}
          className="grid size-14 shrink-0 place-items-center rounded-full bg-ink text-cream transition hover:bg-ink-soft disabled:cursor-wait disabled:opacity-50"
        >
          {playing ? <Pause aria-hidden="true" size={24} /> : <Play aria-hidden="true" size={24} className="translate-x-0.5" />}
        </button>
        <button
          type="button"
          onClick={replay}
          disabled={!ready}
          aria-label="Replay from the start"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/30 transition hover:border-ink disabled:opacity-50"
        >
          <RotateCcw aria-hidden="true" size={18} />
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="w-10 text-right text-xs tabular-nums text-ink-soft">{formatTime(current)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(current, duration || 0)}
            onChange={seek}
            disabled={!ready}
            aria-label="Seek"
            aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
            className="h-11 min-w-0 flex-1 cursor-pointer accent-[#2a2552] disabled:opacity-50"
          />
          <span className="w-10 text-xs tabular-nums text-ink-soft">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}
