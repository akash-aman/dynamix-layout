import {
	INode,
	IBond,
	TypeValue,
} from '../types';

export class Node implements INode<Node,Bond> {
	type: TypeValue;
	name: string | null;
	weight: number;

	parent: Node | null;
	children: Node[];
	
	dimension: [number,number];
	coordinate: [number,number];

	prev: Bond | null;
	next: Bond | null;
	constructor(
		type: TypeValue,

		weight: number,
		parent: Node | null
	) {
		this.type = type;
		this.name = null;
		this.parent = parent;
		this.weight = weight;
		
		this.children = [];
		this.dimension = [0,0];
		this.coordinate = [0,0];
		this.prev = null;
		this.next = null;
	}
}

export class Bond implements IBond<Node> {
	type: TypeValue;
	name: string | null;

	prev: Node;
	next: Node;

	dimension: [number,number];
	coordinate: [number,number];

	constructor(
		type: TypeValue,

		prev: Node,
		next: Node,
	) {
		this.type = type;
		this.prev = prev;
		this.next = next;
		this.name = `${prev.name}-${next.name}`;
		this.dimension = [0,0];
		this.coordinate = [0,0];

		prev.next = this;
		next.prev = this;
	}
}

