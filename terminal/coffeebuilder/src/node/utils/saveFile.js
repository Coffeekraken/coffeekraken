const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');
const __settings = require('../settings');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __cacheFile = require('./cacheFile');
const __coffeeEvents = require('../events');
const __getOutputFilePath = require('./getOutputFilePath');

/**
 * @name                        saveFile
 * @namespace                   terminal.coffeebuilder.utils
 * @type                        Function
 *
 * Save the passed file depending on the differents scopes and output folders setted in the config
 *
 * @param               {String}              source            The file source code to save
 * @param               {String}              filepath          The source file path
 * @param               {String}              saveExtension     The extension under which to save the file
 * @param               {String}              [map=null]        The source map for the file to save
 * @param               {CoffeeBuilderLoader} [loaderInstance=null]     The loader instance if available
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function saveFile(source, filepath, saveExtension, map = null, loaderInstance = null) {

  // cache the file
  await __cacheFile(filepath, source, saveExtension);

  // get the output file path
  const outputFilePath = __getOutputFilePath(filepath, saveExtension);

  // loop on all the output file pathes
  outputFilePath.forEach((output) => {

    if (loaderInstance) {
      loaderInstance.emitFile(output, source);
    } else {
      __writeFileSync(process.cwd() + '/' + output, source);
    }

    if (map) {
      __writeFileSync(process.cwd() + '/' + output + '.map', map);
    }

  });
}
