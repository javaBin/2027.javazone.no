import { Navigate, Route, Routes } from 'react-router-dom'

import AboutPage from '@/pages/AboutPage'
import HistoryPage from '@/pages/HistoryPage.tsx'
import InfoPage from '@/pages/InfoPage.tsx'
import JourneyZonePage from '@/pages/JourneyZonePage'
import MainPage from '@/pages/MainPage.tsx'
import PartnerInfoPage from '@/pages/PartnerInfoPage.tsx'
import PartnerPage from '@/pages/PartnerPage.tsx'
import TicketsPage from '@/pages/TicketsPage.tsx'
import VolunteerPage from '@/pages/VolunteerPage'
import { SpeakerRoutes } from '@/routes'

const AppRoutes = () => {
  // The program (/program, /program/:id + TalkModal overlay) is kept in code but not routed until the
  // 2027 program is published — see git history for the previous route setup.
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/partner" element={<PartnerPage />} />
      <Route path="/partner/info" element={<PartnerInfoPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/speaker/*" element={<SpeakerRoutes />} />
      <Route path="/journeyzone" element={<JourneyZonePage />} />
      <Route path="/volunteer" element={<VolunteerPage />} />
      <Route path="/about" element={<AboutPage />} />
      {/* Unknown paths (including old 2026 routes like /food) go to the front page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
