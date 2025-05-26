import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// Detect if we're in GitHub Pages production
const isGitHubPages = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isGitHubPages ? '/WorldWise_app/' : '/',
   build: {
    outDir: 'docs', // 👈 This tells Vite to output to /docs instead of /dist
  },
  plugins: [react(), eslint()],
});