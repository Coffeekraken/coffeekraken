const __imagemin = require('imagemin');
const __imagemin_gifsicle = require('imagemin-gifsicle');

/**
 * @name                            gifsicle
 * @namespace                       webpack.coffeeLoader.processors.image
 * @type                            Function
 *
 * Execute the imagemin gifsicle on the source
 *
 * @param            {String}             filepath        The path of the file to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to imagemin gifsicle package
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function gifsicleProcessor(filepath, source, settings = {}) {
  return new Promise(async (resolve, reject) => {

    // process the quality option if needed
    if (typeof settings.quality === 'number') {
      settings.optimizationLevel = Math.round(3 / 100 * settings.quality);
    }

    source = await __imagemin([filepath], {
      plugins: [__imagemin_gifsicle(settings)]
    });

    // resolve the processor
    resolve(source[0].data);

  });
}
