if (process.env.NODE_ENV != 'production') require('module-alias/register');

const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __fs = require('fs');
const __path = require('path');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');

const __coffeeEvents = require('./events');
const __settings = require('./settings');

module.exports = function processFile(source, filepath, loaderInstance = null) {

  return new Promise(async (resolve, reject) => {

    __coffeeEvents.emit('build', {
      files: Object.values(loaderInstance._compiler.options.entry)
    });

    const _extension = __getExtension(filepath);
    let _saveExtension = _extension;
    const settings = require(__dirname + '/settings');

    let processorsSortedAndFilteredObj = __sortObj(__settings.processors, (a, b) => {
      return b.weight - a.weight;
    });
    processorsSortedAndFilteredObj = __filterObj(processorsSortedAndFilteredObj, (item) => {
      return item !== false && item.extensions.indexOf(_extension) !== -1;
    });

    // console.log(processorsSortedAndFilteredObj, filepath);

    const processorsKeys = Object.keys(processorsSortedAndFilteredObj);
    for (let i=0; i<processorsKeys.length; i++) {

      const processorObj = processorsSortedAndFilteredObj[processorsKeys[i]];

      const result = await processorObj.processor(filepath, source, processorObj.settings);

      source = result.source || result;

      if (result.extension) _saveExtension = result.extension;

      __coffeeEvents.emit('build', {
        filepath: filepath,
        processor: processorsKeys[i]
      });

    }

    // check if is a js file so that we let webpack handle his saving phase...
    if (_saveExtension === 'js') {
      return resolve(source);
    }

    let buildScopes = {};
    Object.keys(settings.files).forEach((key, i) => {
      const opts = settings.files[key];

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
            if (outputFilePath.slice(0,2) === '//') outputFilePath = outputFilePath.slice(2);
            if (outputFilePath.slice(0,1) === '/') outputFilePath = outputFilePath.slice(1);
            outputFilePath = outputFilePath.replace(`.${_extension}`,`.${_saveExtension}`);
          });

          if (loaderInstance) {
            loaderInstance.emitFile(outputFolderPath + '/' + outputFilePath, source);
          } else {
            __writeFileSync(process.cwd() + '/' + outputFolderPath + '/' + outputFilePath, source);
          }

        });
      });
    });

    resolve('');

  });

}
