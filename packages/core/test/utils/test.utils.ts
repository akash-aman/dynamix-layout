import { Node, Queue } from '../../src'

/**
 * A standalone tree iterator that doesn't rely on a Layout instance.
 */
function* nodeLayoutIterator(root: Node): Generator<Node> {
	const queue = new Queue<Node>()
	if (root) queue.enqueue(root)

	while (!queue.isEmpty()) {
		const current = queue.dequeue()!
		yield current
		for (const child of current.kids) {
			queue.enqueue(child)
		}
	}
}

/**
 * Asserts that a node tree is structurally and logically intact.
 * Throws a detailed error if any validation check fails.
 * @param rootNode The root node of the tree to validate.
 */
export function assertNodeTreeIsValid(rootNode: Node): void {
	if (!rootNode) throw new Error('Validation Error: Root node is null.')

	const allNodes = Array.from(nodeLayoutIterator(rootNode))

	for (const node of allNodes) {
		const nodeId = `Node (uid: ${node.unId}, type: ${node.type})`

		// 1. Parent-Child Host Consistency
		if (node !== rootNode) {
			if (!node.host)
				throw new Error(`ORPHANED: ${nodeId} has a null host.`)
			if (node.host.kids.indexOf(node) === -1) {
				throw new Error(
					`DISOWNED: ${nodeId}'s host does not contain it in its kids queue.`
				)
			}
		}
		for (const kid of node.kids) {
			if (kid.host !== node) {
				throw new Error(
					`WRONG PARENT: Child ${kid.unId} does not point back to parent ${node.unId}.`
				)
			}
		}

		// 2. Layout Direction Consistency
		if (node !== rootNode && node.host) {
			const parentDir = Node.cache.mapDirs.get(node.host.unId)
			const currentDir = Node.cache.mapDirs.get(node.unId)
			if (currentDir === undefined)
				throw new Error(`MISSING DIR: ${nodeId} has no direction set.`)
			if (parentDir === currentDir) {
				throw new Error(
					`DIRECTION CONFLICT: ${nodeId} has the same direction as its parent.`
				)
			}
		}

		// 3. Sibling (Linked List) Consistency
		const kids = node.kids.toArray()
		if (kids.length > 0) {
			if (kids[0].prev !== null)
				throw new Error(
					`BROKEN START: First child ${kids[0].unId} has a non-null 'prev' link.`
				)
			if (kids[kids.length - 1].next !== null)
				throw new Error(
					`BROKEN END: Last child ${kids[kids.length - 1].unId} has a non-null 'next' link.`
				)

			for (let i = 0; i < kids.length - 1; i++) {
				if (kids[i].next?.next !== kids[i + 1])
					throw new Error(`BROKEN FORWARD LINK near ${kids[i].unId}.`)
				if (kids[i + 1].prev?.prev !== kids[i])
					throw new Error(
						`BROKEN BACKWARD LINK near ${kids[i + 1].unId}.`
					)
			}
		}
	}
}
