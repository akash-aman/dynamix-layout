# Dynamix Layout/Core

![Dynamix Layout Logo](https://raw.githubusercontent.com/akash-aman/dynamix-layout/main/packages/core/assets/view.gif)

## Overview

**Dynamix Layout/Core** is a versatile JavaScript package for creating dynamic layouts with ease. This package provides a set of options and methods to manage and manipulate layouts within a container. With Dynamix Layout/Core, you can efficiently handle layouts, dimensions, coordinates, tabs, and more.

## Options Object Parameters

When initializing the package, you can provide an options object with the following parameters:

1. **layout** *(JSON)*: This parameter allows you to provide a serialized JSON representation of a layout. It can be used to recreate the same layout in the future. If not provided, it defaults to `null`.

2. **range** *(Number)*: Use this parameter to specify the number of tabs you want to create and get their sizes on layout shift. If not provided, it defaults to `1`.

3. **dimension** *(Array)*: This parameter is used to set the width and height of the main container in which child layouts exist. It should be an array of two numbers, e.g., `[width, height]`. The default value is `[0, 0]`.

4. **coordinate** *(Array)*: Specify the x and y positions within the window of the container element using this parameter. It should be an array of two numbers, e.g., `[x, y]`. The default value is `[0, 0]`.

5. **tabs** *(Array)*: This parameter allows you to provide an array of names for the tabs. These names are used as IDs and key names. The default value is an array created based on the `range` parameter, such as `['tab-1', 'tab-2', ...]`.

## Allowed Parameters

- **layout**: Represents a serialized JSON layout for recreating layouts.
- **dimension**: Specifies the width and height of the main container.
- **coordinate**: Sets the x and y positions within the container element's window.
- **tabs**: An array of names for tabs, used as IDs and key names.
- **range**: Number of tabs to create and get their sizes on layout shift.

## Methods

### 1. shiftTree(srcId, destId)

The `shiftTree` method is used to shift the layout from a source element with the given `srcId` to a destination element with the `destId`. It returns the sizes of the elements involved in the shift.

Example:
```javascript
const sizes = dynamixLayout.shiftTree('tab-1', 'tab-2');
```

### 2. updateTree()

The `updateTree` method is used to recalculate the sizes in case of a window resize. It ensures that the layout remains consistent after a container size change.

Example:
```javascript
dynamixLayout.updateTree();
```

### 3. getElement()

The `getElement` method returns information about all the tabs and their sizes. It is useful for retrieving the current state of the layout.

Example:
```javascript
const tabInfo = dynamixLayout.getElement();
```

### 4. jsonify()

The `jsonify` method is used to generate a JSON representation of the current layout. You can store this JSON in local storage and use it to recreate the same layout at a later time.

Example:
```javascript
const layoutJSON = dynamixLayout.jsonify();
```

## Emojis

🔀 - Used to shift the layout with the `shiftTree` method.

🔄 - Triggered when updating the layout using the `updateTree` method.

📜 - Represents the information retrieval with the `getElement` method.

💾 - Indicates the ability to save and recreate layouts with the `jsonify` method.

## Example Usage

```javascript
// Initialize Dynamix Layout/Core
const dynamixLayout = new DynamixLayoutCore({
    layout: { /* Your serialized layout JSON here */ },
    dimension: [800, 600],
    coordinate: [100, 100],
    tabs: ['tab-1', 'tab-2', 'tab-3'],
    range: 3,
});

// Perform layout shifts
const sizes = dynamixLayout.shiftTree('tab-1', 'tab-2');

// Handle window resize
dynamixLayout.updateTree();

// Retrieve tab information
const tabInfo = dynamixLayout.getElement();

// Generate JSON for storage and future use
const layoutJSON = dynamixLayout.jsonify();
```

Dynamix Layout/Core is a powerful tool for managing layouts and tabbed content, making it easier to build dynamic and responsive user interfaces.

For more details and advanced usage, please refer to the official documentation.

**Thank you for choosing Dynamix Layout/Core!** 🚀

