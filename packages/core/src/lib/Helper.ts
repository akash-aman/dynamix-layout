import { IMethods, Type, AreaValue, TypeValue } from "../types"
import { Node, Bond } from "./Element";
import { AreaIndex, AreaType } from "./Constant";
import { Settings } from "../app";
export class Helper implements IMethods {

	static createBinaryTree = (root: Node, settings: Settings) => {
		const { range } = settings;
		const tabs = [...settings.tabs]
		if (range == 1) {

			const col = new Node(Type.Column, 100, root)
			root.children = [col];
			Helper.addTab(col, tabs);
			return;
		};

		const queue: Node[] = [root];

		const levels: Node[][] = [];

		let toggle = 1;
		let count = 1;

		while (count < (range as number) || queue.length) {
			const level: Node[] = [];
			const length = queue.length;

			for (let i = 0; i < length; i++) {

				const parent = queue.shift() as Node;
				const pIndex = parent.parent?.children.indexOf(parent) ?? 0;
				parent.name = `r${levels.length}/c${i}/tb${pIndex}`;

				if (parent) {
					level.push(parent);

					if (count < (range as number)) {
						parent.children[0] = new Node(toggle, 50, parent);
						queue.push(parent.children[0]);
					}

					if (count < (range as number)) {
						parent.children[1] = new Node(toggle, 50, parent);
						queue.push(parent.children[1]);

						count++;

						const bond = new Bond(
							toggle,
							parent.children[0],
							parent.children[1]
						);

						bond.name = `r${levels.length}/c${i}/b${pIndex}-${pIndex + 1}`;
					}
				}
			}

			levels.push(level);
			toggle = 1 - toggle;
		}

		const last = [
			...levels[levels.length - 1],
			...levels[levels.length - 2]
		]

		last.forEach((child: Node) => {
			Helper.addTab(child, tabs)
		})

		return;
	}

	static fixSrc = (src: Node) => {
		const parent = src.parent;
		if (!parent) return;
		const index = parent.children.indexOf(src);
		const peer = parent.children[1 - index];
		const grand = parent.parent;
		const pIndex = grand?.children.indexOf(parent) as number;

		switch (peer.type) {
			case Type.Tabset:
				const weight = parent.weight;
				grand?.children.splice(pIndex, 1);
				grand?.children.splice(pIndex, 0, peer);
				peer.weight = weight;
				peer.parent = grand;
				Helper.fixBond(peer, peer.type);

				break;
			default:

				if (!grand) {
					parent.children.splice(index, 1);
					break;
				}
				const count = peer.children.length;
				const affacted = (8 * (count - 1)) * 100 / grand.dimension[peer.type];

				peer.children.forEach((child: Node) => {
					child.weight = ((parent.weight - affacted) * child.weight) / 100;
				});

				const first = peer.children[0];
				const last = peer.children[count - 1];

				grand.children = [
					...grand.children.slice(0, pIndex),
					...peer.children,
					...grand.children.slice(pIndex + 1)
				]

				peer.children.forEach((child: Node) => {
					child.parent = grand;
				})

				Helper.fixBond(first, peer.type);
				Helper.fixBond(last, peer.type);
				break;
		}
	}

	static detach(src: Node, flag: Boolean) {
		const parent = src.parent;
		if (!parent) return;

		const index = src.parent?.children.indexOf(src) as number;
		const range = parent?.children.length as number;
		const affacted = 8 * 100 / parent.dimension[parent.type];
		if (!flag) return Helper.fixSrc(src);



		if (index > 0 && index < range - 1) {
			const weight = (src.weight + affacted) / 2;
			const next = parent.children[index + 1];
			const prev = parent.children[index - 1];
			next.weight += weight;
			prev.weight += weight;
			new Bond(src.type, prev, next);
		}

		if (index === range - 1) {
			const prev = parent.children[index - 1];
			prev.weight += src.weight + affacted;
			prev.next = null;
		}

		if (index === 0) {
			const next = parent.children[index + 1];
			next.weight += src.weight + affacted;
			next.prev = null;
		}

		parent.children.splice(index, 1);
	}

	static attach(des: Node, src: Node, area: AreaValue) {
		const parent = des.parent;
		if (!parent) return;
		const index = parent.children.indexOf(des) as number;

		switch (AreaType[area]) {
			case 1 - parent.type:
				const insert = index + AreaIndex[area];
				const affacted = 8 * 100 / parent.dimension[parent.type];
				src.weight = des.weight = (des.weight - affacted) / 2;
				src.parent = parent;
				parent.children.splice(insert, 0, src);
				Helper.fixBond(src, parent.type);
				break;

			case parent.type:

				const weight = des.weight / 2;
				const children = AreaIndex[area] == 0 ? [src, des] : [des, src];
				const rowcol = new Node(1 - parent.type, des.weight, parent);
				rowcol.children = children;
				parent.children[index] = rowcol;

				children.forEach((child: Node) => {
					child.weight = weight;
					child.parent = rowcol;
				})

				this.fixBond(rowcol, parent.type);
				this.fixBond(src, parent.type);
				this.fixBond(des, parent.type);
				break;

			case Type.Tab:
				des.children.push(...src.children);
				src.children.forEach((child: Node) => {
					child.parent = des;
				})
				break;

		}
	}

	static fixBond = (node: Node, type: TypeValue) => {
		const parent = node.parent;
		if (!parent) return;
		const index = parent.children.indexOf(node) as number;
		const range = parent.children.length;

		if (index > 0 && index < range - 1) {
			new Bond(type, parent.children[index - 1], parent.children[index]);
			new Bond(type, parent.children[index], parent.children[index + 1]);
		}

		if (index === range - 1) {
			new Bond(type, parent.children[index - 1], parent.children[index]);
			parent.children[index].next = null;
		}

		if (index === 0) {
			new Bond(type, parent.children[index], parent.children[index + 1]);
			parent.children[index].prev = null;
		}
	}

	static getTotalWeight(node: Node): number {
		return node.children.reduce((acc, cur) => acc + (cur.weight), 0) ?? 100;
	}

	static getTotalNodes(node: Node): number {

		return node.children.length;
	}

	static getSize(node: Node): number {
		return node.dimension[node.type] - ((this.getTotalNodes(node) - 1) * 8);
	}

	static addTab = (child: Node, names: string[]) => {
		if (child.children.length !== 0) return;
		child.type = Type.Tabset;
		const tab = new Node(Type.Tab, 100, child);
		const name = names.shift() as string;
		tab.name = name;
		child.children = [tab];
		return;
	}

	static json = (node: any) => {
		return {
			type: node.type,
			dimension: node.dimension,
			coordinate: node.coordinate,
			name: node.name,
			children: node.children?.map((child: any) => Helper.json(child))
		}
	}
}

