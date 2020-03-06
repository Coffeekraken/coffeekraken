const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');

const __api = require('../classes/CoffeeBuilderApi');
const __coffeeEvents = require('../events');
const __stats = require('../stats');

module.exports = class CoffeeBuilderPlugin {

  constructor(settings) {
    this._settings = settings;
  }

  apply(compiler) {
    compiler.hooks.failed.tap('CoffeeBuilderPlugin', async () => {
      __api._runPlugins('failed');
    });
  }
}
