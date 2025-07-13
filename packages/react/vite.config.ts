///<reference types="vitest" />
import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { visualizer } from 'rollup-plugin-visualizer'
import stripComments from 'vite-plugin-strip-comments'

export default defineConfig({
	server: {
		port: 5174,
		open: false,
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test/setup.ts',
	},
	build: {
		sourcemap: 'hidden',
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'dynamix.layout.react',
			fileName: (format) => `index.${format}.js`,
			formats: ['cjs', 'es', 'iife', 'umd'],
		},
		cssCodeSplit: true,
		rollupOptions: {
			external: ['react', 'react-dom', '@dynamix-layout/core'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'@dynamix-layout/core': 'DynamixLayoutCore',
				},
				preserveModules: false,
			},
		},
	},
	plugins: [
		dts({
			outDir: 'dist/types',
			exclude: ['node_modules/**', 'src/test/**'],
			staticImport: true,
		}),
		libInjectCss(),
		visualizer({
			filename: 'react.html',
			gzipSize: true,
			brotliSize: true,
			template: 'treemap',
		}),
		stripComments({ type: 'none' }),
	],
	resolve: {
		preserveSymlinks: true,
	},
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
	},
})
