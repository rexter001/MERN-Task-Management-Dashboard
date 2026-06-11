// vite.config.js - Vite build tool configuration
// The proxy setting lets /api/* requests in dev hit the Express server
// without CORS issues — in production, use the full backend URL in .env

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
