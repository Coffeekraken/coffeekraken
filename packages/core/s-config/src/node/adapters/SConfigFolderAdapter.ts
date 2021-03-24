// @ts-nocheck

import __fs from 'fs';
import __deepMerge from '../../../shared/object/deepMerge';
import __writeFileSync from '../../fs/writeFileSync';
import __diff from '../../../shared/object/diff';
import __SConfigAdapter from '../../../shared/config/adapters/SConfigAdapter';
import __packageRoot from '../../path/packageRoot';
import __path from 'path';
import __chokidar from 'chokidar';

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
    if (this.configFolderAdapterSettings.defaultConfigPath)
      this.configFolderAdapterSettings.defaultConfigPath = this.configFolderAdapterSettings.defaultConfigPath.replace(
        '[folderName]',
        this.configFolderAdapterSettings.folderName
      );
    if (this.configFolderAdapterSettings.appConfigPath)
      this.configFolderAdapterSettings.appConfigPath = this.configFolderAdapterSettings.appConfigPath.replace(
        '[folderName]',
        this.configFolderAdapterSettings.folderName
      );
    if (this.configFolderAdapterSettings.userConfigPath)
      this.configFolderAdapterSettings.userConfigPath = this.configFolderAdapterSettings.userConfigPath.replace(
        '[folderName]',
        this.configFolderAdapterSettings.folderName
      );

    // watch for changes
    const watchPaths: string[] = [];
    if (
      this.configFolderAdapterSettings.defaultConfigPath &&
      __fs.existsSync(this.configFolderAdapterSettings.defaultConfigPath)
    ) {
      watchPaths.push(this.configFolderAdapterSettings.defaultConfigPath);
    }
    if (
      this.configFolderAdapterSettings.appConfigPath &&
      __fs.existsSync(this.configFolderAdapterSettings.appConfigPath)
    ) {
      watchPaths.push(this.configFolderAdapterSettings.appConfigPath);
    }
    if (
      this.configFolderAdapterSettings.userConfigPath &&
      __fs.existsSync(this.configFolderAdapterSettings.userConfigPath)
    ) {
      watchPaths.push(this.configFolderAdapterSettings.userConfigPath);
    }
    __chokidar
      .watch(watchPaths, {
        ignoreInitial: true
      })
      .on('change', (p) => this.emit('update', p))
      .on('unlink', (p) => this.emit('update', p))
      .on('add', (p) => this.emit('update', p));
  }

  load() {
    this._defaultConfig = {};
    this._appConfig = {};
    this._userConfig = {};

    if (
      this.configFolderAdapterSettings.defaultConfigPath &&
      __fs.existsSync(this.configFolderAdapterSettings.defaultConfigPath)
    ) {
      process.env[
        `SConfigFolderAdapter-${this.configFolderAdapterSettings.defaultConfigPath}`
      ] = true;
      __fs
        .readdirSync(this.configFolderAdapterSettings.defaultConfigPath)
        .forEach((file) => {
          if (
            !file.includes(
              this.configFolderAdapterSettings.fileName.replace('[name]', '')
            )
          )
            return;
          if (this._defaultConfig[file.replace('.config.js', '')] !== undefined)
            return;
          const configData = require(`${this.configFolderAdapterSettings.defaultConfigPath}/${file}`);
          this._defaultConfig[file.replace('.config.js', '')] =
            Object.keys(configData).length === 1 && configData.default
              ? configData.default
              : configData;
        });
      process.env[
        `SConfigFolderAdapter-${this.configFolderAdapterSettings.defaultConfigPath}`
      ] = JSON.stringify(this._defaultConfig);
    } else if (
      process.env[
        `SConfigFolderAdapter-${this.configFolderAdapterSettings.defaultConfigPath}`
      ]
    ) {
      this._defaultConfig = JSON.parse(
        process.env[
          `SConfigFolderAdapter-${this.configFolderAdapterSettings.defaultConfigPath}`
        ]
      );
    }

    if (
      this.configFolderAdapterSettings.defaultConfigPath !==
        this.configFolderAdapterSettings.appConfigPath &&
      this.configFolderAdapterSettings.appConfigPath &&
      __fs.existsSync(this.configFolderAdapterSettings.appConfigPath)
    ) {
      process.env[
        `SConfigFolderAdapter-${this.configFolderAdapterSettings.appConfigPath}`
      ] = true; // intermediate value
      __fs
        .readdirSync(this.configFolderAdapterSettings.appConfigPath)
        .forEach((file) => {
          if (
            !file.includes(
              this.configFolderAdapterSettings.fileName.replace('[name]', '')
            )
          )
            return;
          const configData = require(`${this.configFolderAdapterSettings.appConfigPath}/${file}`);
          this._appConfig[file.replace('.config.js', '')] =
            Object.keys(configData).length === 1 && configData.default
              ? configData.default
              : configData;
        });
      process.env[
        `SConfigFolderAdapter-${this.configFolderAdapterSettings.appConfigPath}`
      ] = JSON.stringify(this._appConfig);
    } else if (
      process.env[
        `SConfigFolderAdapter-${this.configFolderAdapterSettings.appConfigPath}`
      ]
    ) {
      this._appConfig = JSON.parse(
        process.env[
          `SConfigFolderAdapter-${this.configFolderAdapterSettings.appConfigPath}`
        ]
      );
    }

    if (
      this.configFolderAdapterSettings.defaultConfigPath !==
        this.configFolderAdapterSettings.userConfigPath &&
      this.configFolderAdapterSettings.appConfigPath !==
        this.configFolderAdapterSettings.userConfigPath &&
      this.configFolderAdapterSettings.userConfigPath &&
      __fs.existsSync(this.configFolderAdapterSettings.userConfigPath)
    ) {
      process.env[
        `SConfigFolderAdapter-${this.configFolderAdapterSettings.userConfigPath}`
      ] = true; // intermediate value
      __fs
        .readdirSync(this.configFolderAdapterSettings.userConfigPath)
        .forEach((file) => {
          if (
            !file.includes(
              this.configFolderAdapterSettings.fileName.replace('[name]', '')
            )
          )
            return;
          const configData = require(`${this.configFolderAdapterSettings.userConfigPath}/${file}`);
          this._userConfig[file.replace('.config.js', '')] =
            Object.keys(configData).length === 1 && configData.default
              ? configData.default
              : configData;
        });
      process.env[
        `SConfigFolderAdapter-${this.configFolderAdapterSettings.userConfigPath}`
      ] = JSON.stringify(this._userConfig);
    } else if (
      process.env[
        `SConfigFolderAdapter-${this.configFolderAdapterSettings.userConfigPath}`
      ]
    ) {
      this._userConfig = JSON.parse(
        process.env[
          `SConfigFolderAdapter-${this.configFolderAdapterSettings.userConfigPath}`
        ]
      );
    }

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
