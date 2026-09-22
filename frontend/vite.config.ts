import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Project site: https://from-system.github.io/FontWandelWeb/
  base: '/FontWandelWeb/',
  plugins: [react(), tailwindcss()],
})
