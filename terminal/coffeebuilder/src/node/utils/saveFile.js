const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');
const __settings = require('../settings');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __cacheFile = require('./cacheFile');

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
  await __cacheFile(filepath, source);

  const _extension = __getExtension(filepath);
  let buildScopes = {};
  Object.keys(__settings.files).forEach((key, i) => {
    const opts = __settings.files[key];

    let outputFilePath = filepath;

    if (opts.extensions && opts.extensions.indexOf(_extension) !== -1) {
      buildScopes[key] = opts;
    } else return;

    Object.keys(buildScopes).forEach((scopeKey) => {

      const scope = buildScopes[scopeKey];

      let outputFolder = scope.outputFolder;
      if ( ! Array.isArray(outputFolder)) outputFolder = [outputFolder];

      let sourcesFolder = scope.sourcesFolder;
      if ( ! Array.isArray(sourcesFolder)) sourcesFolder = [sourcesFolder];
      if ( ! outputFolder || ! sourcesFolder) return;

      outputFolder.forEach((outputFolderPath) => {

        sourcesFolder.forEach((sourcesFolderPath) => {
          outputFilePath = outputFilePath.trim();
          outputFilePath = outputFilePath.replace(process.cwd(), '');
          outputFilePath = outputFilePath.replace(sourcesFolderPath, '');
          outputFilePath = outputFilePath.replace(outputFolderPath, '');
          if (outputFilePath.slice(0,2) === '//') outputFilePath = outputFilePath.slice(2);
          if (outputFilePath.slice(0,1) === '/') outputFilePath = outputFilePath.slice(1);
          outputFilePath = outputFilePath.replace(`.${_extension}`,`.${saveExtension}`);
        });

        if (`${outputFolderPath}/${outputFilePath}`.includes(__tmpDir())) return;

        if (loaderInstance) {
          loaderInstance.emitFile(outputFolderPath + '/' + outputFilePath, source);
        } else {
          __writeFileSync(process.cwd() + '/' + outputFolderPath + '/' + outputFilePath, source);
        }

        if (map) {
          __writeFileSync(process.cwd() + '/' + outputFolderPath + '/' + outputFilePath + '.map', map);
        }

      });
    });
  });

}
