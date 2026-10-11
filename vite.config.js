import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages project site. If you later move to a custom domain, change this to '/'.
  base: '/',
})
