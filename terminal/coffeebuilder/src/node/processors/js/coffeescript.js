const __coffeescript = require('coffeescript');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __loaderUtils = require('loader-utils');


/**
 * @name                            coffeescript
 * @namespace                       webpack.coffeeLoader.processors.image
 * @type                            Function
 *
 * Execute the imagemin coffeescript on the source
 *
 * @param            {String}             filepath        The path of the file to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to coffeescript compiler
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function coffeescriptProcessor(filepath, source, settings = {}) {
  return new Promise(async (resolve, reject) => {

    const result = __coffeescript.compile(source.toString('utf8'), __deepMerge({
			// filename: filepath,
			sourceMap: true
    }, settings));

    source = result;

    console.log('sss', source);

    // resolve the processor
    resolve({
      source: source.js,
      map: source.sourceMap,
      extension: 'js'
    });

  });
}
