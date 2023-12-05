import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

const env = dotenv.config().parsed;


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  env: env,
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
  },
})



