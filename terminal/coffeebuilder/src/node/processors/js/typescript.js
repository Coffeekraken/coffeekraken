const __typescript = require('typescript');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');

/**
 * @name                            typescript
 * @namespace                       webpack.coffeeLoader.processors.image
 * @type                            Function
 *
 * Execute the imagemin typescript on the source
 *
 * @param            {String}             filepath        The path of the file to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to typescript compiler
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function typescriptProcessor(filepath, source, settings = {}) {
  return new Promise(async (resolve, reject) => {

    const result = __typescript.transpileModule(source.toString(), __deepMerge({
      compilerOptions: {
        module: __typescript.ModuleKind.CommonJS,
        // inlineSourceMap: true
      }
    }, settings));
    source = result.outputText;

    // resolve the processor
    resolve({
      source: source,
      extension: 'js'
    });

  });
}
