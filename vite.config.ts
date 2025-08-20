import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const iconsPath = path.resolve(__dirname, 'public/img/icons/icons.json')
const icons = JSON.parse(fs.readFileSync(iconsPath, 'utf-8')).icons

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // Custom build output directory
    emptyOutDir: true, // Empty the output directory before building
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        id: 'infusee',
        name: 'Infusee',
        short_name: 'Infusee',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#121212',
        theme_color: '#121212',
        icons,
      },
      injectManifest: {
        swSrc: 'src/sw.js',
      },
      workbox: {
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [
          /^\/rest\/v1\//, // Supabase API
          /\/assets\//, // Vite build assets
          /\/icons\//, // PWA icons
          /\/favicon\.svg$/, // favicon
          /\.json$/, // JSON files
          /\.ico$/, // favicons
          /\.png$/, // PNG images
          /\.jpg$/, // JPG images
          /\.svg$/, // SVG files
        ],
      },
      devOptions: {
        enabled: process.env.NODE_ENV === 'development',
      },
    }),
    vuetify(),
  ],
})
