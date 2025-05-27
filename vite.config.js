import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';



export default defineConfig({
  base: '/WorldWise_app/',
   build: {
    outDir: 'docs', // 👈 This tells Vite to output to /docs instead of /dist
  },
  plugins: [react(), eslint()],
});