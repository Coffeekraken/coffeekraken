/* eslint-disable */
const __deepMerge = require('../../shared/object/deepMerge').default;
const __tsconfig = require('./tsconfig');
const __sugarConfig = require('../../shared/config/sugar').default;
const __packageRoot = require('../../node/path/packageRoot').default;

module.exports = __deepMerge(__tsconfig, {
  _include: [
    `${__packageRoot()}/packages/*/*/src/shared/**/*.ts`,
    `${__sugarConfig('storage.srcDir')}/shared/**/*.ts`
  ],
  compilerOptions: {
    target: 'es6',
    module: 'umd',
    moduleResolution: 'node'
  }
});
