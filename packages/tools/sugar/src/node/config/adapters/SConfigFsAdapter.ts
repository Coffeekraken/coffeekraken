// @ts-nocheck

import __fs from 'fs';
import __deepMerge from '../../object/deepMerge';
import __writeFileSync from '../../fs/writeFileSync';
import __diff from '../../object/diff';
import __SConfigAdapter from './SConfigAdapter';
import __localDir from '../../path/localDir';

/**
 * @name                  SConfigFsAdapter
 * @namespace           sugar.node.config.adapters
 * @type                  Class
 * @beta
 *
 * The JSON data adapter for the SConfig class that let you define a filename where you want to save your configs, how you want to encrypt/decrypt it
 * and then you just have to use the SConfig class and that's it...
 *
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - filename ('[name].config.js') {String}: Specify the filename to use for the file that will store the configs
 * - defaultConfigPath (null) {String}: This specify the path to the "default" config file.
 * - appConfigPath (${process.cwd()}/[filename]) {String}: This specify the path to the "app" config file
 * - userConfigPath (${__localDir()}/[filename]) {String}: This specify the path to the "user" config file
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export = class SConfigFsAdapter extends __SConfigAdapter {
  constructor(settings = {}) {
    settings = __deepMerge(
      {
        name: null,
        filename: '[name].config.js',
        defaultConfigPath: null,
        appConfigPath: `${process.cwd()}/[filename]`,
        userConfigPath: `${__localDir()}/[filename]`
      },
      settings
    );
    super(settings);

    this.settings.filename = this.settings.filename.replace(
      '[name]',
      this.name
    );
    if (this.settings.defaultConfigPath)
      this.settings.defaultConfigPath = this.settings.defaultConfigPath.replace(
        '[filename]',
        this.settings.filename
      );
    if (this.settings.appConfigPath)
      this.settings.appConfigPath = this.settings.appConfigPath.replace(
        '[filename]',
        this.settings.filename
      );
    if (this.settings.userConfigPath)
      this.settings.userConfigPath = this.settings.userConfigPath.replace(
        '[filename]',
        this.settings.filename
      );
  }

  load() {
    this._defaultConfig = {};
    this._appConfig = {};
    this._userConfig = {};

    // load the default config if exists
    if (
      this.settings.defaultConfigPath &&
      __fs.existsSync(this.settings.defaultConfigPath)
    ) {
      this._defaultConfig = require(`${this.settings.defaultConfigPath}`);
    }

    // load the app config if exists
    if (
      this.settings.appConfigPath &&
      __fs.existsSync(this.settings.appConfigPath)
    ) {
      this._appConfig = require(`${this.settings.appConfigPath}`);
    }

    // load the user config
    if (
      this.settings.userConfigPath &&
      __fs.existsSync(this.settings.userConfigPath)
    ) {
      this._userConfig = require(`${this.settings.userConfigPath}`);
    }

    // mix the configs and save them in the instance
    return __deepMerge(this._defaultConfig, this._appConfig, this._userConfig);
  }

  save(newConfig = {}) {
    if (!this.settings.userConfigPath) {
      throw new Error(
        `You try to save the config "${this.name}" but the "settings.userConfigPath" is not set...`
      );
    }

    const baseConfig = __deepMerge(this._defaultConfig, this._appConfig);

    newConfig = __diff(baseConfig, newConfig);

    const newConfigString = `
      module.exports = ${JSON.stringify(newConfig)};
    `;

    // write the new config file
    __writeFileSync(this.settings.userConfigPath, newConfigString);

    return true;
  }
};
