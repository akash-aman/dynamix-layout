# @dynamix-layout/core

## 0.0.7

### Patch Changes

- [#31](https://github.com/akash-aman/dynamix-layout/pull/31) [`3a3371b`](https://github.com/akash-aman/dynamix-layout/commit/3a3371bb35487ef144de62fd7d35f3931a4f80f8) Thanks [@akash-aman](https://github.com/akash-aman)! - Fixed demo gif.

## 0.0.6

### Patch Changes

- [#25](https://github.com/akash-aman/dynamix-layout/pull/25) [`8b7ab1a`](https://github.com/akash-aman/dynamix-layout/commit/8b7ab1a0317dae85400ed381c85a4e50c35db41e) Thanks [@akash-aman](https://github.com/akash-aman)! - feat(core): enhance demo with GIFs/MP4s and update README for better structure
    - Updated `.hintrc` to enforce consistent casing for TypeScript.
    - Added demo assets (GIFs, MP4) to showcase layout functionality.
    - Cleaned up `.npmignore` to exclude `.map` files.
    - Removed unused `vite-plugin-compression2` dependency.
    - Improved README structure and visual assets for `core` package.
    - Added TypeScript configuration files for clearer project setup.

    feat(react): initial release of DynamixLayout React component
    - Introduced `@dynamix-layout/react` package to provide a React wrapper around `@dynamix-layout/core`.
    - Added `DynamixLayout` component with support for dynamic, draggable, and resizable layouts.
    - Included usage examples and updated README for better developer onboarding.
    - Integrated demo assets (GIFs, MP4s) to showcase layout behavior.
    - Refactored tests to validate component behavior and ensure coverage.

## 0.0.5

### Patch Changes

- Refactored layout core and added unit tests for reactive state and layout logic
    - Replaced legacy `Layout` class with modular utilities: `Queue` and `createReactiveState`.
    - Improved layout shifting algorithm (`shiftTree`) and bond-based slider behavior.
    - Added comprehensive unit tests for layout validation, tree integrity, and reactive state handling.
    - Simplified exports and cleaned up `index.ts`, `.gitignore`, and `package.json` structure.
    - Refactored `vite.config.ts`, `tsconfig.json`, and `vitest.config.ts` for clarity and consistency.
    - Added license metadata to Vite config and updated author name in LICENSE.

## 0.0.2-beta.0

### Patch Changes

- [`de04496`](https://github.com/akash-aman/dynamix-layout/commit/de044969c2e47c254ced7113c4751a3127fba9d5) Thanks [@akash-aman](https://github.com/akash-aman)! - initial version.
