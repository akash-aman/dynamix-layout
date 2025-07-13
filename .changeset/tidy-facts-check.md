---
'@dynamix-layout/core': patch
---

Refactored layout core and added unit tests for reactive state and layout logic

- Replaced legacy `Layout` class with modular utilities: `Queue` and `createReactiveState`.
- Improved layout shifting algorithm (`shiftTree`) and bond-based slider behavior.
- Added comprehensive unit tests for layout validation, tree integrity, and reactive state handling.
- Simplified exports and cleaned up `index.ts`, `.gitignore`, and `package.json` structure.
- Refactored `vite.config.ts`, `tsconfig.json`, and `vitest.config.ts` for clarity and consistency.
- Added license metadata to Vite configuration and updated author name in LICENSE.
