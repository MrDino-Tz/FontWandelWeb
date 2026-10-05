import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SiteContentProvider } from './admin/store.tsx'
import { AuthProvider } from './admin/auth.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SiteContentProvider>
        <App />
      </SiteContentProvider>
    </AuthProvider>
  </StrictMode>,
)
