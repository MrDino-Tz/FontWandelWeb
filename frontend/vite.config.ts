import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Project site: https://mrdino-tz.github.io/FontWandelWeb/
  base: '/FontWandelWeb/',
  plugins: [react(), tailwindcss()],
  server: {
    // Proxy API calls to the FastAPI backend during `npm run dev`
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
})
