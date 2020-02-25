const __path = require('path');
const __fs = require('fs');
const __processFile = require('../utils/processFile');
const __saveFile = require('../utils/saveFile');
const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __getCachedFile = require('../utils/getCachedFile');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __emitSaveProcessedStat = require('../utils/emitSaveProcessedStat');

const __coffeeEvents = require('../events');

class CoffeeBuilderPlugin {

  constructor() {
    this._settings = require('../settings');
  }

  apply(compiler) {

    compiler.hooks.done.tap('CoffeeBuilderPlugin', async stats => {

      const postProcessedFiles = [];

      const files = Object.keys(stats.compilation.assets).filter((f) => {
        return f.slice(-4) !== '.map' && ! f.includes(__tmpDir());
      })

      __coffeeEvents.emit('postBuild', {
        files
      });

      // loop on all the compiled assets
      const assetsKeys = files;

      for (let i=0; i<assetsKeys.length; i++) {

        const assetObj = stats.compilation.assets[assetsKeys[i]];
        const resourcePath = assetObj.existsAt;

        const extension = __getExtension(resourcePath);
        let saveExtension = extension;

        const cachedContent = await __getCachedFile(resourcePath);
        if (cachedContent) {
          console.log('CACHEC', resourcePath, saveExtension);
          __emitSaveProcessedStat(resourcePath, saveExtension, 'savePostProcessed');
          await __saveFile(cachedContent.source, resourcePath, saveExtension, cachedContent.map);
          continue;
        }

        let source = __fs.readFileSync(resourcePath, 'utf8');

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

            const result = await processorObj.processor(resourcePath, source, processorObj.settings);

            source = result.source || result;
            map = result.map || null;
            if (result.extension) saveExtension = result.extension;

            __coffeeEvents.emit('postBuild', {
              filepath: resourcePath,
              processor: processorsKeys[i]
            });

          }

          // save the file
          __saveFile(source, resourcePath, saveExtension, map);

          __emitSaveProcessedStat(resourcePath, saveExtension, 'savePostProcessed');

        } else {
          __coffeeEvents.emit('postBuild', {
            filepath: resourcePath,
            processor: null
          });
        }
      }

    });
  }
}

module.exports = CoffeeBuilderPlugin;
