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
 * @param            {String}             filepath        The path of the file to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to babel package
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function babelProcessor(filepath, source, settings = {}) {
  return new Promise((resolve, reject) => {

    // transform the code using babel
    const babelResult = __babel.transform(source, settings);

    // resolve the processor
    resolve(babelResult.code);

  });
}
