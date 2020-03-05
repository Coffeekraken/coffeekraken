const __imagemin = require('imagemin');
const __imagemin_svgo = require('imagemin-svgo');

/**
 * @name                            svgo
 * @namespace                       webpack.coffeeLoader.processors.image
 * @type                            Function
 *
 * Execute the imagemin svgo on the source
 *
 * @param            {Object}             resource        The resource file object to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to imagemin svgo package
 * @param             {Object}            api             The CoffeeBuilderApi instance to interact with the system
 * @return            {Promise}                           The promise that will be resolved with the processed source code
 * 
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function svgoProcessor(resource, source, settings = {}, api) {
  return new Promise(async (resolve, reject) => {

    source = await __imagemin([resource.filepath], {
      plugins: [__imagemin_svgo(settings)]
    });

    // resolve the processor
    resolve({
      source: source[0].data,
      map: null
    });

  });
}
