/**
 * @file Element.ts
 * @description Interface to create concrete class.
 */

/**
 * @interface INode
 * @description Interface for Node.
 * @property {Type} type			: Type of Node (Row, Column, Tabset, Tab).
 * @property {number} weight		: Weight of Node.
 * @property {[number,number]} dimension	: Dimension of Node.
 * @property {[number,number]} coordinate	: Coordinate of Node.
 * @property {Node | null} parent	: Parent Node ( Node | null ).
 * @property {Node[]} children		: Children Node ( Node[] ).
 * @property {Bond | null} prev		: Previous Bond ( Bond | null ).
 * @property {Bond | null} next	 	: Next Bond ( Bond | null ).
 * 
 */
export interface INode<T, K> {
	type: TypeValue;
	weight: number;
	dimension: [number, number];
	coordinate: [number, number];
	parent: T | null;
	children: T[];
	prev: K | null;
	next: K | null;
}

/**
 * @interface IBond
 * @description Interface for Bond.
 * @property {Type} type 	: Type of Bond (Row, Column, Tabset, Tab).
 * @property {Node} prev    : Previous Node ( Node | null ).
 * @property {Node} next	: Next Node ( Node | null ).
 * @property {[number,number]} dimension 	: Dimension of Bond.
 * @property {[number,number]} coordinate	: Coordinate of Bond.
 * 
 */
export interface IBond<T> {
	type: TypeValue;
	prev: T;
	next: T;
	dimension: [number, number];
	coordinate: [number, number];
}

/**
 * @interface ILayout
 * @description Interface for Layout.
 * @property {Node} root	: Root Node.
 * @property {Node[]} tabs	: Tabs Node.
 * @property {Bond[]} bond	: Bond between two components.
 * 
 */
export interface ILayout<T, K> {
	_root: T;
	_tabs: T[];
	_bond: K[];

}

/**
 * @enum Type
 * @description Enum for Type.
 * @property {Row} Row			: Row Type.
 * @property {Column} Column	: Column Type.
 * @property {Tabset} Tabset	: Tabset Type.
 * @property {Tab} Tab			: Tab Type.
 */
export const Type = {
	Row: 0,
	Column: 1,
	Tabset: 2,
	Tab: 3
}



/**
 * @enum TypeValue : Value of Type.
 */
export type TypeValue = number;

/**
 * @enum Area
 * @description Enum for Area.
 * @property {Left} Left		: Left Area.
 * @property {Right} Right		: Right Area.
 * @property {Top} Top			: Top Area.
 * @property {Bottom} Bottom	: Bottom Area.
 * @property {Cover} Cover		: Cover Area.
 */
export const Area = {
	Left: "left" as Left,
	Right: "right" as Right,
	Top: "top" as Top,
	Bottom: "bottom" as Bottom,
	Cover: "cover" as Cover
}

export type Left = "left";
export type Right = "right";
export type Top = "top";
export type Bottom = "bottom";
export type Cover = "cover";

export type AreaValue = typeof Area[keyof typeof Area];

export type LayoutTree = {
	type: TypeValue;
	weight: number;
	children: LayoutTree[];
	name: string;
}

