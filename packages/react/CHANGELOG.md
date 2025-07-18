# @dynamix-layout/react

## 0.0.5

### Patch Changes

- [#52](https://github.com/akash-aman/dynamix-layout/pull/52) [`b6568bc`](https://github.com/akash-aman/dynamix-layout/commit/b6568bc6dac744ca18e066541b0306439b51738f) Thanks [@akash-aman](https://github.com/akash-aman)! - @dynamix-layout/react
  -  Fixed hover element rendering issue caused by hardcoded width.
  -  Improved default CSS styles.
  -  Added support for export & save layout as JSON via callback.
  -  Resolved TypeScript type issues.
  -  Included example projects for React and Next.js.
- Updated dependencies [[`b6568bc`](https://github.com/akash-aman/dynamix-layout/commit/b6568bc6dac744ca18e066541b0306439b51738f)]:
    - @dynamix-layout/core@0.0.8
    - react@0.0.1

## 0.0.4

### Patch Changes

- [#42](https://github.com/akash-aman/dynamix-layout/pull/42) [`e5549f8`](https://github.com/akash-aman/dynamix-layout/commit/e5549f8fddfe3f10f07daddea4c247f3d12d19a2) Thanks [@akash-aman](https://github.com/akash-aman)! - Remove unnecessary data transfer handling in drag and drop events

## 0.0.3

### Patch Changes

- [#38](https://github.com/akash-aman/dynamix-layout/pull/38) [`3f3e2dd`](https://github.com/akash-aman/dynamix-layout/commit/3f3e2dd117b3043256ccb9bb21a10f83215b3d62) Thanks [@akash-aman](https://github.com/akash-aman)! - Fixed drag & drop not working bug for safari browser

## 0.0.2

### Patch Changes

- [#33](https://github.com/akash-aman/dynamix-layout/pull/33) [`1861a2c`](https://github.com/akash-aman/dynamix-layout/commit/1861a2cbc8e0fa90971a1899ed3078e226ecf0b3) Thanks [@akash-aman](https://github.com/akash-aman)! - - Fixed demo gif.

## 0.0.1

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

- Updated dependencies [[`8b7ab1a`](https://github.com/akash-aman/dynamix-layout/commit/8b7ab1a0317dae85400ed381c85a4e50c35db41e)]:
    - @dynamix-layout/core@0.0.6
