const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const postcsseasings = require('postcss-easings');
const importUrl = require('postcss-import-url');
const __path = require('path');

module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('@csstools/postcss-sass')({
      includePaths: [__path.resolve(__dirname, 'node_modules')]
    }),
    importUrl(),
    postcssImport({
      path: 'src/scss'
    }),
    postcsseasings(),
    postcssPresetEnv({
      stage: 0
    })
  ]
};
