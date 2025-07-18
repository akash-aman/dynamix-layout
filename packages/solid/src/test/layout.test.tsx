import { render, screen } from '@solidjs/testing-library'
import { DynamixLayout } from '..'
import '@testing-library/jest-dom/vitest'
import { describe, it, expect } from 'vitest'
import { JSX, createSignal, onMount, Show } from 'solid-js'

describe('Solid Layout Component', () => {
	// The test case MUST be async to wait for the component to render.
	it('should render the root div', async () => {
		const mockTabs: [string, JSX.Element][] = [
			['tab1', <div>Tab 1 Content</div>],
			['tab2', <div>Tab 2 Content</div>],
			['tab3', <div>Tab 3 Content</div>],
			['tab4', <div>Tab 4 Content</div>],
			['tab5', <div>Tab 5 Content</div>],
			['tab6', <div>Tab 6 Content</div>],
		]

		/**
		 * This TestHarness component simulates the client-side mounting process,
		 * which is necessary for testing a component wrapped in `clientOnly`.
		 */
		const TestHarness = () => {
			const [isClient, setIsClient] = createSignal(false)

			onMount(() => {
				setIsClient(true)
			})

			// The <Show> component will only render its children when `isClient()` becomes true.
			return (
				<Show when={isClient()}>
					<DynamixLayout tabs={mockTabs} rootId="test-root" />
				</Show>
			)
		}

		render(() => <TestHarness />)

		// Use the ASYNCHRONOUS `findByTestId`. This is the key part.
		// It will wait until the component appears, regardless of whether it rendered
		// synchronously or after the onMount hook.
		const layoutElement = await screen.findByTestId('test-root')

		// Once `await` completes, the element has been found. Now we can assert it exists.
		expect(layoutElement).toBeInTheDocument()
	})
})
