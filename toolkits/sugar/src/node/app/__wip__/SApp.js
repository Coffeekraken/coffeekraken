const __fs = require('fs');
const __log = require('../log/log');
const __deepMerge = require('../object/deepMerge');
const __get = require('../object/get');
const __SConfig = require('./SConfig');
const __base64 = require('../crypt/base64');

// TODO: Check which app/packages are using this Class

/**
 * @name                                            SApp
 * @namespace           sugar.node.class
 * @type                                            Class
 *
 * This class represent an application route class. This mean that you can create an application class that extend this one
 * and your instance will have access to a whole package of data like the application name taken from the package.json file, the version,
 * the description, the author(s), the contributor(s), etc...
 *
 * @example             js
 * const SApp = require('@coffeekraken/sugar/node/class/SApp');
 * class MyCoolApp extends SApp {
 *    // your app class here...
 * }
 * const myApp = new MyCoolApp();
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SApp {
  /**
   * @name                __settings
   * @type                Object
   * @private
   */
  __settings = {};

  /**
   * @name                __data
   * @type                Object
   * @private
   */
  __data = {};

  /**
   * @constructor
   * @param               {Object}                      data                 The application data that you want to set like version, name, etc...
   * @param                {Object}                    [settings={}]          An object to configure your SApp instance.
   * @return              {SApp}                                           An SApp instance pn which you will have access to all the application data
   *
   * @setting              {Array}                 [sources=[process.cwd()]]         Tell the class instance where to search for files like package.json, app.config.js, etc...
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(data, settings = {}) {
    // save the settings and the data
    this.__settings = {
      name: settings.name || 'SApp',
      sources: [process.cwd()],
      ...settings
    };
    this.__data = data || {};

    // save the instance into global variables
    global[this.__settings.name] = this;

    // eat the data in the setted sources
    this.__eatData();
  }

  /**
   * @name                        config
   * @namespace           sugar.node.class.SApp
   * @type                        Function
   *
   * Access the configuration of the setted adapters in "settings.config". For more informations please check the SConfig adapters documentation...
   *
   * @param                 {String}                  path                The dotted object path of the wanted settings like "log.backend.mail.host"
   * @return                {Mixed}                                       The getted configuration value
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  async config(path) {
    if (!this._sConfig) {
      this._sConfig = new __SConfig(
        {
          js: {
            filename: process.cwd() + '/app.config.js'
          },
          ...(this.__settings.config || {})
        },
        {
          allowSet: false,
          allowClear: false
        }
      );
    }

    let value;
    value = await this._sConfig.get(path);
    return value;
  }

  /**
   * @name                 meta
   * @namespace           sugar.node.class.SApp
   * @type                 Function
   *
   * Return a application meta taken from the stored datas
   *
   * @param            {String}              path                The dotted object path to tell which data you want
   * @return           {Mixed}                                   The requested value
   *
   * @example          js
   * sApp.meta('name'); // => @coffeekraken/sugar
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  meta(path) {
    const value = __get(this.__data, path);
    if (!value) {
      __log(
        `You try to get the application meta named "${path}" but this meta does not exist...`,
        'error'
      );
      return undefined;
    }
    return value;
  }

  /**
   * @name               __eatData
   * @namespace           sugar.node.class.SApp
   * @type               Function
   *
   * Search the setted sources to find the files like package.json, app.config.js, etc and build the __data object
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  __eatData() {
    // loop on the setted sources
    this.__settings.sources.forEach((source) => {
      // check if a package.json file exist
      if (__fs.existsSync(process.cwd() + '/package.json')) {
        const packageJson = require(process.cwd() + '/package.json');
        delete packageJson.dependencies;
        delete packageJson.devDependencies;
        delete packageJson.globalDependencies;
        this.__data = __deepMerge(this.__data, packageJson);
      }
      if (__fs.existsSync(process.cwd() + '/app.config.js')) {
        const appConfig = require(process.cwd() + '/app.config.js');
        this.__data = __deepMerge(this.__data, appConfig);
      }
    });
  }

  /**
   * @name                   _jsContent
   * @namespace           sugar.node.class.SApp
   * @type                   Function
   *
   * Get all the configured js files content and return it in text format
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _jsContent() {
    // get the "serve.js" config
    const serveJs = await this.config('app.serve.js');

    // hold the content
    const contentArray = [];

    // read every files
    serveJs.forEach((file) => {
      contentArray.push(__fs.readFileSync(file));
    });

    // add the "_sAppName" variable into the js
    contentArray.unshift(`
      window._sAppName = "${this.__settings.name}";
   `);

    // add the meta, config, etc... variables
    contentArray.push(`
     window._${this.__settings.name || 'sApp'}Data = {
       config: "${__base64.encrypt(await this.config())}",
       meta: "${__base64.encrypt(this.meta())}"
     };
   `);

    // return the js content
    return contentArray.join('\n');
  }

  /**
   * @name                   _cssContent
   * @namespace           sugar.node.class.SApp
   * @type                   Function
   *
   * Get all the configured js files content and return it in text format
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _cssContent() {
    // get the "serve.js" config
    const serveCss = await this.config('app.serve.css');

    // hold the content
    const contentArray = [];

    // read every files
    serveCss.forEach((file) => {
      contentArray.push(__fs.readFileSync(file));
    });

    // return the js content
    return contentArray.join('\n');
  }
};
