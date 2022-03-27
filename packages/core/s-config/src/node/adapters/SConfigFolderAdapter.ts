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
import __SConfig, { ISConfigEnvObj } from '../../shared/SConfig';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                            default: [
                                __path.resolve(__dirname(), '../../config'),
                            ],
                            module: [],
                            extends: [],
                            repo: [
                                `${__packageRootDir(
                                    process.cwd(),
                                    true,
                                )}/[folderName]`,
                            ],
                            package: [
                                `${__packageRootDir(
                                    process.cwd(),
                                )}/[folderName]`,
                            ],
                            user: [
                                `${__packageRootDir(
                                    process.cwd(),
                                )}/.local/[folderName]`,
                            ],
                        },
                        savingScope: 'user',
                    },
                },
                settings || {},
            ),
        );

        // handle configs
        this.configFolderAdapterSettings.folderName = this.configFolderAdapterSettings.folderName.replace(
            '[name]',
            this.name,
        );

        // determine the running format (cjs|esm)
        let format = 'esm';
        try {
            if (module !== undefined) format = 'cjs';
        } catch (e) {}

        // handle each scopes
        Object.keys(this.configFolderAdapterSettings.scopes).forEach(
            (scope) => {
                let scopeFoldersPathArray = this.configFolderAdapterSettings
                    .scopes[scope];

                if (scopeFoldersPathArray) {
                    if (!Array.isArray(scopeFoldersPathArray))
                        scopeFoldersPathArray = [scopeFoldersPathArray];
                    scopeFoldersPathArray = scopeFoldersPathArray.map(
                        (path) => {
                            return path
                                .replace(
                                    '[folderName]',
                                    this.configFolderAdapterSettings.folderName,
                                )
                                .replace('%format', format);
                        },
                    );
                }

                // append to the scoped folders path array
                this._scopedFoldersPaths[scope] = scopeFoldersPathArray;
            },
        );

        const watchPaths: string[] = [];
        Object.keys(this.configFolderAdapterSettings.scopes).forEach(
            (scope) => {
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
            },
        );

        // watch for changes
        __chokidar
            .watch(__unique(watchPaths), {
                ignoreInitial: true,
            })
            .on('change', (p) => {
                this.update(p);
            })
            .on('unlink', (p) => this.update(p))
            .on('add', (p) => this.update(p));
    }

    async _load(
        folderPaths,
        clearCache = false,
        env: ISConfigEnvObj,
        configObj,
    ) {
        folderPaths = __unique(folderPaths);

        for (let i = 0; i < folderPaths.length; i++) {
            const path = folderPaths[i];

            const paths = __fs.readdirSync(path);

            for (let j = 0; j < paths.length; j++) {
                const file = paths[j];

                if (!file.match(/\.js(on)?$/)) continue;

                if (
                    !file.includes(
                        this.configFolderAdapterSettings.fileName.replace(
                            '[name]',
                            '',
                        ),
                    )
                ) {
                    continue;
                }

                const configFilePath = `${path}/${file}`;

                console.log('ddd', configFilePath);

                // @TODO      check for delete cache with import
                const importedConfig = await import(configFilePath);

                let configData = importedConfig ?? importedConfig.default;
                if (typeof configData === 'function') {
                    configData = configData(env, configObj ?? {});
                }

                const configKey = file.replace('.config.js', '');

                configObj[configKey] = __deepMerge(
                    configObj[configKey] ?? {},
                    configData,
                );

                if (
                    importedConfig.postprocess &&
                    typeof importedConfig.postprocess === 'function'
                ) {
                    __SConfig.registerPostprocess(
                        this.configAdapterSettings.name,
                        configKey,
                        importedConfig.postprocess,
                    );
                }

                if (
                    importedConfig.preprocess &&
                    typeof importedConfig.preprocess === 'function'
                ) {
                    __SConfig.registerPreprocess(
                        this.configAdapterSettings.name,
                        configKey,
                        importedConfig.preprocess,
                    );
                }
            }
        }

        console.log(configObj);

        return Object.assign({}, configObj);
    }

    async load(clearCache = false, env: ISConfigEnvObj, configObj) {
        try {
            for (
                let i = 0;
                i < Object.keys(this._scopedFoldersPaths).length;
                i++
            ) {
                const scope = Object.keys(this._scopedFoldersPaths)[i];

                const scopedFoldersPaths = this._scopedFoldersPaths[scope];

                if (scopedFoldersPaths && scopedFoldersPaths.length) {
                    this._scopedSettings[scope] = await this._load(
                        scopedFoldersPaths,
                        clearCache,
                        env,
                        configObj,
                    );
                }
            }
        } catch (e) {
            console.log('fffffffff', e);
        }

        let resultSettings: any = {};
        Object.keys(this._scopedSettings).forEach((scope) => {
            resultSettings = __deepMerge(
                resultSettings,
                this._scopedSettings[scope],
            );
        });

        return resultSettings;
    }

    save(newConfig = {}) {
        throw new Error(
            `<red>[${this.constructor.name}.save]</red> Sorry but the save feature has not been implemented yet...`,
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
