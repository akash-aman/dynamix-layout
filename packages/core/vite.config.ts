import { defineConfig } from 'vite';
import path from 'path'
import typescript from '@rollup/plugin-typescript';
//const resolvePath = (str: string) => path.resolve(__dirname, str)

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'layout',
	  formats: ['cjs', 'es', 'iife','umd'],
    },
    rollupOptions: {
      // Customize rollup options as needed.
	  plugins: [
		typescript({
			target: 'es2020',
			rootDir: path.resolve('./src'), // Use 'path.resolve' to define the rootDir.
			declaration: true,
			declarationDir: path.resolve('./dist/types'), // Use 'path.resolve' for declarationDir.
			exclude: /node_modules/,
			allowSyntheticDefaultImports: true,
		  }),
	  ]
    },
  },
});