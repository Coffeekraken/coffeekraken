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
 * @param            {Object}             resource        The resource file object to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to coffeescript compiler
 * @param             {Object}            api             The CoffeeBuilderApi instance to interact with the system
 * @return            {Promise}                           The promise that will be resolved with the processed source code
 * 
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function coffeescriptProcessor(resource, source, settings = {}, api) {
  return new Promise(async (resolve, reject) => {

    const result = __coffeescript.compile(source.toString('utf8'), __deepMerge({
      // filename: filepath,
      sourceMap: true
    }, settings));

    source = result;

    // resolve the processor
    resolve({
      source: source.js,
      map: source.v3SourceMap,
      extension: 'js'
    });

  });
}
