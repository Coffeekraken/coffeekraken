const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __settings = require('../settings');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');

/**
 * @name                                      getOutputFilePath
 * @namespace                                 terminal.coffeebuilder.node.utils
 * @type                                      Function
 *
 * Return the array of output file path depending on the filepath passed as parameter
 *
 * @param           {String}                filepath                The file path to process
 * @param           {String}                saveExtension           The extension under which to save the file
 * @return          {Array}                                         The output file pathes for this particular path
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function getOutputFilePath(filepath, saveExtension) {

  const results = [];

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

        // append the output file path to the results
        results.push(`${outputFolderPath}/${outputFilePath}`);

      });
    });
  });

  // return the output file paths
  return results;

}
