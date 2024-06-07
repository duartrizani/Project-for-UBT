import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
    registerType: 'autoUpdate' ,
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
      "name": "DP Partners",
      "short_name": "DPP",
      "start_url": "/",
      "display": "fullscreen",
      "background_color": "#ffffff",
      "lang": "en",
      "scope": "/",
      "description": "My Awesome App description",
      "theme_color": "#ffffff",
      "icons": [
        {
          "src": "/pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "/pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "/pwa-maskable-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "/pwa-maskable-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
      "id": "dppartners",
      "dir": "ltr",
      "orientation": "portrait"
    }
    
  }),
  ],

})

