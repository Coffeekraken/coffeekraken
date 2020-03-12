module.exports = class CoffeeBuilderPlugin {

  constructor(settings) {
    this._settings = settings;
  }

  apply(compiler) {
    compiler.hooks.failed.tap('CoffeeBuilderPlugin', async () => {
      CoffeeBuilder._api._runPlugins('failed');
    });
  }
}
