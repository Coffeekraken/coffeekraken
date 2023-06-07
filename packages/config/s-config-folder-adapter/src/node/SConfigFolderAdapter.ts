// @ts-nocheck

import type { ISConfigEnvObj } from '@coffeekraken/s-config';
import __SConfig from '@coffeekraken/s-config';
import type { ISConfigAdapterSettings } from '@coffeekraken/s-config-adapter';
import __SConfigAdapter from '@coffeekraken/s-config-adapter';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import { __unique } from '@coffeekraken/sugar/array';
import { __sha256 } from '@coffeekraken/sugar/crypto';
import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import { __deepMerge, __merge } from '@coffeekraken/sugar/object';
import __replaceTokens from '@coffeekraken/sugar/shared/token/replaceTokens';
import __fs from 'fs';
import __path from 'path';

import { __hashFromSync } from '@coffeekraken/sugar/hash';

/**
 * @name                  SConfigFolderAdapter
 * @namespace           node
 * @type                  Class
 * @platform                node
 * @status              beta
 *
 * This adapter let you specify a folder in which to put all the config files and access it normaly as you would with the SConfig system.
 * Each file in the folder will be the first level of the final config object like for example the file "colors.config.js" will be stored
 * in the final object under ```{ colors: ... }```.
 *
 * @param                   {ISConfigFolderAdapterSettings}                   [settings={}]         The adapter settings that let you work with the good data storage solution...
 *
 * @setting         {String}            [fileName='%name.config.js']        Specify the config filename schema
 * @setting         {String}            [folderName='.sugar']               Specify the folder name schema
 * @setting         {ISConfigFolderAdapterScopesSettings}       [scopes={}]     Specify the scopes "default", "module", "repo", "package" and "user" folder paths
 *
 * @snippet         __SConfigFolderAdapter($1)
 * new __SConfigFolderAdapter($1)
 *
 * @example         js
 * import __SConfigFolderAdapter from '@coffeekraken/s-config-folder-adapter';
 * import __SConfig from '@coffeekraken/s-config';
 * const config = new __SConfig($1, new __SConfigFolderAdapter($2));
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
        const hashes: string[] = [];

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
                        hashes.push(__hashFromSync(filePath));
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }

        const hash = __sha256.encrypt(`${hashes.join('-')}`);
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

                // exclude .d.ts files
                if (filePath.match(/\.d\.ts$/)) continue;
                // make sure it's a js, ts or json file
                if (!filePath.match(/\.(j|t)s(on)?$/)) continue;

                if (
                    filePath.match(/\.js$/) &&
                    __fs.existsSync(filePath.replace(/\.js$/, '.ts'))
                ) {
                    continue;
                }

                let buildTemporaryRes;
                let importedConfig;

                let importTimeout = setTimeout(() => {
                    throw new Error(
                        `[SConfigFolderAdapter.load] The configuration "<cyan>${filePath}</cyan>" cannot be loaded for some unknown reason(s)...`,
                    );
                }, 5000);

                if (filePath.match(/\.ts$/)) {
                    buildTemporaryRes =
                        await __STypescriptBuilder.buildTemporary(filePath);
                    filePath = buildTemporaryRes.path;
                    importedConfig = await import(filePath);
                } else if (filePath.match(/\.json$/)) {
                    importedConfig = __readJsonSync(filePath);
                } else {
                    importedConfig = await import(filePath);
                }

                clearTimeout(importTimeout);

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

                let parentFreezedConfig = {};
                try {
                    parentFreezedConfig = JSON.parse(
                        JSON.stringify(configObj[configId] ?? {}),
                    );
                } catch (e) {}

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
                        parent: parentFreezedConfig,
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
