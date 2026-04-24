import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss(),

  ],
  server: {
    proxy: {
      // This tells Vite to catch any request starting with /opennms
      // '/opennms': {
      //   target: 'http://localhost:8980',
      //   changeOrigin: true,
      //   secure: false,
      // }
      '/api': {
  target: 'http://127.0.0.1:8000',
  changeOrigin: true,
}
    }
  }
})