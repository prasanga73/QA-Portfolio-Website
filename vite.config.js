import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  },
  // Fixed IPv4 address so the Selenium suite (and Java's HTTP client) can always reach it.
  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true
  }
});
