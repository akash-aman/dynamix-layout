<div align="center">

[![Patreon](https://img.shields.io/badge/Patreon-Support-F96854?style=for-the-badge&logo=patreon)](https://www.patreon.com/akashaman)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-FFDD00?style=for-the-badge&logo=buy-me-a-coffee)](https://www.buymeacoffee.com/akashaman)
[![Hire Me](https://img.shields.io/badge/Hire%20Me-Email-blue?style=for-the-badge&logo=gmail)](mailto:sir.akashaman@gmail.com)

</div>

## 🚀 @dynamix-layout/core

## Overview

**Dynamix Layout/Updates** is the engine that powers the creation, management, and dynamic modification of your layout structures. It handles the internal logic of the layout tree, including node creation, dimension calculation, and state updates. This package works with a hierarchical tree structure composed of `Node` objects, which represent rows, tabsets, and tabs.

---

### Made with ❤️ by [Akash Aman](https://linktr.ee/akash_aman)

---

## Core Classes

The package is built around three primary classes: `Layout`, `Node`, and `Bond`.

1. **`Layout`**: The main controller class that you instantiate to create and manage the entire layout.
2. **`Node`**: The fundamental building block of the layout tree. Each `Node` can be a `row`, a `tabset`, or a `tab`.
3. **`Bond`**: A special object that represents the draggable separator between two nodes, allowing for resizing.

---

## `Layout` Class

The `Layout` class is the central point of control for your entire layout configuration.

### Constructor

When initializing the `Layout` class, you can provide the following parameters:

- **`tabs`** _(Array\<string\>)_: An array of tab names (strings) to generate an initial binary tree layout. Defaults to `[]`.
- **`tree`** _(LayoutTree | null)_: A serialized JSON representation of a previously saved layout (`LayoutTree` object). If provided, it will recreate that specific layout. Defaults to `null`.
- **`minW`** _(Number)_: The minimum width for a `tabset`. Defaults to `40`.
- **`minH`** _(Number)_: The minimum height for a `tabset`. Defaults to `40`.
- **`bond`** _(Number)_: The width or height (in pixels) of the draggable separator (`Bond`) between nodes. Defaults to `10`.

### Methods

#### 🌳 `updateTree(srcId, destId, layout)`

This is the core method for rearranging the layout. It moves a source node (`srcId`) to a new position relative to a destination node (`destId`).

- **`srcId`** _(string)_: The unique ID of the node to move.
- **`destId`** _(string)_: The unique ID of the destination node.
- **`layout`** _('top' | 'bottom' | 'left' | 'right' | 'contain')_: A string specifying how the source should be placed relative to the destination.
    - `top`, `bottom`, `left`, `right`: Places the source node in a new split area above, below, to the left, or to the right of the destination.
    - `contain`: Places the source node as a new tab within the same `tabset` as the destination node.

**Returns**: `boolean` - `true` if the update was successful, `false` otherwise.

Example:

```javascript
// Moves the 'sidebar' tab to be to the left of the 'main-content' tabset
layout.updateTree('sidebar-id', 'main-content-id', 'left')
```

---

#### 📏 `updateDimension(dimension, disableTimeout, timeout)`

Recalculates all node dimensions within the layout, typically after the main container has been resized.

- **`dimension`** _({ w, h, x, y })_: An object representing the new dimensions and position of the root container.
- **`disableTimeout`** _(boolean)_: If `true`, the update runs instantly. Otherwise, it's debounced to improve performance. Defaults to `false`.
- **`timeout`** _(number)_: The debounce delay in milliseconds. Defaults to `2`.

Example:

```javascript
// On window resize, update the layout dimensions
layout.updateDimension({
	w: window.innerWidth,
	h: window.innerHeight,
	x: 0,
	y: 0,
})
```

---

#### ↔️ `updateSlider(id, dimension, disableTimeout, timeout)`

Updates the layout in response to a user dragging a `Bond` (slider). This recalculates the `part` (percentage share of space) for the adjacent nodes.

- **`id`** _(string)_: The unique ID of the `Bond` being moved.
- **`dimension`** _({ x, y })_: An object with the new `x` and `y` coordinates of the slider.
- **`disableTimeout`** _(boolean)_: If `true`, the update runs instantly. Defaults to `false`.
- **`timeout`** _(number)_: The debounce delay in milliseconds. Defaults to `2`.

Example:

```javascript
// When a user drags a separator
layout.updateSlider('bond-123', { x: 450, y: 300 })
```

---

#### 🗑️ `clearAllCache()`

Clears all internal caches for nodes, bonds, dimensions, and other layout data. Use this when completely destroying or resetting the layout.

Example:

```javascript
layout.clearAllCache()
```

---

## `Node` Class

The `Node` represents a single element in the layout tree.

### Node Properties

- **`type`** _('row' | 'tabset' | 'tab')_: Defines the node's function.
    - `row`: A container that organizes its children horizontally or vertically.
    - `tabset`: A container that holds one or more `tab` nodes and displays one at a time.
    - `tab`: The final content node, which is hosted inside a `tabset`.
- **`unId`** _(string)_: A unique identifier for the node.
- **`host`** _(Node | null)_: A reference to the parent `Node`.
- **`kids`** _(Queue\<Node\>)_: A queue of child `Node` objects.
- **`part`** _(number)_: The percentage of space the node occupies within its host `row`.
- **`dims`** _(Dimension)_: The calculated dimensions (`w`, `h`, `x`, `y`) of the node.

### Static Cache (`Node.cache`)

The `Node` class contains a static `cache` object. This centralized cache holds the state for the entire layout, including maps of all nodes, bonds, dimensions, and reactive options. Direct manipulation of the cache is not recommended.

### Methods

#### 💾 `toJSON()`

Serializes the node and its entire subtree into a JSON object (`LayoutTree`). This is used to save the current state of the layout, which can be passed back into the `Layout` constructor to restore it later.

Example:

```javascript
const rootNode = layout._root
const layoutJSON = rootNode.toJSON()
// localStorage.setItem('savedLayout', JSON.stringify(layoutJSON));
```

## Example Usage

```javascript
// 1. Initialize the Layout class
// You can either provide a list of tabs to auto-generate a layout...
const layout = new Layout(['editor', 'terminal', 'preview']);

// ...or restore a layout from a saved JSON object
// const savedLayout = JSON.parse(localStorage.getItem('savedLayout'));
// const layout = new Layout([], savedLayout);

// 2. Set the initial dimensions of your container
layout.updateDimension({ w: 1200, h: 800, x: 0, y: 0 }, true);

// 3. To listen for layout changes, you can subscribe to the reactive options
// This is an advanced use case for UI frameworks
// layout.nodeOps.subscribe(nodeOptionsMap => {
//   console.log('Layout updated!', nodeOptionsMap);
// });

// 4. Move a tab to a new location
// For example, move the 'terminal' tab to be below the 'editor' tab
setTimeout(() => {
  const terminalNodeId = /* get terminal node id from layout.nodeOps */;
  const editorNodeId = /* get editor node id */;
  if (terminalNodeId && editorNodeId) {
    layout.updateTree(terminalNodeId, editorNodeId, 'bottom');
  }
}, 2000);
```

---

<div align="center">

[![Patreon](https://img.shields.io/badge/Patreon-Support-F96854?style=for-the-badge&logo=patreon)](https://www.patreon.com/akashaman)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-FFDD00?style=for-the-badge&logo=buy-me-a-coffee)](https://www.buymeacoffee.com/akashaman)
[![Hire Me](https://img.shields.io/badge/Hire%20Me-Email-blue?style=for-the-badge&logo=gmail)](mailto:sir.akashaman@gmail.com)

### Made with ❤️ by [Akash Aman](https://linktr.ee/akash_aman)

</div>
