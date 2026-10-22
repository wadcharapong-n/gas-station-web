import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { I18nProvider } from './lib/i18n/I18nProvider'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { MapPage } from './pages/MapPage'
import { ServicesPage } from './pages/ServicesPage'
import { PublicLayout } from './templates/PublicLayout'

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  )
}
