import { JSX } from 'solid-js'

export const tabs: [string, JSX.Element][] = [
	[
		'Editor',
		<div
			style={{
				background: 'oklch(70.5% 0.213 47.604)',
				height: '100%',
			}}
		>
			Editor
		</div>,
	],
	[
		'Preview',
		<div
			style={{
				background: '#66bb6a',
				height: '100%',
			}}
		>
			Preview
		</div>,
	],
	[
		'Terminal',
		<div
			style={{
				background: '#ffc400',
				height: '100%',
			}}
		>
			Terminal
		</div>,
	],
	[
		'Sidebar',
		<div
			style={{
				background: '#42a5f5',
				height: '100%',
			}}
		>
			Sidebar
		</div>,
	],
	[
		'Footer',
		<div
			style={{
				background: '#ab47bc',
				height: '100%',
			}}
		>
			Footer
		</div>,
	],
]
