import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: process.platform === 'win32',
      interval: 250,
      ignored: ['**/docs/**', '**/products-source.json'],
    },
  },
  test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'], css: false },
  build: { chunkSizeWarningLimit: 550 },
})
