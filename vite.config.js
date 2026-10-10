import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/NAGU-Dental-Advance-Multi-Speciality-Clinic/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
