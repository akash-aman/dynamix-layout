import { defineProject } from 'vitest/config'

export default defineProject({
	test: {
		projects: [
			'./packages/*/vite.config.ts',
			'./packages/*/vitest.config.ts',
		],
	},
})
