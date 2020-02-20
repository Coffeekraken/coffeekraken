const __terser = require("terser");

/**
 * @name                                terser
 * @namespace                           coffeebuilder.node.postProcessors.js
 * @type                                Function
 *
 * Apply the terser package on the passed javascript source code to optimize it.
 *
 * @param            {String}             filepath        The path of the file to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to terser package
 * @return            {Promise}                           The promise that will be resolved with the processed source code
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function terserPostProcessor(filepath, source, settings = {}) {
  return new Promise((resolve, reject) => {

    const result = __terser.minify(source, {
      sourceMap: {
          filename: "out.js",
          url: "out.js.map"
      },
      ...settings
    });

    // console.log(result);

    resolve(result);

  });

}
