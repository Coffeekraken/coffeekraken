// @ts-nocheck

import type { ISConfigEnvObj } from '@coffeekraken/s-config';
import __SConfig from '@coffeekraken/s-config';
import type { ISConfigAdapterSettings } from '@coffeekraken/s-config-adapter';
import __SConfigAdapter from '@coffeekraken/s-config-adapter';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import { __unique } from '@coffeekraken/sugar/array';
import { __sha256 } from '@coffeekraken/sugar/crypto';
import { __dirname } from '@coffeekraken/sugar/fs';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import { __deepMerge, __merge } from '@coffeekraken/sugar/object';
import __replaceTokens from '@coffeekraken/sugar/shared/token/replaceTokens';
import __fs from 'fs';
import __path from 'path';

/**
 * @name                  SConfigFolderAdapter
 * @namespace           node
 * @type                  Class
 * @status              beta
 *
 * This adapter let you specify a folder in which to put all the config files and access it normaly as you would with the SConfig system.
 * Each file in the folder will be the first level of the final config object like for example the file "colors.config.js" will be stored
 * in the final object under ```{ colors: ... }```.
 *
 * @param                   {Object}                   [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - fileName ('%name.config.js') {String}: Specify the fileName to use for the file that will store the configs
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
    repo: string[];
    package: string[];
    user: string[];
}

export interface ISConfigFolderAdapterSettings extends ISConfigAdapterSettings {
    fileName: string;
    folderName: string;
    scopes: ISConfigFolderAdapterScopesSettings;
    savingScope: string;
}

export default class SConfigFolderAdapter extends __SConfigAdapter {
    _scopedSettings: any = {};
    _scopedFoldersPaths: any = {};
    _foldersPaths: string[] = [];

    constructor(settings: Partial<ISConfigFolderAdapterSettings>) {
        super(
            __deepMerge(
                {
                    fileName: '%name.config.js',
                    folderName: '.sugar',
                    scopes: {
                        default: [__path.resolve(__dirname(), '../../config')],
                        module: [],
                        repo: [
                            `${__packageRootDir(process.cwd(), {
                                highest: true,
                            })}/%folderName`,
                        ],
                        package: [
                            `${__packageRootDir(process.cwd())}/%folderName`,
                        ],
                        user: [
                            `${__packageRootDir(
                                process.cwd(),
                            )}/.local/%folderName`,
                        ],
                    },
                    savingScope: 'user',
                },
                settings || {},
            ),
        );

        // determine the running format (cjs|esm)
        try {
            if (module !== undefined) format = 'cjs';
        } catch (e) {}

        // handle each scopes
        Object.keys(this.settings.scopes).forEach((scope) => {
            let scopeFoldersPathArray = this.settings.scopes[scope];

            if (scopeFoldersPathArray) {
                if (!Array.isArray(scopeFoldersPathArray))
                    scopeFoldersPathArray = [scopeFoldersPathArray];
                scopeFoldersPathArray = scopeFoldersPathArray.map((path) => {
                    return __replaceTokens(
                        path.replace('%folderName', this.settings.folderName),
                    );
                    // .replace(/\%format/g, format);
                });
            }

            // append to the scoped folders path array
            this._scopedFoldersPaths[scope] = scopeFoldersPathArray;
        });

        // const watchPaths: string[] = [];
        // Object.keys(this.settings.scopes).forEach(
        //     (scope) => {
        //         if (this._scopedFoldersPaths[scope]) {
        //             this._scopedFoldersPaths[scope] = this._scopedFoldersPaths[
        //                 scope
        //             ].filter((path) => {
        //                 if (
        //                     __fs.existsSync(path) &&
        //                     this._foldersPaths.indexOf(path) === -1
        //                 ) {
        //                     watchPaths.push(path);
        //                     this._foldersPaths.push(path);
        //                     return true;
        //                 }
        //                 return false;
        //             });
        //         }
        //     },
        // );

        // // watch for changes
        // __chokidar
        //     .watch(__unique(watchPaths), {
        //         ignoreInitial: true,
        //     })
        //     .on('change', (p) => {
        //         this.update(p);
        //     })
        //     .on('unlink', (p) => this.update(p))
        //     .on('add', (p) => this.update(p));
    }

    async integrity() {
        let filesAddedTimes = 0;
        for (let [scope, folderPaths] of Object.entries(
            this._scopedFoldersPaths,
        )) {
            for (let i = 0; i < folderPaths.length; i++) {
                const folderPath = folderPaths[i];
                if (!__fs.existsSync(folderPath)) continue;
                const filesPaths = __fs.readdirSync(folderPath);
                for (let j = 0; j < filesPaths.length; j++) {
                    const filePath = `${folderPath}/${filesPaths[j]}`;
                    try {
                        const stats = __fs.statSync(filePath);
                        filesAddedTimes += stats.mtime.getTime();
                    } catch (e) {}
                }
            }
        }
        const hash = __sha256.encrypt(`${filesAddedTimes}`);
        return hash;
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

            if (!__fs.existsSync(path)) continue;

            const paths = __fs.readdirSync(path);

            for (let j = 0; j < paths.length; j++) {
                let file = paths[j],
                    filePath = `${path}/${file}`,
                    deleteAfterLoad = false;
                const configId = filePath
                    .split('/')
                    .slice(-1)[0]
                    .replace(/\.config\.(t|j)s(on)?$/, '');

                if (!filePath.match(/\.(j|t)s(on)?$/)) continue;

                if (
                    filePath.match(/\.js$/) &&
                    __fs.existsSync(filePath.replace(/\.js$/, '.ts'))
                ) {
                    continue;
                }

                let buildTemporaryRes;
                let importedConfig;

                let importSettings = {};
                if (filePath.match(/\.json$/)) {
                    importSettings = {
                        assert: { type: 'json' },
                    };
                }

                if (filePath.match(/\.ts$/)) {
                    buildTemporaryRes =
                        await __STypescriptBuilder.buildTemporary(filePath);
                    filePath = buildTemporaryRes.path;
                    importedConfig = await import(filePath, importSettings);
                } else {
                    importedConfig = await import(filePath, importSettings);
                }

                // if (
                //     !filePath.includes(
                //         this.settings.fileName.replace('%name', ''),
                //     )
                // ) {
                //     // if (buildTemporaryRes) {
                //     //     buildTemporaryRes.remove();
                //     // }
                //     continue;
                // }

                // if (buildTemporaryRes) {
                //     // buildTemporaryRes.remove();
                // }

                let configData = importedConfig.default;
                if (typeof configData === 'function') {
                    configData = configData({
                        env,
                        config: configObj ?? {},
                        get this() {
                            return configObj[configId];
                        },
                        get theme() {
                            if (!configObj.theme) return {};
                            const themeId = `${configObj.theme.theme}-${configObj.theme.variant}`;
                            return configObj.theme.themes[themeId];
                        },
                        extends: __merge,
                        // extends(...objects) {
                        //     return __merge.apply(null, ...objects.reverse());
                        // },
                    });
                }

                const configKey = __path.basename(
                    filePath.replace(/\.config\.(j|t)s$/, ''),
                );

                configObj[configKey] = __deepMerge(
                    configObj[configKey] ?? {},
                    configData,
                );

                if (
                    importedConfig.postprocess &&
                    typeof importedConfig.postprocess === 'function'
                ) {
                    __SConfig.registerPostprocess(
                        this.name,
                        configKey,
                        importedConfig.postprocess,
                    );
                }

                if (
                    importedConfig.preprocess &&
                    typeof importedConfig.preprocess === 'function'
                ) {
                    __SConfig.registerPreprocess(
                        this.name,
                        configKey,
                        importedConfig.preprocess,
                    );
                }
            }
        }

        return Object.assign({}, configObj);
    }

    async load({ clearCache, env, config }) {
        // try {
        for (let i = 0; i < Object.keys(this._scopedFoldersPaths).length; i++) {
            const scope = Object.keys(this._scopedFoldersPaths)[i];
            const scopedFoldersPaths = this._scopedFoldersPaths[scope];
            if (scopedFoldersPaths && scopedFoldersPaths.length) {
                this._scopedSettings[scope] = await this._load(
                    scopedFoldersPaths,
                    clearCache,
                    env,
                    config,
                );
            }
        }
        // } catch (e) {
        //     console.log('fffffffff', e);
        // }

        let resultSettings: any = {};
        Object.keys(this._scopedSettings).forEach((scope) => {
            resultSettings = __deepMerge(
                resultSettings,
                this._scopedSettings[scope],
            );
        });

        return resultSettings;
    }
}
