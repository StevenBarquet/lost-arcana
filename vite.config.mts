import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa' // Correcto

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // @vitejs/plugin-react v6 transpila con oxc (Vite 8/Rolldown), NO con Babel.
    react(),
    VitePWA({
      // 1. 'autoUpdate' hace que la app se actualice sola cuando subas cambios
      registerType: 'autoUpdate',

      // 2. Configuración del Service Worker (Workbox)
      workbox: {
        // Le decimos que busque y guarde en caché TODO lo que esté en dist (JS, CSS, HTML e imágenes)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
      },

      // 3. El manifiesto web (obligatorio para que sea PWA instalable)
      manifest: {
        name: 'Lost Arcana',
        short_name: 'LostArcana',
        description: 'Memoriza  y aprende conceptos de Tarot',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192.png', // No incluyas la palabra "public", se busca desde la raíz del despliegue
            sizes: '192x192',
            type: 'image/png', // Cambiar a 'image/svg+xml' si decides usar el archivo .svg puro
            purpose: 'any',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable', // Permite que Android recorte tu icono de forma segura en círculos o cuadrados
          },
        ],
      },
    }),
    // React Compiler (v1.0): memoiza automáticamente componentes y hooks en build,
    // estabilizando funciones/objetos → useCallback/useMemo manuales dejan de ser
    // necesarios. Hoy solo existe como plugin de Babel, así que corre en una pasada
    // de Babel encima de oxc (patrón oficial de plugin-react v6). El linter que lo
    // acompaña ya vive en eslint-plugin-react-hooks v7 (ver eslint.config.mjs).
    babel({ presets: [reactCompilerPreset()] }),
  ],

  resolve: {
    // Vite resuelve los `paths` del tsconfig de forma nativa (antes vite-tsconfig-paths).
    tsconfigPaths: true,
  },
  css: {
    modules: {
      // Mantiene los nombres de clase tal cual (sin hash). Ver claude.md > className Usage.
      generateScopedName: (name) => name,
    },
    preprocessorOptions: {
      scss: {
        // Permite `@use 'variables'` sin rutas absolutas desde cualquier .scss.
        loadPaths: [path.resolve(__dirname, 'src/styles')],
        // Silencia los deprecation warnings que provienen de dependencias (node_modules),
        // p. ej. sweetalert2-custom-theme, cuyo código no controlamos.
        quietDeps: true,
      },
    },
  },
})
