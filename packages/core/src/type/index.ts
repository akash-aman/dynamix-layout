import { Node, Bond } from '../app/dynamix'
import { Queue } from '../app/queue'

export type Dimension = {
	w: number
	h: number
	x: number
	y: number
}

export interface NodeCache {
	dimMins: Map<string, { minWidth: number; minHeight: number }>
	mapDirs: Map<string, boolean>
	tabCnts: Map<string, { horizontal: number; vertical: number }>
	mapNode: Map<string, Node>
	tabsets: Map<string, Node>
	mapTabs: Map<string, Node>
	mapBond: Map<string, Bond>
	mapKids: Map<string, Queue<Node>>
	nodOpts: ReactiveValue<Map<string, NodeOptions>>
	bndOpts: ReactiveValue<Map<string, NodeOptions>>
}

export type NodeType = 'row' | 'tabset' | 'tab'
export type NodeTypeWithBond = NodeType | 'bond'

export interface BaseNode {
	typNode: NodeTypeWithBond
	nodName: string
	uidNode: string
	nodPart: number
	nodeDir: boolean
	nodDims: Dimension
	nodOpen?: string
}

export type LayoutTree = Omit<BaseNode, 'nodeDir' | 'nodDims'> & {
	nodKids?: LayoutTree[]
}

export interface NodeOptions extends BaseNode {
	nodKids?: BaseNode[]
}

export interface RootAdjustment {
	adjustedW: number
	adjustedH: number
	wasAdjusted: boolean
}

export type ChangeListener<T> = (newValue: T) => void

export interface ReactiveValue<T> {
	get: () => T
	set: (newValue: T) => void
	onChange: (listener: ChangeListener<T>) => () => void
	nextChange: () => Promise<T>
	onChangePromise: (listener: ChangeListener<T>) => () => void
	triggerChange: () => void
}
