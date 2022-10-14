import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  server:{
    host: '0.0.0.0'
  },
  plugins: [svelte()],
});
