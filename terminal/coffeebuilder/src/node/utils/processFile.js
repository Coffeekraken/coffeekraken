if (process.env.NODE_ENV != 'production') require('module-alias/register');

const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __fs = require('fs');
const __path = require('path');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');

const __coffeeEvents = require('../events');
const __settings = require('../settings');

const __saveFile = require('./saveFile');
const __cacheFile = require('./cacheFile');
const __getCachedFile = require('./getCachedFile');

module.exports = function processFile(source, filepath, loaderInstance = null) {

  return new Promise(async (resolve, reject) => {

    let map = null;

    __coffeeEvents.emit('build', {
      files: Object.values(loaderInstance._compiler.options.entry)
    });

    const _extension = __getExtension(filepath);
    let _saveExtension = _extension;

    let processorsSortedAndFilteredObj = __sortObj(__settings.processors, (a, b) => {
      return b.weight - a.weight;
    });
    processorsSortedAndFilteredObj = __filterObj(processorsSortedAndFilteredObj, (item) => {
      return item !== false && item.extensions.indexOf(_extension) !== -1;
    });
    const processorsKeys = Object.keys(processorsSortedAndFilteredObj);

    const cachedContent = await __getCachedFile(filepath);

    for (let i=0; i<processorsKeys.length; i++) {

      const processorObj = processorsSortedAndFilteredObj[processorsKeys[i]];

      if ( ! cachedContent) {
        const result = await processorObj.processor(filepath, source, processorObj.settings);
        source = result.source || result;
        map = result.map || null;
        if (result.extension) _saveExtension = result.extension;
      }

      __coffeeEvents.emit('build', {
        filepath: filepath,
        processor: processorsKeys[i]
      });

    }

    if (_saveExtension === 'js') {
      if ( ! cachedContent) {
        // check if is a js file so that we let webpack handle his saving phase...
        await __cacheFile(filepath, source);
      }
      return resolve(cachedContent || source);
    }

    // save the file
    if (processorsKeys.length) {
      await __saveFile(cachedContent || source, filepath, _saveExtension, map, loaderInstance);
    }

    // resolve
    resolve('');

  });

}
