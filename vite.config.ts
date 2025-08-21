import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      tailwindcss(),
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true, // Enable PWA in development mode for testing
        },
        workbox: {
          // Cache static files (JS, CSS, HTML)
          globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],
          // Cache API responses
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.pathname.startsWith('/api/'), // Cache all /api/* endpoints
              handler: 'NetworkFirst', // Try network first, fallback to cache
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
                },
              },
            },
          ],
        },
        manifest: {
          name: 'Lampung Go',
          short_name: 'L-Go',
          description: 'Aplikasi wisata Lampung Go untuk menjelajahi destinasi terbaik',
          theme_color: '#1E40AF', // Tailwind blue-600 from MapsPage.tsx
          background_color: '#FFFFFF',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: '/icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    define: {
      'import.meta.env.REACT_APP_API_BASE_URL': JSON.stringify(
        env.REACT_APP_API_BASE_URL || 'https://admin.lampunggo.my.id'
      ),
    },
  };
});