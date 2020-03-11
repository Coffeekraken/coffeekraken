if (process.env.NODE_ENV != 'production') require('module-alias/register');

const __stats = require('../stats');
const __coffeeEvents = require('../events');
const __processFile = require('../utils/processFile');
const __CoffeeBuilderResource = require('../classes/CoffeeBuilderResource');
const __coffeeBuilderApi = require('../classes/CoffeeBuilderApi');
const __globToRegExp = require('glob-to-regexp');

module.exports.raw = true;
module.exports = function coffeeLoader(source) {
  this.cacheable(false);

  const _callback = this.async();

  const exclude = __coffeeBuilderApi.config.exclude;
  for (let i = 0; i < exclude.length; i++) {
    if (__globToRegExp(exclude[i]).test(this.resource)) {
      return _callback(null, source);
    }
  }

  let resource;
  if (!__stats.getValue(`resources.${this.resource}`)) {
    resource = new __CoffeeBuilderResource(this.resource);
    __coffeeEvents.emit('resource', resource);
  } else {
    resource = __stats.getValue(`resources.${this.resource}`);
  }

  __processFile(resource, this).then((src) => {
    _callback(null, src);
  });


}
