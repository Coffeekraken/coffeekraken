const __sass = require('sass');
const __globImporter = require('sass-glob-importer');
const __Bundler = require("scss-bundle").Bundler;
const __fs = require('fs');
const __path = require('path');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');

/**
 * @name                            sass
 * @namespace                       webpack.coffeeLoader.processors.css
 * @type                            Function
 *
 * Execute the sass compiler on the source
 *
 * @param            {Object}             resource        The resource file object to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to babel package
 * @param             {Object}            api             The CoffeeBuilderApi instance to interact with the system
 * @return            {Promise}                           The promise that will be resolved with the processed source code
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function sassProcessor(resource, source, settings = {}, api) {
  return new Promise(async (resolve, reject) => {

    const projectDirectory = process.cwd();
    const bundler = new __Bundler(undefined, projectDirectory);

    const result = await bundler.bundle(resource.filepath);
    __fs.writeFileSync(`${__tmpDir()}/_coffeekrakenCoffeeLoader.scss`, result.bundledContent);

    source = __sass.renderSync(__deepMerge({
      file: `${__tmpDir()}/_coffeekrakenCoffeeLoader.scss`,
      sourceMap: true,
      includePaths: [__path.resolve(process.cwd(), 'node_modules')],
      // importer: __globImporter()
    }, settings));

    // resolve the processor
    resolve({
      source: source.css,
      map: source.map,
      extension: 'css'
    });

  });
}
