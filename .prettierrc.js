module.exports = {
  semi: true,
  tabWidth: 4,
  trailingComma: 'all',
  singleQuote: true,
  endOfLine: 'lf',
  overrides: [
    {
      files: ['*.riot'],
      options: {
        parser: 'html',
      },
    },
  ],
};
