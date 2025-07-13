import { Node, Bond } from '../app/dynamix'

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
	mapElem: Map<string, Node | Bond>
	nodOpts: ReactiveValue<Map<string, NodeOptions>>
	bndOpts: ReactiveValue<Map<string, NodeOptions>>
	tabOpts: ReactiveValue<Map<string, NodeOptions>>
}

export type NodeType = 'row' | 'tabset' | 'tab'
export type NodeTypeWithBond = NodeType | 'bond'

export type TabsIds = Map<string, string>

export interface BaseNode {
	typNode: NodeTypeWithBond
	nodName: string
	uidNode: string
	nodPart: number
	nodeDir: boolean
	nodDims: Dimension
	nodOpen?: string | boolean
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
	set: (newValue: T, flag?: boolean) => void
	onChange: (listener: ChangeListener<T>) => () => void
	nextChange: () => Promise<T>
	onChangePromise: (listener: ChangeListener<T>) => () => void
	triggerChange: () => void
}
