# @dynamix-layout/core

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
