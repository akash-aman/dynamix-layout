import type { ReactNode } from 'react'
import type { LayoutTree, Dimension } from '@dynamix-layout/core'

export interface DynamixLayoutProps {
	children?: ReactNode
	layoutTree?: LayoutTree
	tabs?: string[]
	className?: string
	style?: React.CSSProperties
}

export interface UseDynamixLayoutOptions {
	initialLayoutTree?: LayoutTree
	tabs?: string[]
}

export interface UseDynamixLayoutResult {
	layoutTree: LayoutTree | undefined
	tabs: string[]
	setTabs: (tabs: string[]) => void
	setLayoutTree: (layoutTree: LayoutTree) => void
}

export type DivFC = React.ForwardRefExoticComponent<
	React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>

export type TabEntry = {
	uqid: string
	name: string
	node: React.ReactNode
}

export type TabInput = [string, React.ReactNode][]
export type TabOutput = {
	keys: string[]
	maps: Map<string, TabEntry>
	name: Map<string, string>
}

export interface LayoutProps {
	tabs: [string, ReactNode][]
	enableTabbar?: boolean
	WrapTabPanel?: DivFC
	WrapTabLabel?: React.ForwardRefExoticComponent<
		React.HTMLAttributes<HTMLDivElement> &
			React.RefAttributes<HTMLDivElement> & { active?: boolean }
	>
	WrapTabHead?: DivFC
	WrapTabBody?: DivFC
	HoverElement?: DivFC
	SliderElement?: React.ForwardRefExoticComponent<
		React.HTMLAttributes<HTMLDivElement> &
			React.RefAttributes<HTMLDivElement> & { direction?: boolean }
	>
	tabHeadHeight?: number
	layoutTree?: LayoutTree
	pad?: {
		t: number
		b: number
		l: number
		r: number
	}
	className?: string
	style?: React.CSSProperties
	bondWidth?: number
	minTabHeight?: number
	minTabWidth?: number
	sliderUpdateTimeout?: number
	windowResizeTimeout?: number
	disableSliderTimeout?: boolean
	disableResizeTimeout?: boolean
	hoverElementStyles?: React.CSSProperties
	sliderElementStyles?: React.CSSProperties
	tabPanelElementStyles?: React.CSSProperties
	tabBodyElementStyles?: React.CSSProperties
	tabHeadElementStyles?: React.CSSProperties
	tabLabelElementStyles?: React.CSSProperties
	RootSplitterHoverElStyles?: React.CSSProperties
	hoverElementClass?: string
	sliderElementClass?: string
	tabPanelElementClass?: string
	tabBodyElementClass?: string
	tabHeadElementClass?: string
	tabLabelElementClass?: string
	RootSplitterHoverElClass?: string
	rootId?: string
	tabNames?: Map<string, string | ReactNode>
}

export interface useDynamixLayoutOptions {
	tabOutput: TabOutput
	rootId?: string
	layoutTree?: LayoutTree
	enableTabbar: boolean
	dimensions: () => Dimension
	sliderUpdateTimeout: number
	windowResizeTimeout: number
	disableSliderTimeout: boolean
	disableResizeTimeout: boolean
	hoverElementStyles?: React.CSSProperties
	bondWidth: number
	minTabHeight: number
	minTabWidth: number
	tabHeadHeight: number
}
