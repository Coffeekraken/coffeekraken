const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __coffeeEvents = require('../events');

/**
 * @name                                postProcessors
 * @namespace                           terminal.coffeebuilder.node.plugins
 * @type                                Function
 *
 * Post processor plugin that execute all the post processors on the processed resources
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = {

  after: (stats, settings, api) => {
    return new Promise(async (resolve, reject) => {
      // loop on all the compiled assets
      const assetsKeys = Object.keys(stats.getValue('savedResources'));

      for (let i = 0; i < assetsKeys.length; i++) {

        const resource = stats.getValue(`savedResources.${assetsKeys[i]}`);

        let processorsSortedAndFilteredObj = __sortObj(api.config.postProcessors, (a, b) => {
          return b.weight - a.weight;
        });
        processorsSortedAndFilteredObj = __filterObj(processorsSortedAndFilteredObj, (item) => {
          return item !== false && item.extensions.indexOf(resource.extension) !== -1;
        });

        const processorsKeys = Object.keys(processorsSortedAndFilteredObj);

        if (processorsKeys.length) {

          for (let j = 0; j < processorsKeys.length; j++) {

            const processorObj = processorsSortedAndFilteredObj[processorsKeys[j]];

            const result = await processorObj.processor(resource, resource.data, processorObj.settings, api);

            resource.data = result.source || result;
            resource.map = result.map || null;
            if (result.extension) resource.saveExtension = result.extension;

            __coffeeEvents.emit('postBuild', {
              resource: resource,
              processor: processorsKeys[j]
            });

          }

          // save the file
          resource.save();

        } else {
          __coffeeEvents.emit('postBuild', {
            resource: resource,
            processor: null
          });
        }

      }

    });

  }

};