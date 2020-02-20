const __imagemin = require('imagemin');
const __imagemin_svgo = require('imagemin-svgo');

/**
 * @name                            svgo
 * @namespace                       webpack.coffeeLoader.processors.image
 * @type                            Function
 *
 * Execute the imagemin svgo on the source
 *
 * @param            {String}             filepath        The path of the file to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to imagemin svgo package
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function svgoProcessor(filepath, source, settings = {}) {
  return new Promise(async (resolve, reject) => {

    source = await __imagemin([filepath], {
      plugins: [__imagemin_svgo(settings)]
    });

    // resolve the processor
    resolve(source[0].data);

  });
}
