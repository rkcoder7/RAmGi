import { MotionConfig } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext.jsx'
import { SoundtrackProvider } from './context/SoundtrackContext.jsx'
import AppLayout from './components/AppLayout.jsx'
import LibraryPage from './pages/LibraryPage.jsx'
import ArchivePage from './pages/ArchivePage.jsx'
import ArtistPage from './pages/ArtistPage.jsx'
import SongsPage from './pages/SongsPage.jsx'
import PuzzlesPage from './pages/PuzzlesPage.jsx'
import TowerPage from './pages/TowerPage.jsx'
import UnwrittenPage from './pages/UnwrittenPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ProgressProvider>
        <SoundtrackProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<LibraryPage />} />
              <Route path="archive" element={<ArchivePage />} />
              <Route path="art" element={<ArtistPage />} />
              <Route path="songs" element={<SongsPage />} />
              <Route path="puzzles" element={<PuzzlesPage />} />
              <Route path="tower" element={<TowerPage />} />
              <Route path="unwritten" element={<UnwrittenPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </SoundtrackProvider>
      </ProgressProvider>
    </MotionConfig>
  )
}
