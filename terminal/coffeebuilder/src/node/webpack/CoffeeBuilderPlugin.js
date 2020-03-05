const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');

const __api = require('../classes/CoffeeBuilderApi');
const __coffeeEvents = require('../events');
const __stats = require('../stats');

module.exports = class CoffeeBuilderPlugin {

  constructor(settings) {
    this._settings = settings;
  }

  async _runPlugins(when = 'after') {

    for (let i = 0; i < Object.keys(this._settings.plugins).length; i++) {
      const pluginObj = this._settings.plugins[Object.keys(this._settings.plugins)[i]];
      if (pluginObj.plugin[when]) {
        await pluginObj.plugin[when](__stats, this._settings.plugins[Object.keys(this._settings.plugins)[i]].settings, __api);
      }
    }

  }

  apply(compiler) {

    compiler.hooks.entryOption.tap('CoffeeBuilderPlugin', async () => {
      this._runPlugins('start');
    });

    compiler.hooks.beforeRun.tap('CoffeeBuilderPlugin', async () => {
      this._runPlugins('before');
    });

    compiler.hooks.assetEmitted.tap('CoffeeBuilderPlugin', async () => {
      this._runPlugins('after');
    });

    compiler.hooks.done.tap('CoffeeBuilderPlugin', async () => {
      this._runPlugins('end');
    });

    compiler.hooks.failed.tap('CoffeeBuilderPlugin', async () => {
      this._runPlugins('failed');
    });


  }
}
