const __cleanCss = require("clean-css");

/**
 * @name                                cleanCss
 * @namespace                           coffeebuilder.node.postProcessors.js
 * @type                                Function
 *
 * Apply the cleanCss package on the passed css source code to optimize it.
 *
 * @param            {Object}             resource        The resource file object to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to cleanCss package
 * @param             {Object}            api             The CoffeeBuilderApi instance to interact with the system
 * @return            {Promise}                           The promise that will be resolved with the processed source code
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function cleanCssPostProcessor(resource, source, settings = {}, api) {
  return new Promise((resolve, reject) => {

    if (typeof source !== 'string') {
      source = source.toString('utf8');
    }

    const result = new __cleanCss({
      sourceMap: true,
      compatibility: 'ie9',
      level: 2
    }).minify(source);

    resolve({
      source: result.styles,
      map: result.sourceMap.toString()
    });

  });

}
