import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './eduml_build/',
    assetsDir: 'assets',  // This ensures assets are inside an 'assets' folder
    rollupOptions: {
      input: './index.html', // Usually it's 'src/index.html'
    },
  },
  base: './', // Serve assets relative to the HTML file
})
