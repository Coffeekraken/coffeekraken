const __api = require('../classes/CoffeeBuilderApi');

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
