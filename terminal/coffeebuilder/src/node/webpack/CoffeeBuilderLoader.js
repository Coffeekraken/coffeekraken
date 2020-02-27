if (process.env.NODE_ENV != 'production') require('module-alias/register');

const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __loaderUtils = require('loader-utils');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');

const __stats = require('../stats');
const __coffeeEvents = require('../events');
const __processFile = require('../utils/processFile');
const __CoffeeBuilderResource = require('../classes/CoffeeBuilderResource');

module.exports.raw = true;
module.exports = function coffeeLoader(source) {

  this.cacheable(false);

  const _callback = this.async();

  let resource;
  if ( ! __stats.resources[this.resource]) {
    resource = new __CoffeeBuilderResource(this.resource);
    __coffeeEvents.emit('resource', resource);
  } else {
    resource = __stats.resources[this.resource];
  }

  // console.log(resource);

  __processFile(resource, this).then((src) => {
    _callback(null, src);
  });


}
