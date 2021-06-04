module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 4,
  svelteSortOrder: 'options-styles-scripts-markup',
  svelteStrictMode: true,
  svelteBracketNewLine: true,
  svelteAllowShorthand: true,
  svelteIndentScriptAndStyle: true,
  overrides: [
    {
      files: ['*.riot'],
      options: {
        parser: 'html'
      }
    }
  ]
};
