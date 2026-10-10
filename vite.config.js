import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/NAGU-Dental-Advance-Multi-Speciality-Clinic/',
  server: {
    port: 3000,
    open: true
  }
});
