const __deepMergeErase = require('@coffeekraken/sugar/node/object/deepMergeErase');

module.exports = {
  compile: ['js'],
  watch: true,
  resources: __deepMergeErase({
    js: {
      extensions: ['js', 'coffee', 'ts'],
      outputFolders: ['dist'],
      sourcesFolders: ['src'],
      sources: '**/*.{js,coffee,ts}',
      saveExtension: 'js'
    }
  })
};