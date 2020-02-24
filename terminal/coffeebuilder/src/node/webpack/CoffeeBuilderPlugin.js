const __path = require('path');
const __fs = require('fs');
const __processFile = require('../utils/processFile');
const __saveFile = require('../utils/saveFile');
const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __getCachedFile = require('../utils/getCachedFile');

const __coffeeEvents = require('../events');

class CoffeeBuilderPlugin {

  constructor() {
    this._settings = require('../settings');
  }

  apply(compiler) {

    return;

    compiler.hooks.done.tap('CoffeeBuilderPlugin', async stats => {

      const postProcessedFiles = [];

      __coffeeEvents.emit('postBuild', {
        files: Object.keys(stats.compilation.assets)
      });

      // loop on all the compiled assets
      const assetsKeys = Object.keys(stats.compilation.assets);
      for (let i=0; i<assetsKeys.length; i++) {

        const assetObj = stats.compilation.assets[assetsKeys[i]];

        if (assetObj.existsAt.slice(-4) === '.map') continue;

        const extension = __getExtension(assetObj.existsAt);
        let saveExtension = extension;

        const cachedContent = await __getCachedFile(assetObj.existsAt);
        if (cachedContent) {
          await __saveFile(cachedContent.source, assetObj.existsAt, saveExtension, cachedContent.map);
          continue;
        }

        let source = __fs.readFileSync(assetObj.existsAt, 'utf8');

        let processorsSortedAndFilteredObj = __sortObj(this._settings.postProcessors, (a, b) => {
          return b.weight - a.weight;
        });
        processorsSortedAndFilteredObj = __filterObj(processorsSortedAndFilteredObj, (item) => {
          return item !== false && item.extensions.indexOf(extension) !== -1;
        });

        const processorsKeys = Object.keys(processorsSortedAndFilteredObj);

        if (processorsKeys.length) {

          let map = null;

          for (let i=0; i<processorsKeys.length; i++) {

            const processorObj = processorsSortedAndFilteredObj[processorsKeys[i]];

            const result = await processorObj.processor(assetObj.existsAt, source, processorObj.settings);

            source = result.source || result;
            map = result.map || null;
            if (result.extension) saveExtension = result.extension;

            __coffeeEvents.emit('postBuild', {
              filepath: assetObj.existsAt,
              processor: processorsKeys[i]
            });

          }

          // save the file
          __saveFile(source, assetObj.existsAt, saveExtension, map);

        } else {
          __coffeeEvents.emit('postBuild', {
            filepath: assetObj.existsAt,
            processor: null
          });
        }
      }

    });
  }
}

module.exports = CoffeeBuilderPlugin;
