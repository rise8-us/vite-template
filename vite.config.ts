/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1'
  },
  test: {
    environment: 'jsdom', // Simulates a browser environment for testing React components
    coverage: {
      include: ['**/*.ts', '**/*.tsx'],
      exclude: ['**/main.tsx', '**/*.d.ts', '**/*.test.*', '**/*.config.*'],
      reporter: ['text', 'json', 'html'], // Specifies the format for the coverage report
    },
  },
})
