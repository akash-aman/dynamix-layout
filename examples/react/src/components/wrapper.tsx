import { cn } from '@/lib/utils'
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react'

export const DefaultSliderElement = forwardRef<
	HTMLDivElement,
	{
		children?: ReactNode
		direction?: boolean
	} & HTMLAttributes<HTMLDivElement>
>(({ children, className, direction = false, ...props }, ref) => (
	<div
		ref={ref}
		{...props}
		className={cn(
			'absolute z-10 flex items-center justify-center bg-transparent',
			className
		)}
		style={{
			...props.style,
		}}
	>
		<div
			className={cn(
				'flex items-center gap-1',
				direction ? 'flex-col' : 'flex-row'
			)}
		>
			{!direction ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-grip-vertical size-2.5"
				>
					<circle cx="9" cy="12" r="1"></circle>
					<circle cx="9" cy="5" r="1"></circle>
					<circle cx="9" cy="19" r="1"></circle>
					<circle cx="15" cy="12" r="1"></circle>
					<circle cx="15" cy="5" r="1"></circle>
					<circle cx="15" cy="19" r="1"></circle>
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-grip-vertical size-2.5"
					style={{ transform: 'rotate(90deg)' }}
				>
					<circle cx="9" cy="12" r="1"></circle>
					<circle cx="9" cy="5" r="1"></circle>
					<circle cx="9" cy="19" r="1"></circle>
					<circle cx="15" cy="12" r="1"></circle>
					<circle cx="15" cy="5" r="1"></circle>
					<circle cx="15" cy="19" r="1"></circle>
				</svg>
			)}
		</div>
		{children}
	</div>
))

DefaultSliderElement.displayName = 'DefaultSliderElement'

export const DefaultWrapTabLabel = forwardRef<
	HTMLDivElement,
	{ children?: ReactNode; active?: boolean } & HTMLAttributes<HTMLDivElement>
>(({ children, active = false, ...props }, ref) => (
	<div
		ref={ref}
		{...props}
		data-state={active ? 'active' : 'inactive'}
		className={`DefaultWrapTabLabel data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 ${props.className || ''}`}
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
		className={`DefaultWrapTabBody border ${props.className || ''}`}
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
		className={`DefaultWrapTabHead py-1 bg-gray-200 rounded-t-sm rounded-b-none text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] ${props.className || ''}`}
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
