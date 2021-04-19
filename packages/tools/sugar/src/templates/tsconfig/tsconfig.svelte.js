/* eslint-disable */
const __deepMerge = require('../../shared/object/deepMerge').default;
const __tsconfig = require('./tsconfig');
const __sugarConfig = require('@coffeekraken/s-sugar-config').default;
const __packageRoot = require('../../node/path/packageRoot').default;

module.exports = __deepMerge(__tsconfig, {
  compilerOptions: {
    target: 'es5',
    module: 'umd',
    moduleResolution: 'node'
  }
});
