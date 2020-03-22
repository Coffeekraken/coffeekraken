const __typescript = require('typescript');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');

/**
 * @name                            typescript
 * @namespace                       webpack.coffeeLoader.processors.image
 * @type                            Function
 *
 * Execute the imagemin typescript on the source
 *
 * @param            {Object}             resource        The resource file object to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to typescript compiler
 * @param             {Object}            api             The CoffeeBuilderApi instance to interact with the system
 * @return            {Promise}                           The promise that will be resolved with the processed source code
 * 
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function typescriptProcessor(resource, source, settings = {}, api) {
  return new Promise(async (resolve, reject) => {

    const result = __typescript.transpileModule(source.toString(), __deepMerge({
      compilerOptions: {
        module: __typescript.ModuleKind.CommonJS,
        sourceMap: true
      }
    }, settings));

    source = result.outputText;

    // resolve the processor
    resolve({
      source: source,
      map: result.sourceMapText,
      extension: 'js'
    });

  });
}
