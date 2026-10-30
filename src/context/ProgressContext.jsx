import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { memories } from '../data/memories.js'
import { stamps } from '../data/stamps.js'

const STORAGE_KEY = 'library-of-little-universes:progress:v2'

const emptyProgress = {
  entered: false,
  visited: [],
  opened: [],
  hiddenBook: false,
  read: [],
  solved: [],
  viewed: [],
  flags: {},
}

function readProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress
    const parsed = JSON.parse(raw)
    const list = (value) => (Array.isArray(value) ? value : [])
    return {
      entered: parsed.entered === true,
      visited: list(parsed.visited),
      opened: list(parsed.opened),
      hiddenBook: parsed.hiddenBook === true,
      read: list(parsed.read),
      solved: list(parsed.solved),
      viewed: list(parsed.viewed),
      flags: parsed.flags && typeof parsed.flags === 'object' ? parsed.flags : {},
    }
  } catch {
    return emptyProgress
  }
}

function writeProgress(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    return
  }
}

function computeEarned(p) {
  const count = (prefix) => p.read.filter((item) => item.startsWith(prefix)).length
  const ids = []
  if (p.entered) ids.push('entered')
  if (memories.every((memory) => p.opened.includes(memory.id))) ids.push('memories')
  if (p.viewed.length >= 3) ids.push('gallery')
  if (count('story:') >= 1) ids.push('story')
  if (count('story:') >= 3) ids.push('bookworm')
  if (count('poem:') >= 4) ids.push('poet')
  if (p.solved.length >= 3) ids.push('riddles')
  if (p.flags.quiz) ids.push('quiz')
  if (p.flags.match) ids.push('match')
  if (p.flags.fortune) ids.push('fortune')
  if (p.flags.wish) ids.push('wish')
  if (p.flags.star) ids.push('star')
  if (p.flags.soundtrack) ids.push('soundtrack')
  if (p.hiddenBook) ids.push('hidden')
  if (p.flags.letter) ids.push('letter')
  return ids
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(readProgress)
  const [toast, setToast] = useState(null)
  const previous = useRef(null)
  const timer = useRef(null)

  useEffect(() => {
    writeProgress(progress)
  }, [progress])

  const earned = useMemo(() => computeEarned(progress), [progress])

  useEffect(() => {
    if (previous.current === null) {
      previous.current = earned
      return
    }
    const fresh = earned.filter((id) => !previous.current.includes(id))
    previous.current = earned
    if (fresh.length === 0) return
    const stamp = stamps.find((item) => item.id === fresh[fresh.length - 1])
    setToast(stamp || null)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(null), 4800)
  }, [earned])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const addTo = useCallback((key, id) => {
    setProgress((current) => (current[key].includes(id) ? current : { ...current, [key]: [...current[key], id] }))
  }, [])

  const setEntered = useCallback((entered) => {
    setProgress((current) => (current.entered === entered ? current : { ...current, entered }))
  }, [])

  const setFlag = useCallback((name) => {
    setProgress((current) => (current.flags[name] ? current : { ...current, flags: { ...current.flags, [name]: true } }))
  }, [])

  const markVisited = useCallback((id) => addTo('visited', id), [addTo])
  const markOpened = useCallback((id) => addTo('opened', id), [addTo])
  const markRead = useCallback((id) => addTo('read', id), [addTo])
  const markSolved = useCallback((id) => addTo('solved', id), [addTo])
  const markViewed = useCallback((id) => addTo('viewed', id), [addTo])

  const markHiddenBook = useCallback(() => {
    setProgress((current) => (current.hiddenBook ? current : { ...current, hiddenBook: true }))
  }, [])

  const resetProgress = useCallback(() => {
    previous.current = []
    setProgress(emptyProgress)
  }, [])

  const dismissToast = useCallback(() => setToast(null), [])

  const value = useMemo(
    () => ({
      progress,
      earned,
      toast,
      dismissToast,
      setEntered,
      setFlag,
      markVisited,
      markOpened,
      markRead,
      markSolved,
      markViewed,
      markHiddenBook,
      resetProgress,
    }),
    [progress, earned, toast, dismissToast, setEntered, setFlag, markVisited, markOpened, markRead, markSolved, markViewed, markHiddenBook, resetProgress],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress must be used inside ProgressProvider')
  return context
}
