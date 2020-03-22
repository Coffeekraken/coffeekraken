const __fs = require('fs');
const __set = require('../../object/set');
const __get = require('../../object/get');
const __toString = require('../../string/toString');
const __parse = require('../../string/parse');
const __stringifyObject = require('stringify-object');
const __deepMerge = require('../../object/deepMerge');

/**
 * @name                  js
 * @namespace             sugar.node.class.sConfigAdapters
 * @type                  Function
 *
 * The JSON data adapter for the SConfig class that let you define a filename where you want to save your configs, how you want to encrypt/decrypt it
 * and then you just have to use the SConfig class and that's it...
 *
 * @param                   {String}                    path                  The dotted object path to specify the config you want in the retreived object
 * @param                   {Mixed}                     [value=null]          The value that you want to save, or null if you want to simply get a value
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @settings
 * The settings available are these onces:
 * - filename: (String): Specify where you want to store the config file and how you want to name it
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

module.exports = class JsConfigAdapter {

  static name = 'js';
  static defaultSettings = {
    defaultConfigPath: null,
    userConfigPath: `${process.cwd()}/[name].conf.js`
  };

  constructor(settings = {}) {
    this._settings = settings;
    this._settings.userConfigPath = settings.userConfigPath.replace('[name]', settings.name);
  }

  load() {

    let defaultConfig = {};
    let userConfig = {};

    // load the default config if exists
    if (this._settings.defaultConfigPath && __fs.existsSync(this._settings.defaultConfigPath)) {
      defaultConfig = require(this._settings.defaultConfigPath);
    }

    // load the user config
    if (this._settings.userConfigPath && __fs.existsSync(this._settings.userConfigPath)) {
      defaultConfig = require(this._settings.userConfigPath);
    }

    // mix the configs and save them in the instance
    return __deepMerge(defaultConfig, userConfig);

  }

}
