const __babel = require("@babel/core");
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');

/**
 * @name                            babel
 * @namespace                       webpack.coffeeLoader.processors.js
 * @type                            Function
 *
 * Execute the babel package on the javascript source.
 * This processor has built-in the @babel/env preset as well as some usefull plugins:
 * - add-module-exports
 * - transform-dynamic-import-default
 * - @babel/plugin-proposal-class-properties
 * - @babel/plugin-proposal-export-default-from
 *
 * @param            {Object}             resource        The resource file object to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to babel package
 * @param             {Object}            api             The CoffeeBuilderApi instance to interact with the system
 * @return            {Promise}                           The promise that will be resolved with the processed source code
 * 
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function babelProcessor(resource, source, settings = {}, api) {
  return new Promise((resolve, reject) => {

    // transform the code using babel
    const babelResult = __babel.transform(source, {
      inputSourceMap: true,
      sourceMaps: true,
      ...settings
    });

    // resolve the processor
    resolve({
      source: babelResult.code,
      map: babelResult.map
    });

  });
}
