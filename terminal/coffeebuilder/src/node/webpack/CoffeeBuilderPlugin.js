const __path = require('path');
const __fs = require('fs');
const __processFile = require('../utils/processFile');
const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');

const __coffeeEvents = require('../events');
const __stats = require('../stats');

class CoffeeBuilderPlugin {

  constructor() {
    this._settings = require('../settings');
  }

  apply(compiler) {

    compiler.hooks.done.tap('CoffeeBuilderPlugin', async stats => {

      // loop on all the compiled assets
      const assetsKeys = Object.keys(__stats.savedResources);

      for (let i = 0; i < assetsKeys.length; i++) {

        const resourceObj = __stats.savedResources[assetsKeys[i]];

        // if (resourceObj.isCached()) {
        //   console.log('CACHECD', resourceObj);
        //   __coffeeEvents.emit('saveProcessed', resourceObj);
        //   resourceObj.save();
        //   continue;
        // }
        // // const cachedContent = await __getCachedFile(resourcePath);
        // // if (cachedContent) {
        // //   console.log('CACHEC', resourcePath, saveExtension);
        // //   __emitSaveProcessedStat(resourcePath, saveExtension, 'savePostProcessed');
        // //   await __saveFile(cachedContent.source, resourcePath, saveExtension, cachedContent.map);
        // //   continue;
        // // }

        let processorsSortedAndFilteredObj = __sortObj(this._settings.postProcessors, (a, b) => {
          return b.weight - a.weight;
        });
        processorsSortedAndFilteredObj = __filterObj(processorsSortedAndFilteredObj, (item) => {
          return item !== false && item.extensions.indexOf(resourceObj.extension) !== -1;
        });

        const processorsKeys = Object.keys(processorsSortedAndFilteredObj);

        if (processorsKeys.length) {

          for (let j = 0; j < processorsKeys.length; j++) {

            const processorObj = processorsSortedAndFilteredObj[processorsKeys[j]];

            const result = await processorObj.processor(resourceObj.filepath, resourceObj.data, processorObj.settings);

            resourceObj.data = result.source || result;
            resourceObj.map = result.map || null;
            if (result.extension) resourceObj.saveExtension = result.extension;

            __coffeeEvents.emit('postBuild', {
              resource: resourceObj,
              processor: processorsKeys[j]
            });

          }

          // save the file
          resourceObj.save();

        } else {
          __coffeeEvents.emit('postBuild', {
            resource: resourceObj,
            processor: null
          });
        }
      }

    });
  }
}

module.exports = CoffeeBuilderPlugin;
