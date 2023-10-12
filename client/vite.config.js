import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': {
           target: 'http://localhost:3001',
           changeOrigin: true,
           secure: false,      
           ws: true,
       }
  },
    watch:{
      usePolling:true
    }
  },
  plugins: [react(),],
})
