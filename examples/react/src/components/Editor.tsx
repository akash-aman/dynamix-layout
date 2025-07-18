import Monaco from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import React, { useRef, useEffect } from 'react'

interface EditorProps {
	value?: string
	setValue?: (value: string) => void
	defaultValue?: string
	language?: string
}

function Editor({
	value,
	setValue,
	defaultValue = '// some comment',
	language = 'javascript',
}: EditorProps) {
	const monacoRef = useRef<editor.IStandaloneCodeEditor | null>(null)

	function handleEditorWillMount(monaco: typeof import('monaco-editor')) {
		monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
	}

	function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
		monacoRef.current = editor
	}

	function handleEditorChange(
		newValue: string | undefined,
		_: editor.IModelContentChangedEvent // eslint-disable-line @typescript-eslint/no-unused-vars
	) {
		if (setValue && newValue !== undefined) {
			setValue(newValue)
		}
	}

	useEffect(() => {
		return () => {
			if (monacoRef.current) {
				monacoRef.current.dispose()
				monacoRef.current = null
			}
		}
	}, [])

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				borderRadius: 0,
				outline: 'none',
			}}
			tabIndex={-1}
		>
			<Monaco
				language={language}
				defaultLanguage={language}
				value={value}
				defaultValue={defaultValue}
				beforeMount={handleEditorWillMount}
				onMount={handleEditorDidMount}
				onChange={handleEditorChange}
				//theme="vs-dark"
				options={{
					minimap: { enabled: false },
					automaticLayout: true,
					scrollbar: {
						vertical: 'auto',
						horizontal: 'auto',
						handleMouseWheel: true,
					},

					overviewRulerLanes: 0,
				}}
				width="100%"
				height="100%"
			/>
		</div>
	)
}

export default React.memo(Editor)
