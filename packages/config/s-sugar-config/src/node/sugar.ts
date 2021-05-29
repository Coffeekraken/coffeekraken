// @ts-nocheck

import __SConfig, { SConfigFolderAdapter } from '@coffeekraken/s-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __get from '@coffeekraken/sugar/shared/object/get';
import __fs from 'fs';
import __path from 'path';

/**
 * @name                  sugar
 * @namespace           shared
 * @type                  Function
 * @status              beta
 *
 * This function allows you to access easily the configurations stored in the ```sugar.config.js```.
 * The returned configuration is the result of the default sugar config stored in the toolkit and the
 * app defined config stored in current application root folder
 *
 * @param         {String}        dotPath         The dot path to the config wanted
 * @return        {Mixed}                         Return the value if exists, undefined if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Enhancement}       Find a way to specify the "userConfigPath" dynamically without having circular dependencies
 * @todo      Add multi level extends support
 *
 * @example             js
 * import sugar from '@coffeekraken/s-sugar-config';
 * sugar('scss.unit'); // => rem
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


export default class SSugarConfig {

  static _sConfigInstance = undefined;
  static _sugarJson = undefined;
  static _rootSugarJson = undefined;
  static _registeredConfigFolderPaths = [];
  static _registeredConfigFilesPaths = [];

  /**
   * @name            registerFolder
   * @namespace       shared
   * @type            Function
   * @static
   *
   * This function allows you to register some folders to be taken in consideration
   * when accessing the config using the ```sugar``` function
   *
   * @param       {String}        folderPath          The folder path in which to check for .config.js files
   *
   * @example         js
   * import registerFolder from '@coffeekraken/sugar/shared/config/registerFolder';
   * registerFolder('/something/cool');
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static registerFolder(
    path: string,
    scope?: 'default' | 'module' | 'extends' | 'repo' | 'package' | 'user',
    packageName?: string
  ): void {

    this._registeredConfigFolderPaths.push({
      path,
      scope: scope ?? 'default',
      packageName
    });
    this._registeredConfigFilesPaths = [...this._registeredConfigFilesPaths, ...__fs.readdirSync(path).filter(p => p.match(/\.config\.js$/)).map(p => {
      return `${path}/${p}`;
    })];
  }


  static get filesRealPaths(): string[] {
    return this._registeredConfigFilesPaths.map(f => __fs.realpathSync(f));
  }

  static get filesPaths(): string[] {
    return this._registeredConfigFilesPaths;
  }

  static get foldersRealPaths(): string[] {
    return this._registeredConfigFolderPaths.map(f => __fs.realpathSync(f.path));
  }

  static get foldersPaths(): string[] {
    return this._registeredConfigFolderPaths.map(f => f.path);
  }

  static get(dotPath: string): any {

    if (!this._rootSugarJson || !this._sugarJson) {
      this._searchConfigFiles();
    }

    if (!this._sConfigInstance) {
      this._sConfigInstance = new __SConfig('sugar', {
        adapters: [
          new SConfigFolderAdapter({
            configAdapter: {
              name: 'sugar'
            },
            configFolderAdapter: {
              folderName: '.sugar',
              fileName: '[name].config.js',
              scopes: {
                default: [
                  __path.resolve(__dirname, '../../src/config'),
                  // @ts-ignore
                  ...this._registeredConfigFolderPaths
                    .filter((obj) => obj.scope === 'default')
                    .map((obj) => obj.path)
                ],
                module: [
                  // @ts-ignore
                  ...this._registeredConfigFolderPaths
                    .filter((obj) => {
                      if (obj.scope === 'module') return true;
                      return false;
                    })
                    .map((obj) => obj.path)
                ],
                extends: [
                  // @ts-ignore
                  ...this._registeredConfigFolderPaths
                    .filter((obj) => {
                      if (
                        this._rootSugarJson &&
                        obj.scope === 'extends' &&
                        this._rootSugarJson.extends.indexOf(obj.packageName) !== -1
                      ) {
                        return true;
                      }
                      return false;
                    })
                    .map((obj) => obj.path)
                ],
                repo: [
                  `${__packageRoot(process.cwd(), true)}/[folderName]`,
                  // @ts-ignore
                  ...this._registeredConfigFolderPaths
                    .filter((obj) => obj.scope === 'repo')
                    .map((obj) => obj.path)
                ],
                package: [
                  `${__packageRoot(process.cwd())}/[folderName]`,
                  // @ts-ignore
                  ...this._registeredConfigFolderPaths
                    .filter((obj) => obj.scope === 'package')
                    .map((obj) => obj.path)
                ],
                user: [
                  `${__packageRoot(process.cwd())}/.local/[folderName]`,
                  // @ts-ignore
                  ...this._registeredConfigFolderPaths
                    .filter((obj) => obj.scope === 'user')
                    .map((obj) => obj.path)
                ]
              }
            }
          })
        ],
        resolvers: [
          {
            match: /\[theme.[a-zA-Z0-9.\-_]+\]/gm,
            resolve(match, config, path) {
              const themePath = path.slice(0, 3).join('.');
              const valuePath = match
                .replace('[theme.', themePath + '.')
                .replace(']', '');
              const value = __get(config, valuePath);
              return value;
            }
          }
        ]
      });
    }

    // get the config
    return this._sConfigInstance.get(dotPath, undefined, {
      throwErrorOnUndefinedConfig: false
    });
  }

  static _searchConfigFiles() {

    const sugarJson = new __SSugarJson();

    if (!this._rootSugarJson) {
      const rootSugarJsonPath = `${__packageRoot()}/sugar.json`;
      if (__fs.existsSync(rootSugarJsonPath)) {
        this._rootSugarJson = sugarJson.sanitizeJson(require(rootSugarJsonPath));
        if (this._rootSugarJson.extends && !Array.isArray(this._rootSugarJson.extends))
          this._rootSugarJson.extends = [this._rootSugarJson.extends];
      }
    }

    if (!this._sugarJson) {
      this._sugarJson = sugarJson.read();
      Object.keys(this._sugarJson).forEach((packageName) => {
        // @ts-ignore
        const jsonObj = this._sugarJson[packageName];
        if (jsonObj.config && jsonObj.config.folders) {
          jsonObj.config.folders.forEach((folderObj) => {
            this.registerFolder(
              __path.resolve(jsonObj.metas.folderPath, folderObj.path),
              folderObj.scope,
              packageName
            );
          });
        }
      });
    }
  }

}
