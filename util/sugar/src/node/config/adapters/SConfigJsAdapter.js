const __fs = require('fs');
const __set = require('../../object/set');
const __get = require('../../object/get');
const __toString = require('../../string/toString');
const __parse = require('../../string/parse');
const __stringifyObject = require('stringify-object');
const __deepMerge = require('../../object/deepMerge');
const __tmpDir = require('../../fs/tmpDir');
const __writeFileSync = require('../../fs/writeFileSync');

/**
 * @name                  SConfigJsAdapter
 * @namespace             sugar.node.config.adapters
 * @type                  Class
 *
 * The JSON data adapter for the SConfig class that let you define a filename where you want to save your configs, how you want to encrypt/decrypt it
 * and then you just have to use the SConfig class and that's it...
 *
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - defaultConfigPath (null) {String}: This specify the path to the "default" config file.
 * - appConfigPath (${process.cwd()}/[name].config.js) {String}: This specify the path to the "app" config file
 * - userConfigPath (${__tmpDir()}/[name].config.js) {String}: This specify the path to the "user" config file
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @settings
 * The settings available are these onces:
 * - filename: (String): Specify where you want to store the config file and how you want to name it
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

module.exports = class SConfigJsAdapter {

  static name = 'js';
  static defaultSettings = {
    name: null,
    defaultConfigPath: null,
    appConfigPath: `${process.cwd()}/[name].config.js`,
    userConfigPath: `${__tmpDir()}/[name].config.js`
  };

  constructor(settings = {}) {
    this._settings = settings;
    this._settings.defaultConfigPath = settings.defaultConfigPath.replace('[name]', settings.name);
    this._settings.appConfigPath = settings.appConfigPath.replace('[name]', settings.name);
    this._settings.userConfigPath = settings.userConfigPath.replace('[name]', settings.name);
  }

  load() {

    let defaultConfig = {};
    let appConfig = {};
    let userConfig = {};

    // load the default config if exists
    if (this._settings.defaultConfigPath && __fs.existsSync(this._settings.defaultConfigPath)) {
      defaultConfig = require(this._settings.defaultConfigPath);
    }

    // load the app config if exists
    if (this._settings.appConfigPath && __fs.existsSync(this._settings.appConfigPath)) {
      appConfig = require(this._settings.appConfigPath);
    }

    // load the user config
    if (this._settings.userConfigPath && __fs.existsSync(this._settings.userConfigPath)) {
      defaultConfig = require(this._settings.userConfigPath);
    }

    // mix the configs and save them in the instance
    return __deepMerge(defaultConfig, appConfig, userConfig);

  }

  save(newConfig = {}) {

    if (!this._settings.userConfigPath) {
      throw new Error(`You try to save the config "${this._settings.name}" but the "settings.userConfigPath" is not set...`);
    }

    let newConfigString = `
      module.exports = ${JSON.stringify(newConfig)};
    `;
    console.log(newConfigString);

    // write the new config file
    __writeFileSync(this._settings.userConfigPath, newConfigString);

  }

}
