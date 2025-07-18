/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: 'es5',
  tabWidth: 4,
  useTabs: true,
  semi: false,
  singleQuote: true,
  requirePragma: false, // Only format files with a special comment if set to true
  proseWrap: 'preserve', // Preserve markdown text wrapping
};

export default config;