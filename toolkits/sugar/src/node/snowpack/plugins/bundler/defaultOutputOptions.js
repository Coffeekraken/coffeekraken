const __path = require('path');
const __terser = require('rollup-plugin-terser').terser;

module.exports = function defaultOutputOptions(buildDirectory) {
  return [
    {
      format: 'iife',
      plugins: [],
      compact: false,
      sourcemap: true,
      file: '[name].js'
      // dir: buildDirectory
    },
    {
      format: 'iife',
      plugins: [__terser()],
      compact: true,
      sourcemap: true,
      file: '[name].min.js'
      // dir: buildDirectory
    }
  ];
};
