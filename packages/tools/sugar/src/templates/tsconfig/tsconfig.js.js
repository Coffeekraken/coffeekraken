/* eslint-disable */
const __deepMerge = require('../../shared/object/deepMerge').default;
const __tsconfig = require('./tsconfig');
const __sugarConfig = require('../../shared/config/sugar').default;
const __packageRoot = require('../../node/path/packageRoot').default;

let jsInput = __sugarConfig('js.compile.input');
if (!Array.isArray(jsInput))
  jsInput = [jsInput].map((l) => l.replace(/\.js$/, '.ts'));

module.exports = __deepMerge(__tsconfig, {
  _include: [`${__packageRoot()}/packages/*/*/src/js/**/*.ts`, ...jsInput],
  compilerOptions: {
    target: 'es5',
    module: 'umd',
    moduleResolution: 'node'
  }
});
