import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'

export const DefaultWrapTabLabel = forwardRef<
	HTMLDivElement,
	{ children?: ReactNode } & HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
	<div
		ref={ref}
		{...props}
		className={`DefaultWrapTabLabel ${props.className || ''}`}
		style={{
			alignSelf: 'center',
			padding: '6px',
			boxSizing: 'border-box',
			borderRadius: '4px',
			...props.style,
		}}
	>
		{children}
	</div>
))
DefaultWrapTabLabel.displayName = 'DefaultWrapTabLabel'

export const DefaultWrapTabBody = forwardRef<
	HTMLDivElement,
	{ children?: ReactNode } & HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
	<div
		ref={ref}
		{...props}
		className={`DefaultWrapTabBody ${props.className || ''}`}
		style={{
			boxSizing: 'border-box',
			height: '100%',
			width: '100%',
			display: 'grid',
			overflow: 'auto',
			...props.style,
		}}
	>
		{children}
	</div>
))
DefaultWrapTabBody.displayName = 'DefaultWrapTabBody'

export const DefaultWrapTabHead = forwardRef<
	HTMLDivElement,
	{ children?: ReactNode } & HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
	<div
		ref={ref}
		{...props}
		className={`DefaultWrapTabHead ${props.className || ''}`}
		style={{
			display: 'grid',
			gridAutoFlow: 'column',
			justifyContent: 'start',
			alignItems: 'center',
			gap: '6px',
			paddingLeft: '8px',
			width: '100%',
			boxSizing: 'border-box',
			height: '100%',
			overflowX: 'auto',
			placeItems: 'self-start',
			overflow: 'auto',
			...props.style,
		}}
	>
		{children}
	</div>
))
DefaultWrapTabHead.displayName = 'DefaultWrapTabHead'

export const DefaultWrapTabPanel = forwardRef<
	HTMLDivElement,
	{ children?: ReactNode } & HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
	<div
		ref={ref}
		className={`DefaultWrapTabPanel ${props.className || ''}`}
		{...props}
		style={{
			display: 'grid',
			alignItems: 'center',
			placeItems: 'self-start',
			boxSizing: 'border-box',
			position: 'absolute',
			borderRadius: '8px',
			...props.style,
		}}
	>
		{children}
	</div>
))
DefaultWrapTabPanel.displayName = 'DefaultWrapTabPanel'

export const DefaultHoverElement = forwardRef<
	HTMLDivElement,
	{ children?: ReactNode } & HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
	<div
		ref={ref}
		className={`DefaultHoverElement ${props.className || ''}`}
		{...props}
		style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			opacity: 0.7,
			position: 'absolute',
			boxSizing: 'border-box',
			fontWeight: 'bold',
			pointerEvents: 'none',
			backgroundColor: 'rgba(0, 175, 249, 0.5)',
			borderRadius: '10px',
			transition: 'all 0.2s ease',
			border: '2px dashed rgb(0, 196, 42)',
			...props.style,
		}}
	>
		{children}
	</div>
))
DefaultHoverElement.displayName = 'DefaultHoverElement'

export const DefaultSliderElement = forwardRef<
	HTMLDivElement,
	{
		children?: ReactNode
		direction?: boolean
	} & HTMLAttributes<HTMLDivElement>
>(({ children, direction = false, ...props }, ref) => ( // eslint-disable-line @typescript-eslint/no-unused-vars
	<div
		ref={ref}
		{...props}
		className={`DefaultSliderElement ${props.className || ''}`}
		style={{
			width: '100%',
			height: '100%',
			position: 'absolute',
			boxSizing: 'border-box',
			backgroundColor: 'white',
			zIndex: 9,
			cursor: 'grab',
			...props.style,
		}}
	>
		{children}
	</div>
))
DefaultSliderElement.displayName = 'DefaultSliderElement'

export const RootSplitterHoverEl = forwardRef<
	HTMLDivElement,
	{
		children?: ReactNode
		area: 'left' | 'right' | 'top' | 'bottom'
		size?: { w: string; h: string }
		gap?: string
	} & HTMLAttributes<HTMLDivElement>
>(
	(
		{
			children,
			area,
			size = { h: '20%', w: '6px' },
			gap = '0px',
			...props
		},
		ref
	) => {
		props.style = { ...props.style }

		if (area === 'left') {
			props.style = {
				borderTopRightRadius: '16px',
				borderBottomRightRadius: '16px',
				height: size.h,
				left: gap,
				width: size.w,
				...props.style,
			}
			props.style.top = `calc(50% - ${props.style.height} / 2)`
		} else if (area === 'top') {
			props.style = {
				borderBottomLeftRadius: '16px',
				borderBottomRightRadius: '16px',
				width: size.h,
				top: gap,
				height: size.w,
				...props.style,
			}
			props.style.left = `calc(50% - ${props.style.width} / 2)`
		} else if (area === 'right') {
			props.style = {
				borderTopLeftRadius: '16px',
				borderBottomLeftRadius: '16px',
				height: size.h,
				right: gap,
				width: size.w,
				...props.style,
			}
			props.style.top = `calc(50% - ${props.style.height} / 2)`
		} else if (area === 'bottom') {
			props.style = {
				borderTopLeftRadius: '16px',
				borderTopRightRadius: '16px',
				width: size.h,
				bottom: gap,
				height: size.w,
				...props.style,
			}
			props.style.left = `calc(50% - ${props.style.width} / 2)`
		}

		return (
			<div
				ref={ref}
				{...props}
				className={`RootSplitterHoverEl ${props.className || ''}`}
				style={{
					position: 'absolute',
					zIndex: -1,
					display: 'none',
					boxSizing: 'border-box',
					backgroundColor: '#0081f9',
					cursor: 'grab',
					...props.style,
				}}
			>
				{children}
			</div>
		)
	}
)
RootSplitterHoverEl.displayName = 'RootSplitterHoverEl'
