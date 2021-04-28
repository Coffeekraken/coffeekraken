/* eslint-disable */
const __deepMerge = require('@coffeekraken/sugar/shared/object/deepMerge')
  .default;
const __tsconfig = require('./tsconfig');
const __sugarConfig = require('@coffeekraken/s-sugar-config').default;
const __packageRoot = require('@coffeekraken/sugar/node/path/packageRoot')
  .default;

let jsInput = __sugarConfig('js.compile.input');
if (!Array.isArray(jsInput)) jsInput = [jsInput];
jsInput = jsInput.map((l) => l.replace(/\.js$/, '.ts'));

module.exports = __deepMerge(__tsconfig, {
  _include: [`${__packageRoot()}/packages/*/*/src/js/**/*.ts`, ...jsInput],
  compilerOptions: {
    target: 'es6',
    module: 'umd',
    moduleResolution: 'node'
  }
});
