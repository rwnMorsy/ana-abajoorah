import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// أي طلب يبدأ بـ /api بيتحول للباك اند وقت التطوير
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { '/api': 'http://localhost:4000' },
  },
})
