/* eslint-disable */
const __deepMerge = require('@coffeekraken/sugar/shared/object/deepMerge')
  .default;
const __tsconfig = require('./tsconfig');
const __sugarConfig = require('@coffeekraken/s-sugar-config').default;
const __packageRoot = require('@coffeekraken/sugar/node/path/packageRoot')
  .default;

module.exports = __deepMerge(__tsconfig, {
  _include: [
    `${__packageRoot()}/packages/*/*/src/shared/**/*.ts`,
    `${__sugarConfig('storage.srcDir')}/shared/**/*.ts`
  ],
  compilerOptions: {
    target: 'es6',
    module: 'CommonJS',
    moduleResolution: 'node'
  },
  sTsCompiler: {
    outExt: 'cjs'
  }
});
