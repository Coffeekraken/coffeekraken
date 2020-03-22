const __imagemin = require('imagemin');
const __imagemin_gifsicle = require('imagemin-gifsicle');

/**
 * @name                            gifsicle
 * @namespace                       webpack.coffeeLoader.processors.image
 * @type                            Function
 *
 * Execute the imagemin gifsicle on the source
 *
 * @param            {Object}             resource        The resource file object to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to imagemin gifsicle package
 * @param             {Object}            api             The CoffeeBuilderApi instance to interact with the system
 * @return            {Promise}                           The promise that will be resolved with the processed source code
 * 
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function gifsicleProcessor(resource, source, settings = {}, api) {
  return new Promise(async (resolve, reject) => {

    // process the quality option if needed
    if (typeof settings.quality === 'number') {
      settings.optimizationLevel = Math.round(3 / 100 * settings.quality);
    }

    source = await __imagemin([filepath], {
      plugins: [__imagemin_gifsicle(settings)]
    });

    // resolve the processor
    resolve({
      source: source[0].data,
      map: null
    });

  });
}
