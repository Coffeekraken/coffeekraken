const __imagemin = require('imagemin');
const __imagemin_mozjpeg = require('imagemin-mozjpeg');

/**
 * @name                            mozjpeg
 * @namespace                       webpack.coffeeLoader.processors.image
 * @type                            Function
 *
 * Execute the imagemin mozjpeg on the source
 *
 * @param            {String}             filepath        The path of the file to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to imagemin mozjpeg package
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function imagejpegProcessor(filepath, source, settings = {}) {
  return new Promise(async (resolve, reject) => {

    source = await __imagemin([filepath], {
      plugins: [__imagemin_mozjpeg(settings)]
    });

    // resolve the processor
    resolve({
      source: source[0].data,
      map: null
    });

  });
}
