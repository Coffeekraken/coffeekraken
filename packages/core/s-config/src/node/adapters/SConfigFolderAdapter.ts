// @ts-nocheck

import __fs from 'fs';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __diff from '@coffeekraken/sugar/shared/object/diff';
import __SConfigAdapter from '../../shared/adapters/SConfigAdapter';
import __packageRoot from '@coffeekraken/sugar/shared/path/packageRoot';
import __path from 'path';
import * as __chokidar from 'chokidar';

/**
 * @name                  SConfigFolderAdapter
 * @namespace           s-config.node.adapters
 * @type                  Class
 * @status              beta
 *
 * This adapter let you specify a folder in which to put all the config files and access it normaly as you would with the SConfig system.
 * Each file in the folder will be the first level of the final config object like for example the file "colors.config.js" will be stored
 * in the final object under ```{ colors: ... }```.
 *
 * @param                   {Object}                   [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - fileName ('[name].config.js') {String}: Specify the fileName to use for the file that will store the configs
 * - defaultConfigPath (null) {String}: This specify the path to the "default" config file.
 * - appConfigPath (${process.cwd()}/[fileName]) {String}: This specify the path to the "app" config file
 * - userConfigPath (${__localDir()}/[fileName]) {String}: This specify the path to the "user" config file
 * @return                  {Promise}                                        A promise that will be resolved once the data has been getted/saved...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISConfigFolderAdapterSettings {
  folderName: string;
}
export interface ISConfigFolderAdapterCtorSettings {
  configFolderAdapter?: Partial<ISConfigFolderAdapterCtorSettings>;
}

export default class SConfigFolderAdapter extends __SConfigAdapter {
  get configFolderAdapterSettings(): ISConfigFolderAdapterSettings {
    return (<any>this)._settings.configFolderAdapter;
  }

  constructor(settings: ISConfigFolderAdapterCtorSettings) {
    super(
      __deepMerge(
        {
          configFolderAdapter: {
            fileName: '[name].config.js',
            folderName: '.sugar',
            defaultConfigPath: __path.resolve(__dirname, '../../config'),
            appConfigPath: `${__packageRoot(process.cwd())}/[folderName]`,
            userConfigPath: `${__packageRoot(
              process.cwd()
            )}/.local/[folderName]`
          }
        },
        settings || {}
      )
    );
    this.configFolderAdapterSettings.folderName = this.configFolderAdapterSettings.folderName.replace(
      '[name]',
      this.name
    );
    if (this.configFolderAdapterSettings.defaultConfigPath) {
      if (!Array.isArray(this.configFolderAdapterSettings.defaultConfigPath))
        this.configFolderAdapterSettings.defaultConfigPath = [
          this.configFolderAdapterSettings.defaultConfigPath
        ];
      this.configFolderAdapterSettings.defaultConfigPath = this.configFolderAdapterSettings.defaultConfigPath.map(
        (path) => {
          return path.replace(
            '[folderName]',
            this.configFolderAdapterSettings.folderName
          );
        }
      );
    }
    if (this.configFolderAdapterSettings.appConfigPath) {
      if (!Array.isArray(this.configFolderAdapterSettings.appConfigPath))
        this.configFolderAdapterSettings.appConfigPath = [
          this.configFolderAdapterSettings.appConfigPath
        ];
      this.configFolderAdapterSettings.appConfigPath = this.configFolderAdapterSettings.appConfigPath.map(
        (path) => {
          return path.replace(
            '[folderName]',
            this.configFolderAdapterSettings.folderName
          );
        }
      );
    }
    if (this.configFolderAdapterSettings.userConfigPath) {
      if (!Array.isArray(this.configFolderAdapterSettings.userConfigPath))
        this.configFolderAdapterSettings.userConfigPath = [
          this.configFolderAdapterSettings.userConfigPath
        ];
      this.configFolderAdapterSettings.userConfigPath = this.configFolderAdapterSettings.userConfigPath.map(
        (path) => {
          return path.replace(
            '[folderName]',
            this.configFolderAdapterSettings.folderName
          );
        }
      );
    }

    // watch for changes
    const watchPaths: string[] = [];
    if (this.configFolderAdapterSettings.defaultConfigPath) {
      this.configFolderAdapterSettings.defaultConfigPath = this.configFolderAdapterSettings.defaultConfigPath.filter(
        (path) => {
          if (__fs.existsSync(path)) {
            watchPaths.push(path);
            return true;
          }
          return false;
        }
      );
    }
    if (this.configFolderAdapterSettings.appConfigPath) {
      this.configFolderAdapterSettings.appConfigPath = this.configFolderAdapterSettings.appConfigPath.filter(
        (path) => {
          if (__fs.existsSync(path)) {
            watchPaths.push(path);
            return true;
          }
          return false;
        }
      );
    }
    if (this.configFolderAdapterSettings.userConfigPath) {
      this.configFolderAdapterSettings.userConfigPath = this.configFolderAdapterSettings.userConfigPath.filter(
        (path) => {
          if (__fs.existsSync(path)) {
            watchPaths.push(path);
            return true;
          }
          return false;
        }
      );
    }

    console.log(this.configFolderAdapterSettings);

    __chokidar
      .watch(watchPaths, {
        ignoreInitial: true
      })
      .on('change', (p) => this.update())
      .on('unlink', (p) => this.update())
      .on('add', (p) => this.update());
  }

  _load(folderPaths, level) {
    const configObj = {};

    folderPaths.forEach((path) => {
      __fs.readdirSync(path).forEach((file) => {
        if (
          !file.includes(
            this.configFolderAdapterSettings.fileName.replace('[name]', '')
          ) ||
          configObj[file.replace('.config.js', '')] !== undefined
        )
          return;
        const configData = require(`${path}/${file}`);
        const configKey = file.replace('.config.js', '');

        if (!configObj[configKey]) configObj[configKey] = {};

        configObj[configKey] = __deepMerge(
          configObj[configKey],
          Object.keys(configData).length === 1 && configData.default
            ? configData.default
            : configData
        );
      });
      process.env[`SConfigFolderAdapter-${level}`] = JSON.stringify(configObj);
    });

    return Object.assign({}, configObj);
  }

  load() {
    this._defaultConfig = {};
    this._appConfig = {};
    this._userConfig = {};

    if (this.configFolderAdapterSettings.defaultConfigPath) {
      this._defaultConfig = this._load(
        this.configFolderAdapterSettings.defaultConfigPath,
        'default'
      );
    } else if (process.env[`SConfigFolderAdapter-default`]) {
      this._defaultConfig = JSON.parse(
        process.env[`SConfigFolderAdapter-default`]
      );
    }

    if (this.configFolderAdapterSettings.appConfigPath) {
      this._appConfig = this._load(
        this.configFolderAdapterSettings.appConfigPath,
        'app'
      );
    } else if (process.env[`SConfigFolderAdapter-app`]) {
      this._appConfig = JSON.parse(process.env[`SConfigFolderAdapter-app`]);
    }

    if (this.configFolderAdapterSettings.userConfigPath) {
      this._userConfig = this._load(
        this.configFolderAdapterSettings.userConfigPath,
        'user'
      );
    } else if (process.env[`SConfigFolderAdapter-user`]) {
      this._userConfig = JSON.parse(process.env[`SConfigFolderAdapter-user`]);
    }

    console.log(this._appConfig);

    // mix the configs and save them in the instance
    const n = __deepMerge(
      this._defaultConfig,
      this._appConfig,
      this._userConfig
    );

    return n;
  }

  save(newConfig = {}) {
    if (!this.configFolderAdapterSettings.userConfigPath) {
      throw new Error(
        `You try to save the config "${this.name}" but the "settings.userConfigPath" is not set...`
      );
    }

    const baseConfig = __deepMerge(this._defaultConfig, this._appConfig);

    Object.keys(baseConfig).forEach((name) => {
      const configToSave = __diff(baseConfig[name], newConfig[name] || {});

      const newConfigString = `
      module.exports = ${JSON.stringify(configToSave)};
    `;

      // write the new config file
      __writeFileSync(
        this.configFolderAdapterSettings.userConfigPath +
          '/' +
          this.configFolderAdapterSettings.fileName.replace('[name]', name),
        newConfigString
      );
    });

    return true;
  }
}
