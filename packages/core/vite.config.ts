import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    sourcemap: 'inline',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'dynamix.layout.core',
      fileName: (format) => `core.${format}.js`,
      formats: ['cjs', 'es', 'iife', 'umd'],
    },
  },
  plugins: [
    dts({
      outDir: 'dist/types',
      exclude: ['node_modules/**'],
    }),
  ],
});