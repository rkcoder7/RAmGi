import { createContext, useContext, useMemo, useState } from 'react'
import { soundtrack } from '../data/soundtrack.js'

const SoundtrackContext = createContext(null)

export function SoundtrackProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [loadedId, setLoadedId] = useState(null)

  const value = useMemo(() => {
    const active = soundtrack.find((item) => item.id === activeId) || soundtrack[0]
    return {
      open,
      setOpen,
      active,
      loadedId,
      choose: (id) => {
        setActiveId(id)
        setLoadedId(id)
      },
    }
  }, [open, activeId, loadedId])

  return <SoundtrackContext.Provider value={value}>{children}</SoundtrackContext.Provider>
}

export function useSoundtrack() {
  const context = useContext(SoundtrackContext)
  if (!context) throw new Error('useSoundtrack must be used inside SoundtrackProvider')
  return context
}
