import { JSX } from 'solid-js'

type DivProps = {
	children?: JSX.Element
	active?: boolean
} & JSX.HTMLAttributes<HTMLDivElement>

export const DefaultWrapTabLabel = (props: DivProps) => (
	<div
		{...props}
		class={`DefaultWrapTabLabel ${props.class || ''}`}
		data-state={props.active ? 'active' : 'inactive'}
		style={{
			'align-self': 'center',
			padding: '6px',
			'box-sizing': 'border-box',
			'border-radius': '4px',
			...(props.style as JSX.CSSProperties),
		}}
	>
		{props.children}
	</div>
)

export const DefaultWrapTabBody = (props: DivProps) => (
	<div
		{...props}
		class={`DefaultWrapTabBody hide-scrollbar ${props.class || ''}`}
		style={{
			'box-sizing': 'border-box',
			height: '100%',
			width: '100%',
			display: 'grid',
			overflow: 'auto',
			'scrollbar-width': 'none',
			'-ms-overflow-style': 'none',
			...(props.style as JSX.CSSProperties),
		}}
	>
		{props.children}
	</div>
)

export const DefaultWrapTabHead = (props: DivProps) => (
	<div
		{...props}
		class={`DefaultWrapTabHead hide-scrollbar ${props.class || ''}`}
		style={{
			display: 'grid',
			'grid-auto-flow': 'column',
			'justify-content': 'start',
			'align-items': 'center',
			gap: '6px',
			'padding-left': '8px',
			width: '100%',
			'box-sizing': 'border-box',
			height: '100%',
			'place-items': 'self-start',
			overflow: 'auto',
			'background-color': '#dfdfdf',
			'scrollbar-width': 'none',
			'-ms-overflow-style': 'none',
			...(props.style as JSX.CSSProperties),
		}}
	>
		{props.children}
	</div>
)

export const DefaultWrapTabPanel = (props: DivProps) => (
	<div
		{...props}
		class={`DefaultWrapTabPanel ${props.class || ''}`}
		style={{
			display: 'grid',
			'align-items': 'center',
			'place-items': 'self-start',
			'box-sizing': 'border-box',
			position: 'absolute',
			'border-radius': '8px',
			...(props.style as JSX.CSSProperties),
		}}
	>
		{props.children}
	</div>
)

export const DefaultHoverElement = (props: DivProps) => (
	// eslint-disable-next-line solid/reactivity
	<div
		{...props}
		class={`DefaultHoverElement ${props.class || ''}`}
		style={{
			display: 'flex',
			'justify-content': 'center',
			'align-items': 'center',
			opacity: 0.7,
			position: 'absolute',
			'box-sizing': 'border-box',
			'font-weight': 'bold',
			'pointer-events': 'none',
			'background-color': 'rgba(0, 175, 249, 0.5)',
			'border-radius': '10px',
			transition: 'all 0.2s ease',
			border: '2px dashed rgb(0, 196, 42)',
			...(props.style as JSX.CSSProperties),
		}}
	>
		{props.children}
	</div>
)

export const DefaultSliderElement = (
	props: {
		direction?: boolean
	} & DivProps
) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, solid/reactivity
	const { direction, ...rest } = props
	return (
		<div
			{...rest}
			class={`DefaultSliderElement ${props.class || ''}`}
			style={{
				width: '100%',
				height: '100%',
				position: 'absolute',
				'box-sizing': 'border-box',
				'background-color': 'white',
				'z-index': 9,
				cursor: 'grab',
				...(props.style as JSX.CSSProperties),
			}}
		>
			{props.children}
		</div>
	)
}

export const RootSplitterHoverEl = (
	props: {
		area: 'left' | 'right' | 'top' | 'bottom'
		size?: { w: string; h: string }
		gap?: string
	} & DivProps
) => {
	const { area, size = { h: '20%', w: '6px' }, gap = '0px', ...rest } = props

	const style: JSX.CSSProperties = { ...(rest.style as JSX.CSSProperties) }

	if (area === 'left') {
		Object.assign(style, {
			'border-top-right-radius': '16px',
			'border-bottom-right-radius': '16px',
			height: size.h,
			left: gap,
			width: size.w,
		})
		style.top = `calc(50% - ${style.height} / 2)`
	} else if (area === 'top') {
		Object.assign(style, {
			'border-bottom-left-radius': '16px',
			'border-bottom-right-radius': '16px',
			width: size.h,
			top: gap,
			height: size.w,
		})
		style.left = `calc(50% - ${style.width} / 2)`
	} else if (area === 'right') {
		Object.assign(style, {
			'border-top-left-radius': '16px',
			'border-bottom-left-radius': '16px',
			height: size.h,
			right: gap,
			width: size.w,
		})
		style.top = `calc(50% - ${style.height} / 2)`
	} else if (area === 'bottom') {
		Object.assign(style, {
			'border-top-left-radius': '16px',
			'border-top-right-radius': '16px',
			width: size.h,
			bottom: gap,
			height: size.w,
		})
		style.left = `calc(50% - ${style.width} / 2)`
	}

	return (
		<div
			{...rest}
			class={`RootSplitterHoverEl ${props.class || ''}`}
			style={{
				position: 'absolute',
				'z-index': -1,
				display: 'none',
				'box-sizing': 'border-box',
				'background-color': '#0081f9',
				cursor: 'grab',
				...style,
			}}
		>
			{props.children}
		</div>
	)
}
