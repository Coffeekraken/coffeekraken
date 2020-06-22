const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');

module.exports = function processFile(resource) {

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
        try {
          const result = await processorObj.processor(resource, resource.data, processorObj.settings, CoffeeBuilder.api);
          resource.data = result.source || result;
          resource.map = result.map || null;
          if (result.extension) resource.saveExtension = result.extension;
        } catch (e) {
          CoffeeBuilder.stats.get('errors').push({
            package: CoffeeBuilder.api.getCurrentPackage(),
            resource,
            error: e
          });
          // throw new Error();
        }
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
      resource.save();
    }

    // resolve
    resolve('');

  });

}
