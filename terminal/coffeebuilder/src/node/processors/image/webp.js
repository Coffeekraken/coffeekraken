const __imagemin = require('imagemin');
const __imagemin_webp = require('imagemin-webp');

/**
 * @name                            webp
 * @namespace                       webpack.coffeeLoader.processors.image
 * @type                            Function
 *
 * Execute the imagemin webp on the source
 *
 * @param            {String}             filepath        The path of the file to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to imagemin webp package
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function webpProcessor(filepath, source, settings = {}) {
  return new Promise(async (resolve, reject) => {

    source = await __imagemin([filepath], {
      plugins: [__imagemin_webp(settings)]
    });

    // resolve the processor
    resolve({
      source: source[0].data,
      map: null
    });

  });
}
