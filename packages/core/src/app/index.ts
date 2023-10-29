import { ILayout, Type, LayoutTree, AreaValue } from "../types";
import { Node, Bond, Helper } from "../lib";


export type LayoutOptions = {
	layout?: LayoutTree,
	range?: number,
	dimension?: [number, number],
	tabs?: string[],
}

export type Settings = {
	layout: LayoutTree,
	range: number,
	dimension: [number, number],
	coordinate: [number, number],
	tabs: string[],
}

export default class Layout implements ILayout<Node, Bond> {
	_root: Node;
	_tabs: Node[];
	_bond: Bond[];
	_settings: Settings;
	constructor(
		options: LayoutOptions = {}
	) {

		let setting = Object.assign({
			layout: null,
			range: 1,
			dimension: [0, 0],
			coordinate: [0, 0],
			tabs: Array.from({ length: options.range ?? 1 }, (_, i) => `tab-${i + 1}`),
		}, options);

		this._tabs = [];
		this._bond = [];
		this._settings = setting;
		this._root = new Node(Type.Row, 100, null);

		this._root.coordinate = this._settings.coordinate;
		this._root.dimension = this._settings.dimension;
		this.createTree();
	}

	public shiftTree = (srcId: string, desId: string, area: AreaValue) => {

		let des: any;
		let src: any;

		this._tabs.forEach((tab: Node) => {
			if (tab.name == desId) des = tab;
			if (tab.name == srcId) src = tab;
			tab.children.forEach((child: Node) => {
				if (child.name == desId) des = child;
				if (child.name == srcId) src = child;
			});
		});

		if (src === undefined || src === null) return;
		if (des === undefined || des === null) return;

		if (src.parent === null) return;

		const length = src.parent.children.length;

		if (des.type == Type.Tabset && src.type == Type.Tab) {
			Helper.detach(src, length > 1);
			Helper.attach(des, src, area);

		} else if (des.type == Type.Tabset && src.type == Type.Tabset) {
			Helper.detach(src, length > 2);
			Helper.attach(des, src, area);
		}

		return this.calculate(this._root, 0);
	}

	private createTree = () => {
		const { layout } = this._settings;

		if (!layout) {
			Helper.createBinaryTree(this._root, this._settings);
			console.log("create tree",JSON.stringify(this.jsonify()));
			
			return this.updateTree();
		}

		const queue: LayoutTree[] = [layout];
		const _queue: Node[] = [this._root];

		const levels: LayoutTree[][] = [];
		let toggle = 1;

		while (queue.length) {
			const level: LayoutTree[] = [];
			const range = queue.length;

			for (let i = 0; i < range; i++) {

				const parent = queue.shift();
				const _parent = _queue.shift();

				if (parent) {
					level.push(parent);
					parent.children.forEach((child: LayoutTree, index: number) => {
						queue.push(child);
						_queue.push(
							new Node(child.type, child.weight, _parent ?? null)
						);

						_parent?.children.push(_queue[_queue.length - 1]);

						if (index == 0) return;

						new Bond(
							child.type,
							_queue[_queue.length - 2],
							_queue[_queue.length - 1],
						);
					});
				}
			}

			levels.push(level);
			toggle = 1 - toggle;
		}

		this.updateTree();
		return this;
	}

	public updateTree = (width?: number, height?: number, hook?: Function) => {

		if (width && height) {
			this._root.dimension = [width, height];
		}

		const queue: Node[] = [this._root];

		const levels: any[][] = [];
		let toggle = 1;

		this._bond = [];
		this._tabs = [];

		while (queue.length) {
			const level: any[] = [];
			const range = queue.length;

			for (let i = 0; i < range; i++) {

				const parent = queue.shift() as Node;

				const size = Helper.getSize(parent);
				const weight = Helper.getTotalWeight(parent);

				let percent = 0;
				let sum = 0;
				let prev = parent.children[0];
				const dimension = parent.dimension
				const coordinate = parent.coordinate

				if (parent) {
					level.push(parent.coordinate);
					if (parent.type == Type.Tabset) {
						this._tabs.push(parent);
					}

					parent.children.forEach((child: Node, index: number) => {
						queue.push(child);
						child.dimension = [...dimension];
						child.coordinate = [...coordinate];

						child.weight = (child.weight / weight) * 100;
						if (index === parent.children.length - 1) {
							child.dimension[parent.type] = size - sum;
							child.weight = 100 - percent;
						} else {
							child.weight = (child.weight / weight) * 100;
							const dmn = size * (child.weight / 100);
							child.dimension[parent.type] = dmn;
							percent += child.weight;
							sum += child.dimension[parent.type];
						}

						child.dimension[parent.type] = child.dimension[parent.type];

						if (!child.prev) return;
						child.coordinate[parent.type] =
							prev.coordinate[parent.type] +
							prev.dimension[parent.type] + 8;

						child.prev.dimension = [...dimension];
						child.prev.coordinate = [...coordinate];
						child.prev.dimension[parent.type] = 8;

						child.prev.coordinate[parent.type] =
							prev.coordinate[parent.type] +
							prev.dimension[parent.type];

						child.prev.type = 1 - parent.type;
						prev = child;
						this._bond.push(child.prev);
					});
				}
			}

			levels.push(level);
			toggle = 1 - toggle;
		}

		if (hook) hook();

		return this.getElements();

	}

	calculate(node: Node, level = 0) {

		if (level == 0) {
			this._bond = [];
			this._tabs = [];
		}

		const reducedSize = Helper.getSize(node);
		const totalWeight = Helper.getTotalWeight(node);

		let prev = node.children[0];
		let sum = 0;
		let prcnt = 0;

		if (node.type == Type.Tabset) {
			this._tabs.push(node);
		}

		node.children.forEach((child, index) => {

			child.dimension = [...node.dimension];
			child.coordinate = [...node.coordinate];

			if (index === node.children.length - 1) {
				child.dimension[node.type] = reducedSize - sum;
				child.weight = 100 - prcnt;
			} else {
				child.weight = (child.weight / totalWeight) * 100;
				child.dimension[node.type] = reducedSize * (child.weight / 100);
				prcnt += child.weight;
				sum += child.dimension[node.type];
			}

			if (index === 0) return;

			child.coordinate[node.type] = prev.coordinate[node.type] + prev.dimension[node.type] + 8;

			if (child.prev) {

				child.prev.dimension = [...node.dimension];
				child.prev.coordinate = [...node.coordinate];
				child.prev.dimension[node.type] = 8;
				child.prev.coordinate[node.type] = prev.coordinate[node.type] + prev.dimension[node.type];

				this._bond.push(child.prev);
			}

			prev = child;
		});

		if (node.type == Type.Tabset) {
			this._tabs.push(node);
		}
		node.children.forEach((child) => {
			if (child.children.length) {
				this.calculate(child, level + 1);
			}
		});

	}

	public getElements = () => {
		return {
			tabs: this._tabs.map((tab: Node) => Helper.json(tab)),
			bonds: this._bond.map((bond: Bond) => Helper.json(bond))
		};
	}

	public jsonify = () => {
		return Helper.json(this._root)
	}
}