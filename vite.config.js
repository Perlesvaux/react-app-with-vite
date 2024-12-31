import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/react-app-with-vite/',
  server: {
    port: 5174 ,
  },
  preview: {
    port: 4174,
  },
  plugins: [react()],
})
