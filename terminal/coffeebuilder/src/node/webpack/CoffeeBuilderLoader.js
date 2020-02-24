if (process.env.NODE_ENV != 'production') require('module-alias/register');

const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __loaderUtils = require('loader-utils');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');

const __coffeeEvents = require('../events');
const __processFile = require('../utils/processFile');

module.exports.raw = true;
module.exports = function coffeeLoader(source) {

  this.cacheable(false);

  const _callback = this.async();

  __processFile(source, this.resource, this).then((src) => {
    _callback(null, src);
  });


}
