if (process.env.NODE_ENV != 'production') require('module-alias/register');

const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');

module.exports = function processFile(resource, loaderInstance = null) {

  return new Promise(async (resolve, reject) => {

    let processorsSortedAndFilteredObj = __sortObj(CoffeeBuilder.config.current.processors, (a, b) => {
      return b.weight - a.weight;
    });
    processorsSortedAndFilteredObj = __filterObj(processorsSortedAndFilteredObj, (item) => {
      return item !== false && item.extensions.indexOf(resource.extension) !== -1;
    });
    const processorsKeys = Object.keys(processorsSortedAndFilteredObj);

    for (let i = 0; i < processorsKeys.length; i++) {

      const processorObj = processorsSortedAndFilteredObj[processorsKeys[i]];

      if (!resource.isFromCache() || !processorObj.cache) {
        const result = await processorObj.processor(resource, resource.data, processorObj.settings, CoffeeBuilder.api);
        resource.data = result.source || result;
        resource.map = result.map || null;
        if (result.extension) resource.saveExtension = result.extension;
      } else {
        CoffeeBuilder.events.emit('fromCache', {
          resource: resource
        });
      }

      CoffeeBuilder.events.emit('build', {
        resource,
        processor: processorsKeys[i]
      });

    }

    if (resource.saveExtension === 'js') {
      resource.save();
      return resolve(resource.data);
    }

    // save the file
    if (processorsKeys.length) {
      resource.save(loaderInstance);
    }

    // resolve
    resolve('');

  });

}
