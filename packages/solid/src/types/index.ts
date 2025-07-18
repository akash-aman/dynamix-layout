import type { LayoutTree, Dimension } from '@dynamix-layout/core'
import { JSX } from 'solid-js'

export interface DynamixLayoutProps {
	children?: JSX.Element
	layoutTree?: LayoutTree
	tabs?: string[]
	class?: string
	style?: JSX.CSSProperties
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

export type DivFC = (
	props: { children?: JSX.Element } & JSX.HTMLAttributes<HTMLDivElement>
) => JSX.Element

export type TabEntry = {
	uqid: string
	name: string
	node: JSX.Element
}

export type TabInput = [string, JSX.Element][]
export type TabOutput = {
	keys: string[]
	maps: Map<string, TabEntry>
	name: Map<string, string>
}

export interface LayoutProps {
	tabs: [string, JSX.Element][]
	enableTabbar?: boolean
	WrapTabPanel?: DivFC
	WrapTabLabel?: (
		props: {
			children?: JSX.Element
			active?: boolean
		} & JSX.HTMLAttributes<HTMLDivElement>
	) => JSX.Element
	WrapTabHead?: DivFC
	WrapTabBody?: DivFC
	HoverElement?: DivFC
	SliderElement?: (
		props: {
			children?: JSX.Element
			direction?: boolean
		} & JSX.HTMLAttributes<HTMLDivElement>
	) => JSX.Element
	tabHeadHeight?: number
	layoutTree?: LayoutTree
	pad?: {
		t: number
		b: number
		l: number
		r: number
	}
	class?: string
	style?: JSX.CSSProperties
	bondWidth?: number
	minTabHeight?: number
	minTabWidth?: number
	sliderUpdateTimeout?: number
	windowResizeTimeout?: number
	disableSliderTimeout?: boolean
	disableResizeTimeout?: boolean
	hoverElementStyles?: JSX.CSSProperties
	sliderElementStyles?: JSX.CSSProperties
	tabPanelElementStyles?: JSX.CSSProperties
	tabBodyElementStyles?: JSX.CSSProperties
	tabHeadElementStyles?: JSX.CSSProperties
	tabLabelElementStyles?: JSX.CSSProperties
	RootSplitterHoverElStyles?: JSX.CSSProperties
	hoverElementClass?: string
	sliderElementClass?: string
	tabPanelElementClass?: string
	tabBodyElementClass?: string
	tabHeadElementClass?: string
	tabLabelElementClass?: string
	RootSplitterHoverElClass?: string
	rootId?: string
	tabNames?: Map<string, string | JSX.Element>
}

export interface useDynamixLayoutOptions {
	tabOutput: TabOutput
	rootId: string
	layoutTree?: LayoutTree
	enableTabbar: boolean
	dimensions: () => Dimension
	sliderUpdateTimeout: number
	windowResizeTimeout: number
	disableSliderTimeout: boolean
	disableResizeTimeout: boolean
	hoverElementStyles?: JSX.CSSProperties
	bondWidth: number
	minTabHeight: number
	minTabWidth: number
	tabHeadHeight: number
}
