import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('> 0.5%, last 2 versions, Firefox ESR, not dead')),
      drafts: {
        customMedia: true,
        nesting: true
      }
    }
  },
  build: {
    cssMinify: 'lightningcss'
  }
})
