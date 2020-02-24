const __imagemin = require('imagemin');
const __imagemin_pngquant = require('imagemin-pngquant');

/**
 * @name                            pngquant
 * @namespace                       webpack.coffeeLoader.processors.image
 * @type                            Function
 *
 * Execute the imagemin pngquant on the source
 *
 * @param            {String}             filepath        The path of the file to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to imagemin pngquant package
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function pngquantProcessor(filepath, source, settings = {}) {
  return new Promise(async (resolve, reject) => {

    // process the quality option if needed
    if (typeof settings.quality === 'number') {
      settings.quality = [1 / 100 * settings.quality, 1 / 100 * settings.quality]
    }

    source = await __imagemin([filepath], {
      plugins: [__imagemin_pngquant(settings)]
    });

    // resolve the processor
    resolve({
      source: source[0].data,
      map: null
    });

  });
}
