const __path = require('path');
const __fs = require('fs');
const __processFile = require('../processFile');
const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');

const __coffeeEvents = require('../events');

class CoffeeBuilderPlugin {

  constructor() {
    this._settings = require('../settings');
  }

  apply(compiler) {
    compiler.hooks.done.tap('CoffeeBuilderPlugin', async stats => {

      const postProcessedFiles = [];

      __coffeeEvents.emit('postBuild', {
        files: Object.keys(stats.compilation.assets)
      });

      // loop on all the compiled assets
      const assetsKeys = Object.keys(stats.compilation.assets);
      for (let i=0; i<assetsKeys.length; i++) {

        const assetObj = stats.compilation.assets[assetsKeys[i]];

        const extension = __getExtension(assetObj.existsAt);
        let saveExtension = extension;
        let source = __fs.readFileSync(assetObj.existsAt, 'utf8');
        // console.log(assetObj.existsAt, source);

        let processorsSortedAndFilteredObj = __sortObj(this._settings.postProcessors, (a, b) => {
          return b.weight - a.weight;
        });
        processorsSortedAndFilteredObj = __filterObj(processorsSortedAndFilteredObj, (item) => {
          return item !== false && item.extensions.indexOf(extension) !== -1;
        });

        const processorsKeys = Object.keys(processorsSortedAndFilteredObj);

        if (processorsKeys.length) {

          for (let i=0; i<processorsKeys.length; i++) {

            const processorObj = processorsSortedAndFilteredObj[processorsKeys[i]];

            const result = await processorObj.processor(assetObj.existsAt, source, processorObj.settings);

            source = result.source || result;
            if (result.extension) saveExtension = result.extension;

            __coffeeEvents.emit('postBuild', {
              filepath: assetObj.existsAt,
              processor: processorsKeys[i]
            });

          }

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
