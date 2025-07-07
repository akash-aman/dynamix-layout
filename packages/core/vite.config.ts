import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import fs from 'fs'

const license = fs.readFileSync(resolve(__dirname, '../../LICENSE'), 'utf-8')

export default defineConfig({
	define: {
		__LICENSE__: JSON.stringify(license),
	},
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
})
