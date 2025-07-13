// src/test/layout.test.ts
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest' // Ensure you have this import
import { DynamixLayout } from '../'
import * as React from 'react'

describe('React Layout Component', () => {
	it('should render the root div', () => {
		const mockTabs: [string, React.ReactNode][] = [
			['tab1', React.createElement('div', null, 'Tab 1 Content')],
			['tab2', React.createElement('div', null, 'Tab 2 Content')],
			['tab3', React.createElement('div', null, 'Tab 3 Content')],
			['tab4', React.createElement('div', null, 'Tab 4 Content')],
			['tab5', React.createElement('div', null, 'Tab 5 Content')],
			['tab6', React.createElement('div', null, 'Tab 6 Content')],
			['tab7', React.createElement('div', null, 'Tab 7 Content')],
		]

		render(
			React.createElement(DynamixLayout, {
				tabs: mockTabs,
				rootId: 'test-root',
			})
		)

		const layoutElement = screen.getByTestId('test-root')
		expect(layoutElement).toBeInTheDocument()
	})
})
