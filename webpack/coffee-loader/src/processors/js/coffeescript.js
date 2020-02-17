const __coffeescript = require('coffeescript');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');

/**
 * @name                            coffeescript
 * @namespace                       webpack.coffeeLoader.processors.image
 * @type                            Function
 *
 * Execute the imagemin coffeescript on the source
 *
 * @param            {String}             filepath        The path of the file to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to babel package
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function coffeescriptProcessor(filepath, source, settings = {}) {
  return new Promise(async (resolve, reject) => {

    // console.log('COFFEE');

    const result = __coffeescript.compile(source.toString(), __deepMerge({
    }, settings));
    source = result;

    // console.log(result);

    // resolve the processor
    resolve({
      source: source,
      extension: 'js'
    });

  });
}
