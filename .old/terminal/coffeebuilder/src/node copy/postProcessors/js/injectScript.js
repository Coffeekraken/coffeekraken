const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');

/**
 * @name                            injectScript
 * @namespace                       webpack.coffeeLoader.postProcessors.js
 * @type                            Function
 *
 * Take the injected script injected using the "api.injectScript" method and actualy inject them inside the proper resource
 *
 * @param            {Object}             resource        The resource file object to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to babel package
 * @param             {Object}            api             The CoffeeBuilderApi instance to interact with the system
 * @return            {Promise}                           The promise that will be resolved with the processed source code
 * 
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function injectScriptPostProcessor(resource, source, settings = {}, api) {
  return new Promise((resolve, reject) => {

    const out = resource.outputFilePathes;

    console.log(resource.filepath);
    console.log(out);
    process.exit();


    // loop on all the output file pathes
    resource.outputFilePathes.forEach(outputFilePath => {



    });

    // console.log(api.getInjectedScripts());

    // resolve the processor
    resolve({
      source: source,
      map: null
    });

  });
}
