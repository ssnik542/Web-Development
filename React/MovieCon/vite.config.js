import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTest.js',
    coverage: {
      reporter: ['text', 'html']
    }
  },

})
