// @ts-nocheck

import __unique from '@coffeekraken/sugar/shared/array/unique';
import __fs from 'fs';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __diff from '@coffeekraken/sugar/shared/object/diff';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __SConfigAdapter from '../../shared/adapters/SConfigAdapter';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __path from 'path';
import * as __chokidar from 'chokidar';
import __SConfig from '../../shared/SConfig';

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
 * - repoConfigPath (${process.cwd()}/[fileName]) {String}: This specify the path to the "app" config file
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

export interface ISConfigFolderAdapterScopesSettings {
  default: string[];
  module: string[];
  extends: string[];
  repo: string[];
  package: string[];
  user: string[];
}

export interface ISConfigFolderAdapterSettings {
  fileName: string;
  folderName: string;
  scopes: ISConfigFolderAdapterScopesSettings;
  savingScope: string;
}
export interface ISConfigFolderAdapterCtorSettings {
  configFolderAdapter?: Partial<ISConfigFolderAdapterSettings>;
  configAdapter?: any;
}

export default class SConfigFolderAdapter extends __SConfigAdapter {
  get configFolderAdapterSettings(): ISConfigFolderAdapterSettings {
    return (<any>this)._settings.configFolderAdapter;
  }

  _scopedSettings: any = {};
  _scopedFoldersPaths: any = {};
  _foldersPaths: string[] = [];

  constructor(settings: Partial<ISConfigFolderAdapterCtorSettings>) {
    super(
      __deepMerge(
        {
          configFolderAdapter: {
            fileName: '[name].config.js',
            folderName: '.sugar',
            scopes: {
              default: [__path.resolve(__dirname, '../../config')],
              module: [],
              extends: [],
              repo: [`${__packageRootDir(process.cwd(), true)}/[folderName]`],
              package: [`${__packageRootDir(process.cwd())}/[folderName]`],
              user: [`${__packageRootDir(process.cwd())}/.local/[folderName]`]
            },
            savingScope: 'user'
          }
        },
        settings || {}
      )
    );

    // handle configs
    this.configFolderAdapterSettings.folderName =
      this.configFolderAdapterSettings.folderName.replace('[name]', this.name);

    // handle each scopes
    Object.keys(this.configFolderAdapterSettings.scopes).forEach((scope) => {
      let scopeFoldersPathArray =
        this.configFolderAdapterSettings.scopes[scope];

      if (scopeFoldersPathArray) {
        if (!Array.isArray(scopeFoldersPathArray))
          scopeFoldersPathArray = [scopeFoldersPathArray];
        scopeFoldersPathArray = scopeFoldersPathArray.map((path) => {
          return path.replace(
            '[folderName]',
            this.configFolderAdapterSettings.folderName
          );
        });
      }

      // append to the scoped folders path array
      this._scopedFoldersPaths[scope] = scopeFoldersPathArray;
    });

    const watchPaths: string[] = [];
    Object.keys(this.configFolderAdapterSettings.scopes).forEach((scope) => {
      if (this._scopedFoldersPaths[scope]) {
        this._scopedFoldersPaths[scope] = this._scopedFoldersPaths[
          scope
        ].filter((path) => {
          if (
            __fs.existsSync(path) &&
            this._foldersPaths.indexOf(path) === -1
          ) {
            watchPaths.push(path);
            this._foldersPaths.push(path);
            return true;
          }
          return false;
        });
      }
    });

    // watch for changes
    __chokidar
      .watch(__unique(watchPaths), {
        ignoreInitial: true
      })
      .on('change', (p) => {
        this.update(p);
      })
      .on('unlink', (p) => this.update(p))
      .on('add', (p) => this.update(p));
  }

  _load(folderPaths, scope, clearCache = false) {
    const configObj = {};


    folderPaths = __unique(folderPaths);

    folderPaths.forEach((path) => {

      __fs.readdirSync(path).forEach((file) => {
              
        if (!file.match(/\.js(on)?$/)) return;  

        if (
          !file.includes(
            this.configFolderAdapterSettings.fileName.replace('[name]', '')
          )
        )
          return;

        const configFilePath = `${path}/${file}`;
        if (clearCache) delete require.cache[require.resolve(configFilePath)];
        const configData = require(configFilePath);


        const configKey = file.replace('.config.js', '');
        if (!configObj[configKey]) configObj[configKey] = {};

        configObj[configKey] = __deepMerge(
          configObj[configKey],
          configData.default ? configData.default : configData
        );

        if (configData.prepare && typeof configData.prepare === 'function') {
          __SConfig.registerPrepare(
            this.configAdapterSettings.name,
            configKey,
            configData.prepare
          );
        }

        if (configData.proxy && typeof configData.proxy === 'function') {
          __SConfig.registerProxy(
            this.configAdapterSettings.name,
            configKey,
            configData.proxy
          );
        }
      });
      // process.env[`SConfigFolderAdapter-${scope}`] = JSON.stringify(configObj);
    });



    return Object.assign({}, configObj);
  }

  load(clearCache = false) {
    try {
      Object.keys(this._scopedFoldersPaths).forEach((scope) => {
        const scopedFoldersPaths = this._scopedFoldersPaths[scope];
        if (scopedFoldersPaths) {
          this._scopedSettings[scope] = this._load(scopedFoldersPaths, scope, clearCache);
        }
        // else if (process.env[`SConfigFolderAdapter-${scope}`]) {
        //   this._scopedSettings[scope] = JSON.parse(
        //     process.env[`SConfigFolderAdapter-${scope}`]
        //   );
        // }
      });
    } catch (e) {
      console.log('EEEE', e);
    }

    let resultSettings: any = {};
    Object.keys(this._scopedSettings).forEach((scope) => {
      resultSettings = __deepMerge(resultSettings, this._scopedSettings[scope]);
    });

    return resultSettings;
  }

  save(newConfig = {}) {
    throw new Error(
      `<red>[${this.constructor.name}.save]</red> Sorry but the save feature has not been implemented yet...`
    );

    // if (!this.configFolderAdapterSettings.userConfigPath) {
    //   throw new Error(
    //     `You try to save the config "${this.name}" but the "settings.userConfigPath" is not set...`
    //   );
    // }

    // const baseConfig = __deepMerge(this._defaultConfig, this._appConfig);

    // Object.keys(baseConfig).forEach((name) => {
    //   const configToSave = __diff(baseConfig[name], newConfig[name] || {});

    //   const newConfigString = `
    //   module.exports = ${JSON.stringify(configToSave)};
    // `;

    //   // write the new config file
    //   __writeFileSync(
    //     this.configFolderAdapterSettings.userConfigPath +
    //       '/' +
    //       this.configFolderAdapterSettings.fileName.replace('[name]', name),
    //     newConfigString
    //   );
    // });

    // return true;
  }
}
