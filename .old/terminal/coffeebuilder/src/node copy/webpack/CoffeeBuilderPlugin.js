module.exports = class CoffeeBuilderPlugin {

  constructor(settings) {
    this._settings = settings;
  }

  apply(compiler) {
    compiler.hooks.failed.tap('CoffeeBuilderPlugin', async (e) => {
      CoffeeBuilder.events.emit('compilationFailed', e);
      CoffeeBuilder._api._runPlugins('failed');
    });
  }
}
