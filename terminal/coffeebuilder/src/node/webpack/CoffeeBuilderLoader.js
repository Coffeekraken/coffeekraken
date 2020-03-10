if (process.env.NODE_ENV != 'production') require('module-alias/register');

const __stats = require('../stats');
const __coffeeEvents = require('../events');
const __processFile = require('../utils/processFile');
const __CoffeeBuilderResource = require('../classes/CoffeeBuilderResource');

module.exports.raw = true;
module.exports = function coffeeLoader(source) {
  this.cacheable(false);

  const _callback = this.async();

  let resource;
  if (!__stats.resources[this.resource]) {
    resource = new __CoffeeBuilderResource(this.resource);
    __coffeeEvents.emit('resource', resource);
  } else {
    resource = __stats.resources[this.resource];
  }

  __processFile(resource, this).then((src) => {
    _callback(null, src);
  });


}
