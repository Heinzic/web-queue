import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        widget: 'src/main.tsx',
        webComponent: 'src/WebQueueComponent.tsx',
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  css: {
    // Ensure CSS is properly handled for all build targets
    modules: false, // Disable CSS modules by default
  },
  // Add resolve aliases for easier imports
  resolve: {
    alias: {
      '@': '/src',
      '@styles': '/src/styles',
      '@components': '/src/components',
    },
  },
});
