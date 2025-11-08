# @dynamix-layout/core

## 1.0.0

### Major Changes

- [#66](https://github.com/akash-aman/dynamix-layout/pull/66) [`416172e`](https://github.com/akash-aman/dynamix-layout/commit/416172e03da7e7916c160409996a23189dedc588) Thanks [@akash-aman](https://github.com/akash-aman)! - This pull request updates several dependencies across the project to their latest patch or minor versions, focusing primarily on build tools, frameworks, and linting packages. These updates help ensure compatibility, improved features, and bug fixes throughout the codebase.

    Dependency updates:

    **Vite upgrades:**
    - Updated the `vite` dependency from versions `^7.0.4` or `^7.0.5` to `^7.1.11` in `apps/site/package.json`, `examples/react/package.json`, `examples/solid/package.json`, `packages/core/package.json`, `packages/react/package.json`, and `packages/solid/package.json`. [[1]](diffhunk://#diff-33ce070b849ec2220094ce84790e6978b0870aa1168826458888f280eae6489bL82-R82) [[2]](diffhunk://#diff-3ae58cd0dc48e9afc5345bcd388b6f82b75345c9fd156f5bd3c71cb92037aa64L43-R43) [[3]](diffhunk://#diff-d3b34c9f36ccc3e9869a8c4a6f0d775de611001b94f1230887d0958fa2db8a16L18-R18) [[4]](diffhunk://#diff-0b810c38f3c138a3d5e44854edefd5eb966617ca84e62f06511f60acc40546c7L73-R73) [[5]](diffhunk://#diff-1f344ac391eeecc21ec0f01fb07430a47f4b80d20485c125447d54c33c4bbfc4L92-R92) [[6]](diffhunk://#diff-24f04605b9a786a23c3cf2ab9649fb66cf01126ed9c7a202100840b6a8323fa1L85-R85)

    **Next.js and related dependencies:**
    - Upgraded `next` from `15.4.1` to `15.4.7` and `eslint-config-next` from `15.4.1` to `15.4.7` in `examples/nextjs/package.json`. [[1]](diffhunk://#diff-23044c563f1173db6464d127497c342c8f7f90722764a37749681bf455a515e0L12-R12) [[2]](diffhunk://#diff-23044c563f1173db6464d127497c342c8f7f90722764a37749681bf455a515e0L25-R25)

    **Linting and TypeScript tooling:**
    - Updated `typescript-eslint` from `^8.37.0` to `^8.46.3` in `package.json`.

    **SolidJS and related tooling:**
    - Upgraded `@solidjs/start` from `^1.1.7` to `^1.2.0` in `package.json`.

## 0.0.8

### Patch Changes

- [#52](https://github.com/akash-aman/dynamix-layout/pull/52) [`b6568bc`](https://github.com/akash-aman/dynamix-layout/commit/b6568bc6dac744ca18e066541b0306439b51738f) Thanks [@akash-aman](https://github.com/akash-aman)! - @dynamix-layout/core
  • Removed unnecessary console logs & update dependency.

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
