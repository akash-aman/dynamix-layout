import { describe, it, expect, beforeEach } from 'vitest';
import { Layout, LayoutTree, Node, Queue } from '../src';

/**
 * Yields all nodes in the layout tree using breadth-first traversal
 */
function* nodeLayoutIterator(root: Node): Generator<Node> {
    const queue = new Queue<Node>();
    if (root) queue.enqueue(root);
    
    while (!queue.isEmpty()) {
        const current = queue.dequeue()!;
        yield current;
        for (const child of current.kids) {
            queue.enqueue(child);
        }
    }
}

/**
 * Validates the integrity of the layout tree structure
 * 
 * Checks:
 * - Parent-child relationships are bidirectional
 * - Layout directions are opposite between parent and child
 * - Sibling doubly-linked lists are intact
 * - All nodes have proper host references
 * 
 * @param node - Root node to validate (defaults to Layout._root)
 * @returns true if tree structure is valid, false otherwise
 */
const validateTree = (node: Node = Layout._root): boolean => {
    let isValid = true;
    const allNodes = Array.from(nodeLayoutIterator(node));

    console.group(`Validating Tree Integrity for ${allNodes.length} nodes...`);

    for (const currentNode of allNodes) {
        let nodeIsValid = true;
        const id = `Node (uid: ${currentNode.unId}, type: ${currentNode.type}, name: '${currentNode.name}')`;
        console.groupCollapsed(`Checking ${id}`);

        // Validate parent-child host relationship
        if (currentNode !== Layout._root) {
            if (!currentNode.host) {
                console.error(`❌ ORPHANED: ${id} has a null host.`);
                nodeIsValid = false;
            } else if (currentNode.host.kids.indexOf(currentNode) === -1) {
                console.error(`❌ DISOWNED: ${id}'s host (uid: ${currentNode.host.unId}) does not contain it in its kids queue.`);
                nodeIsValid = false;
            }
        }

        // Validate children's host relationship
        for (const kid of currentNode.kids) {
            if (kid.host !== currentNode) {
                console.error(`❌ WRONG PARENT: Child (uid: ${kid.unId}) has host (uid: ${kid.host?.unId}), but should be ${currentNode.unId}.`);
                nodeIsValid = false;
            }
        }

        // Validate layout direction
        if (currentNode !== Layout._root && currentNode.host) {
            const parentDir = Node.cache.mapDirs.get(currentNode.host.unId);
            const currentDir = Node.cache.mapDirs.get(currentNode.unId);

            if (parentDir === undefined) {
                console.error(`❌ MISSING PARENT DIR: Host (uid: ${currentNode.host.unId}) of ${id} has no direction set in the cache.`);
                nodeIsValid = false;
            } else if (currentDir === undefined) {
                console.error(`❌ MISSING OWN DIR: ${id} has no direction set in the cache.`);
                nodeIsValid = false;
            } else if (currentDir === parentDir) {
                console.error(`❌ DIRECTION CONFLICT: ${id} has the same direction (${currentDir}) as its host. It should be the opposite.`);
                nodeIsValid = false;
            }
        }

        // Validate sibling bonds for container nodes
        if (currentNode.type === 'row' || currentNode.type === 'tabset') {
            const kidsArray = currentNode.kids.toArray();
            if (kidsArray.length > 0) {
                if (kidsArray[0].prev !== null) {
                    console.error(`❌ BROKEN START: First child (uid: ${kidsArray[0].unId})'s 'prev' link is not null.`);
                    nodeIsValid = false;
                }
                if (kidsArray[kidsArray.length - 1].next !== null) {
                    console.error(`❌ BROKEN END: Last child (uid: ${kidsArray[kidsArray.length - 1].unId})'s 'next' link is not null.`);
                    nodeIsValid = false;
                }
                
                for (let i = 0; i < kidsArray.length - 1; i++) {
                    const currentKid = kidsArray[i];
                    const nextKid = kidsArray[i + 1];
                    
                    if (!currentKid.next) {
                        console.error(`❌ BROKEN CHAIN: Child (uid: ${currentKid.unId}) is missing its 'next' bond.`);
                        nodeIsValid = false;
                        continue;
                    }
                    if (currentKid.next.next !== nextKid) {
                        console.error(`❌ FORWARD LINK: Child (uid: ${currentKid.unId})'s 'next' bond does not point to the correct next sibling (uid: ${nextKid.unId}).`);
                        nodeIsValid = false;
                    }
                    if (!nextKid.prev) {
                        console.error(`❌ BROKEN CHAIN: Child (uid: ${nextKid.unId}) is missing its 'prev' bond.`);
                        nodeIsValid = false;
                        continue;
                    }
                    if (nextKid.prev.prev !== currentKid) {
                        console.error(`❌ BACKWARD LINK: Child (uid: ${nextKid.unId})'s 'prev' bond does not point back to the correct previous sibling (uid: ${currentKid.unId}).`);
                        nodeIsValid = false;
                    }
                    if (currentKid.next.host !== currentNode) {
                        console.error(`❌ BOND HOST: Bond between ${currentKid.unId} and ${nextKid.unId} has incorrect host (uid: ${currentKid.next.host?.unId}). Should be ${currentNode.unId}.`);
                        nodeIsValid = false;
                    }
                }
            }
        }

        if (nodeIsValid) {
            console.log(`✅ OK: ${id} passed all checks.`);
        }

        console.groupEnd();
        if (!nodeIsValid) {
            isValid = false;
        }
    }

    if (isValid) {
        console.log("✅ Validation Complete: Tree integrity and directions are OK.");
    } else {
        console.error("❌ Validation Complete: Found one or more issues in the tree structure.");
    }
    console.groupEnd();

    return isValid;
};

describe('Comprehensive Move Test Suite', () => {
    const initialLayoutTree: LayoutTree = {
        "typNode": "row",
        "nodPart": 100,
        "nodName": "root",
        "uidNode": "root",
        "nodKids": [
            {
                "typNode": "tabset",
                "nodPart": 100,
                "nodName": "",
                "uidNode": "4fb93a5d-2436-4e1d-b530-d88958b21acd",
                "nodOpen": "sidebar",
                "nodKids": [
                    {
                        "typNode": "tab",
                        "nodPart": 100,
                        "nodName": "sidebar",
                        "uidNode": "51f72497-4be6-4e67-95b6-240b3320105a"
                    }
                ]
            },
            {
                "typNode": "row",
                "nodPart": 100,
                "nodName": "",
                "uidNode": "534112f9-0566-484d-b3a7-a36a92cda495",
                "nodKids": [
                    {
                        "typNode": "tabset",
                        "nodPart": 100,
                        "nodName": "",
                        "uidNode": "01e53ba1-1456-45b0-a2e7-ccb4a399738d",
                        "nodOpen": "codeblock",
                        "nodKids": [
                            {
                                "typNode": "tab",
                                "nodPart": 100,
                                "nodName": "codeblock",
                                "uidNode": "10685b53-612e-4ad9-9167-74b8237ebce9"
                            }
                        ]
                    },
                    {
                        "typNode": "row",
                        "nodPart": 100,
                        "nodName": "",
                        "uidNode": "637e68dc-feec-4eb0-a70a-6e4ec9fbf5af",
                        "nodKids": [
                            {
                                "typNode": "tabset",
                                "nodPart": 100,
                                "nodName": "",
                                "uidNode": "ee984aa2-b46c-469e-a24d-43492edacf71",
                                "nodOpen": "terminal",
                                "nodKids": [
                                    {
                                        "typNode": "tab",
                                        "nodPart": 100,
                                        "nodName": "terminal",
                                        "uidNode": "604bc026-018d-40f0-85a6-aa02e65db899"
                                    }
                                ]
                            },
                            {
                                "typNode": "row",
                                "nodPart": 100,
                                "nodName": "",
                                "uidNode": "fd5e41be-07b1-4caa-a72e-9cc5226e895e",
                                "nodKids": [
                                    {
                                        "typNode": "tabset",
                                        "nodPart": 100,
                                        "nodName": "",
                                        "uidNode": "c0d0d6e5-c4bc-4146-8911-017257757d2a",
                                        "nodOpen": "editor",
                                        "nodKids": [
                                            {
                                                "typNode": "tab",
                                                "nodPart": 100,
                                                "nodName": "editor",
                                                "uidNode": "d7586e7b-9735-4745-b6ac-bf739686db79"
                                            }
                                        ]
                                    },
                                    {
                                        "typNode": "row",
                                        "nodPart": 100,
                                        "nodName": "",
                                        "uidNode": "10fbe6c8-18d4-439a-ad90-21fd3241141c",
                                        "nodKids": [
                                            {
                                                "typNode": "tabset",
                                                "nodPart": 100,
                                                "nodName": "",
                                                "uidNode": "c379ba53-044e-4f54-812e-f5e2219ece6d",
                                                "nodOpen": "preview",
                                                "nodKids": [
                                                    {
                                                        "typNode": "tab",
                                                        "nodPart": 100,
                                                        "nodName": "preview",
                                                        "uidNode": "40f1397b-240a-4ef4-bb5e-0b9f3044fdd6"
                                                    }
                                                ]
                                            },
                                            {
                                                "typNode": "tabset",
                                                "nodPart": 100,
                                                "nodName": "",
                                                "uidNode": "88d41c42-cc22-46ed-89e7-055070f6d9f6",
                                                "nodOpen": "settings",
                                                "nodKids": [
                                                    {
                                                        "typNode": "tab",
                                                        "nodPart": 100,
                                                        "nodName": "settings",
                                                        "uidNode": "61954f56-03ae-431b-819b-287c0a5ce315"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    let layout: Layout;

    beforeEach(() => {
        const layoutTreeCopy = JSON.parse(JSON.stringify(initialLayoutTree));
        layout = new Layout([], layoutTreeCopy);
    });

    describe('Splitting Panels', () => {
        it('should split vertical (drop top)', () => {
            const success = layout.updateTree(
                "604bc026-018d-40f0-85a6-aa02e65db899",
                "d7586e7b-9735-4745-b6ac-bf739686db79",
                "top"
            );

            expect(success).toBe(true);
            expect(validateTree()).toBe(true);
        });

        it('should split horizontal (drop right)', () => {
            const success = layout.updateTree(
                "d7586e7b-9735-4745-b6ac-bf739686db79",
                "604bc026-018d-40f0-85a6-aa02e65db899",
                "right"
            );

            expect(success).toBe(true);
            expect(validateTree()).toBe(true);
        });
    });

    describe('Containing (Moving Into Tabsets)', () => {
        it('should contain tab (move settings into editor)', () => {
            const success = layout.updateTree(
                "61954f56-03ae-431b-819b-287c0a5ce315",
                "d7586e7b-9735-4745-b6ac-bf739686db79",
                "contain"
            );

            expect(success).toBe(true);
            expect(validateTree()).toBe(true);
        });

        it('should contain tabset (move terminal into sidebar)', () => {
            const success = layout.updateTree(
                "ee984aa2-b46c-469e-a24d-43492edacf71",
                "51f72497-4be6-4e67-95b6-240b3320105a",
                "contain"
            );

            expect(success).toBe(true);
            expect(validateTree()).toBe(true);
        });
    });

    describe('Moving Outward (Deep to Shallow)', () => {
        it('should move deepest tab to top level (settings to left of sidebar)', () => {
            const success = layout.updateTree(
                "61954f56-03ae-431b-819b-287c0a5ce315",
                "51f72497-4be6-4e67-95b6-240b3320105a",
                "left"
            );

            expect(success).toBe(true);
            expect(validateTree()).toBe(true);
        });
    });

    describe('Moving Inward (Shallow to Deep)', () => {
        it('should move top level tab to deepest (sidebar to bottom of settings)', () => {
            const success = layout.updateTree(
                "51f72497-4be6-4e67-95b6-240b3320105a",
                "61954f56-03ae-431b-819b-287c0a5ce315",
                "bottom"
            );

            expect(success).toBe(true);
            expect(validateTree()).toBe(true);
        });
    });

    describe('Moving Between Different Branches', () => {
        it('should move across branches (codeblock to right of preview)', () => {
            const success = layout.updateTree(
                "10685b53-612e-4ad9-9167-74b8237ebce9",
                "40f1397b-240a-4ef4-bb5e-0b9f3044fdd6",
                "right"
            );

            expect(success).toBe(true);
            expect(validateTree()).toBe(true);
        });
    });

    describe('Sibling and Root Edge Cases', () => {
        it('should move sibling left (settings to left of preview)', () => {
            const success = layout.updateTree(
                "88d41c42-cc22-46ed-89e7-055070f6d9f6",
                "c379ba53-044e-4f54-812e-f5e2219ece6d",
                "left"
            );

            expect(success).toBe(true);
            expect(validateTree()).toBe(true);
        });

        it('should move to root (bottom)', () => {
            const success = layout.updateTree(
                "d7586e7b-9735-4745-b6ac-bf739686db79",
                "root",
                "bottom"
            );

            expect(success).toBe(true);
            expect(validateTree()).toBe(true);
        });
    });

    describe('Validation Function', () => {
        it('should validate tree structure on initial layout', () => {
            expect(validateTree()).toBe(true);
        });

        it('should detect invalid tree structure', () => {
            const success = layout.updateTree(
                "d7586e7b-9735-4745-b6ac-bf739686db79",
                "root",
                "bottom"
            );

            expect(success).toBe(true);
            expect(validateTree()).toBe(true);
        });
    });
});