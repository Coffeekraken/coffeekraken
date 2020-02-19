if (process.env.NODE_ENV != 'production') require('module-alias/register');

const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __fs = require('fs');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');
const __coffeeEvents = require('./events');
const __settings = require('./settings');

let _processedResources = [];
let _processedResourcesPercentage = 0;
let _usedProcessors = {};

let printInterval;

__coffeeEvents.on('reset', () => {
  _processedResources = [];
  _processedResourcesPercentage = 0;
  _usedProcessors = {};
});

module.exports = function processFile(source, filepath) {

  return new Promise(async (resolve, reject) => {

    const _extension = __getExtension(filepath);
    let _saveExtension = _extension;
    const settings = require(__dirname + '/settings');

    // track how many precessors are used and how many files have been processed
    Object.keys(__settings.processors).forEach((processorName) => {
      const processorObj = __settings.processors[processorName];
      if (processorObj.extensions.indexOf(_extension) != -1) {
        if ( ! _usedProcessors[processorName]) {
          _usedProcessors[processorName] = {
            files: 0
          };
        }
      }
    });


    // const stats = __fs.statSync(_resource);
    // const mimeTime = stats.mtime;

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

      _usedProcessors[processorsKeys[i]].files++;

      __coffeeEvents.emit('data', {
        percentage: _processedResourcesPercentage,
        resource: filepath,
        processor: processorsSortedAndFilteredObj[processorsKeys[i]],
        processedResources: _processedResources,
        usedProcessors: _usedProcessors
      });

    }

    _processedResources.push(filepath);

    // let processedResourcesCount = 0;
    // Object.keys(_this._compiler.options.entry).forEach((r) => {
    //   const sourcePath = _this._compiler.options.entry[r];
    //   if (_processedResources.indexOf(sourcePath) != -1) {
    //     processedResourcesCount++;
    //   }
    // });
    // _processedResourcesPercentage = 100 / Object.keys(_this._compiler.options.entry).length * processedResourcesCount;


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

          // __writeFileSync(process.cwd() + '/' + outputFolderPath + '/' + outputFilePath, source);
          // this.emitFile(process.cwd() + '/' + outputFolderPath + '/' + outputFilePath, source);

        });
      });
    });

    resolve(null);

  });

}
