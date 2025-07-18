export const tabs: [string, React.ReactNode][] = [
	[
		'editor',
		<div
			key="editor"
			style={{
				background: '#c0ca33',
				height: '100%',
			}}
		>
			Editor
		</div>,
	],
	[
		'preview',
		<div
			key="preview"
			style={{
				background: '#66bb6a',
				height: '100%',
			}}
		>
			Preview
		</div>,
	],
	[
		'terminal',
		<div
			key="terminal"
			style={{
				background: '#ffc400',
				height: '100%',
			}}
		>
			Terminal
		</div>,
	],
]
