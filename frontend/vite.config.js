import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    // ── PLUGINS ──────────────────────────────────────────────────
    // react() enables JSX transformation and React Fast Refresh
    // during development (hot module replacement)
    plugins: [react()],

    // ── BASE PATH ────────────────────────────────────────────────
    // Development (localhost): '/' for normal routing
    // Production (GitHub Pages): '/ChillieHaven/' because the app
    // lives under a subdirectory path, not the domain root
    base: command === 'build' ? '/ChillieHaven/' : '/',

    // ── BUILD ────────────────────────────────────────────────────
    build: {
      // All production files compiled into the dist folder
      // gh-pages pushes this folder to the gh-pages branch
      outDir: 'dist',

      // Source maps only in development for easier debugging
      // Disabled in production to keep bundle size small
      sourcemap: command !== 'build',

      // Terser produces smaller bundles than Vite's default minifier
      // Requires: npm install terser --save-dev
      minify: 'terser',
      terserOptions: {
        compress: {
          // Remove all console.log() calls from production build
          // Keeps browser console clean for end users
          drop_console: command === 'build',
        },
      },

      // ── CODE SPLITTING ────────────────────────────────────────
      // Split vendor libraries into separate cached chunks.
      // When your app code changes, browsers only re-download
      // your code — not the vendor chunks.
      rollupOptions: {
        output: {
          manualChunks: {
            // React core — changes rarely, cache aggressively
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],

            // Icon library — large, better isolated
            'icons': ['react-icons'],

            // UI and charting libraries
            'ui': ['react-helmet-async', 'recharts'],
          },
        },
      },

      // Suppress warnings for chunks under 1000kb
      // Raised from default 500kb because recharts and react-icons
      // are intentionally large but already isolated in their own chunks
      chunkSizeWarningLimit: 1000,
    },

    // ── DEV SERVER ───────────────────────────────────────────────
    // Config for `npm run dev` local development server
    server: {
      port: 5173,

      // false = find next available port if 5173 is busy
      strictPort: false,

      // Allow cross-origin requests so frontend (5173)
      // can call backend API (5000) without CORS errors
      cors: true,
    },

    // ── PREVIEW SERVER ───────────────────────────────────────────
    // Config for `npm run preview` — tests the production
    // dist build locally before pushing to GitHub Pages
    preview: {
      port: 5173,
      strictPort: false,
    },
  }
})