const __fs = require('fs');
const __deepMerge = require('../../object/deepMerge');
const __tmpDir = require('../../fs/tmpDir');
const __writeFileSync = require('../../fs/writeFileSync');

const __SConfigAdapter = require('./SConfigAdapter');

/**
 * @name                  SConfigFsAdapter
 * @namespace             sugar.node.config.adapters
 * @type                  Class
 *
 * The JSON data adapter for the SConfig class that let you define a filename where you want to save your configs, how you want to encrypt/decrypt it
 * and then you just have to use the SConfig class and that's it...
 *
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - filename ('[name].config.js') {String}: Specify the filename to use for the file that will store the configs
 * - defaultConfigPath (null) {String}: This specify the path to the "default" config file.
 * - appConfigPath (${process.cwd()}/[filename]) {String}: This specify the path to the "app" config file
 * - userConfigPath (${__tmpDir()}/[filename]) {String}: This specify the path to the "user" config file
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

module.exports = class SConfigFsAdapter extends __SConfigAdapter {

  constructor(settings = {}) {
    settings = __deepMerge({
      name: null,
      filename: '[name].config.js',
      defaultConfigPath: null,
      appConfigPath: `${process.cwd()}/[filename]`,
      userConfigPath: `${__tmpDir()}/[filename]`
    }, settings);
    super(settings);

    this.settings.filename = this.settings.filename.replace('[name]', this.name);
    this.settings.defaultConfigPath = this.settings.defaultConfigPath.replace('[filename]', this.settings.filename);
    this.settings.appConfigPath = this.settings.appConfigPath.replace('[filename]', this.settings.filename);
    this.settings.userConfigPath = this.settings.userConfigPath.replace('[filename]', this.settings.filename);

  }

  async load() {

    let defaultConfig = {};
    let appConfig = {};
    let userConfig = {};

    // load the default config if exists
    if (this.settings.defaultConfigPath && __fs.existsSync(this.settings.defaultConfigPath)) {
      defaultConfig = require(this.settings.defaultConfigPath);
    }

    // load the app config if exists
    if (this.settings.appConfigPath && __fs.existsSync(this.settings.appConfigPath)) {
      appConfig = require(this.settings.appConfigPath);
    }

    // load the user config
    if (this.settings.userConfigPath && __fs.existsSync(this.settings.userConfigPath)) {
      userConfig = require(this.settings.userConfigPath);
    }

    // mix the configs and save them in the instance
    return __deepMerge(defaultConfig, appConfig, userConfig);

  }

  async save(newConfig = {}) {

    if (!this.settings.userConfigPath) {
      throw new Error(`You try to save the config "${this.name}" but the "settings.userConfigPath" is not set...`);
    }

    let newConfigString = `
      module.exports = ${JSON.stringify(newConfig)};
    `;
    console.log(newConfigString);

    // write the new config file
    __writeFileSync(this.settings.userConfigPath, newConfigString);

    return true;

  }

}
