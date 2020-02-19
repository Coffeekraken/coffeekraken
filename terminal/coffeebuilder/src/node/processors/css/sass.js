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
 * @param            {String}             filepath        The path of the file to process
 * @param            {String}             source          The source code to process
 * @param            {Object}             [settings={}]   The settings to pass to babel package
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function sassProcessor(filepath, source, settings = {}) {
  return new Promise(async (resolve, reject) => {

    const projectDirectory = process.cwd();
    const bundler = new __Bundler(undefined, projectDirectory);

    const result = await bundler.bundle(filepath);
    __fs.writeFileSync(`${__tmpDir()}/_coffeekrakenCoffeeLoader.scss`, result.bundledContent);

    source = __sass.renderSync(__deepMerge({
      file: `${__tmpDir()}/_coffeekrakenCoffeeLoader.scss`,
      includePaths: [__path.resolve(process.cwd(), 'node_modules')],
      // importer: __globImporter()
    }, settings)).css;

    // resolve the processor
    resolve({
      source: source,
      extension: 'css'
    });

  });
}
