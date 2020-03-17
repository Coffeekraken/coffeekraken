const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __glob = require('glob');

/**
 * @name                            CoffeeBuilderPrivateApi
 * @namespace                       terminal.coffeebuilder.node.classes
 * @type                            Class
 * 
 * Expose some methods to interact with the coffeebuilder instance, settings, etc...
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class CoffeeBuilderPrivateApi {

  /**
   * @name            _injectScriptFilePath
   * @namespace       terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type            String
   * @private
   * 
   * Store the file path where the injected script will be injected
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _injectScriptFilePath = `${__tmpDir()}/coffeeBuilderInjectScript.js`;

  /**
   * @name                        _currentPackageName
   * @namespace                   terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                        String
   * @private
   * 
   * Store the current package name
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _currentPackageName = null;

  /**
   * @name            constructor
   * @namespace       terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type            Function
   * @constructor
   * 
   * Construct the class
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {

  }

  /**
   * @name                                getCurrentPackageName
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * 
   * Return the current package name
   * 
   * @return            {String}                      The current package name or null if is the "default" one
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getCurrentPackageName() {
    return this._currentPackageName;
  }

  /**
   * @name                                setCurrentPackageByName
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * 
   * Set the current package name
   * 
   * @param           {String}              packageName             The package name to set
   * 
   * @todo      low           Check that the passed package name exist
   * @todo      low           Emit and event
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  setCurrentPackageByName(packageName) {
    this._currentPackageName = packageName;

    let packageConfig = {};
    if (packageName && CoffeeBuilder.config.base.packages[packageName]) {
      if (__fs.existsSync(__path.resolve(process.cwd(), CoffeeBuilder.config.base.packages[packageName], 'coffeebuilder.config.js'))) {
        packageConfig = require(__path.resolve(process.cwd(), CoffeeBuilder.config.base.packages[packageName], 'coffeebuilder.config.js'));
      }
    }
    CoffeeBuilder.config.current = Object.assign({}, __deepMerge(CoffeeBuilder.config.base, packageConfig));
    delete CoffeeBuilder.config.current.packages;
  }

  /**
   * @name                                getPackagesPathes
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * 
   * Return an array of packages pathes
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getPackagesPathes() {
    return Object.values(CoffeeBuilder.config.base.packages);
  }

  /**
   * @name                                _runPlugins
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * @private
   * 
   * Run the registered plugins based on the "moment" ou want like "start", "before", etc...
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _runPlugins(when = 'after') {

    for (let i = 0; i < Object.keys(CoffeeBuilder.config.current.plugins).length; i++) {
      const pluginObj = CoffeeBuilder.config.current.plugins[Object.keys(CoffeeBuilder.config.current.plugins)[i]];
      if (pluginObj.plugin[when]) {
        await pluginObj.plugin[when](CoffeeBuilder.stats, CoffeeBuilder.config.current.plugins[Object.keys(CoffeeBuilder.config.current.plugins)[i]].settings, this);
      }
    }

  }

}

module.exports = CoffeeBuilderPrivateApi;