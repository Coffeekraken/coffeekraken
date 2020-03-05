const __terser = require("terser");

/**
 * @name                                terser
 * @namespace                           coffeebuilder.node.postProcessors.js
 * @type                                Function
 *
 * Apply the terser package on the passed javascript source code to optimize it.
 *
 * @param            {Object}             resource        The resource file object to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to terser package
 * @param             {Object}            api             The CoffeeBuilderApi instance to interact with the system
 * @return            {Promise}                           The promise that will be resolved with the processed source code
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function terserPostProcessor(resource, source, settings = {}, api) {
  return new Promise((resolve, reject) => {

    if (typeof source !== 'string') {
      source = source.toString('utf8');
    }

    const result = __terser.minify(source, {
      sourceMap: true,
      ...settings
    });

    resolve({
      source: result.code,
      map: result.map
    });

  });

}
