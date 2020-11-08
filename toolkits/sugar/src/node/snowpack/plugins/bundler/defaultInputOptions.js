const __resolve = require('@rollup/plugin-node-resolve');
const __commonjs = require('@rollup/plugin-commonjs');
const __styles = require('rollup-plugin-styles');
const __url = require('@rollup/plugin-url');
const __path = require('path');

module.exports = function defaultInputOptions(buildDirectory, tmpDir) {
  return {
    // input: {
    //   index: 'dist/js/index.js'
    // },
    plugins: [
      __resolve({ browser: true }),
      __styles({
        mode: ['extract'],
        autoModules: (id) => id.includes('.module.css'),
        minimize: true,
        sourceMap: true
      }),
      __url({
        include: '**/*',
        exclude: '**/*.(js|json|css)',
        destDir: __path.resolve(tmpDir),
        sourceDir: __path.resolve(buildDirectory),
        limit: 0, // extract all files
        fileName: '[dirname]/[name]-[hash][extname]'
      }),
      __commonjs()
    ]
  };
};
