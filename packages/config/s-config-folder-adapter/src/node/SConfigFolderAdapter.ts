// @ts-nocheck

import type { ISConfigEnvObj } from '@coffeekraken/s-config';
import __SConfig from '@coffeekraken/s-config';
import type { ISConfigAdapterSettings } from '@coffeekraken/s-config-adapter';
import __SConfigAdapter from '@coffeekraken/s-config-adapter';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import { __unique } from '@coffeekraken/sugar/array';
import { __sha256 } from '@coffeekraken/sugar/crypto';
import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge, __merge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __replaceTokens } from '@coffeekraken/sugar/token';
import __fs from 'fs';
import __path from 'path';

import { __pool } from '@coffeekraken/sugar/fs';

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
    _pool: any;

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
                });
            }

            // append to the scoped folders path array
            this._scopedFoldersPaths[scope] = scopeFoldersPathArray;
        });

        let fullFoldersPaths = [];
        for (let [scope, folderPaths] of Object.entries(
            this._scopedFoldersPaths,
        )) {
            fullFoldersPaths = [
                ...fullFoldersPaths,
                ...folderPaths.map((folderPath) => {
                    return `${folderPath}/${this.settings.fileName.replace(
                        '%name',
                        '*',
                    )}`;
                }),
            ];
        }

        this._pool = __pool(fullFoldersPaths, {
            watch: true,
        });
        this._pool.on('ready', (files) => {
            this.ready();
        });
        this._pool.on('change', (file) => {
            this._hashes[file.path] = file.hash;
            this.update();
        });
    }

    _hashes: Record<string, string> = {};
    integrity() {
        if (!Object.keys(this._hashes).length) {
            this._pool.files.forEach((file) => {
                this._hashes[file.path] = file.hash;
            });
        }

        const hashes: string[] = [];
        for (let [path, hash] of Object.entries(this._hashes)) {
            hashes.push(hash);
        }

        const hash = __sha256.encrypt(`${hashes.join('-')}`);
        return hash;
    }

    async _load(folderPaths, env: ISConfigEnvObj, configObj) {
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
                    importedConfig = await import(
                        `${filePath}?v=${Math.round(Math.random() * 99999)}`
                    );
                } else if (filePath.match(/\.json$/)) {
                    importedConfig = __readJsonSync(filePath);
                } else {
                    importedConfig = await import(
                        `${filePath}?v=${Math.round(Math.random() * 99999)}`
                    );
                }

                if (!importedConfig) {
                    importedConfig = {};
                }

                // CJS async import resolution
                if (importedConfig?.__esModule && importedConfig?.default) {
                    importedConfig = importedConfig.default;
                }

                clearTimeout(importTimeout);

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

    async load({ env, config }) {
        for (let i = 0; i < Object.keys(this._scopedFoldersPaths).length; i++) {
            const scope = Object.keys(this._scopedFoldersPaths)[i];
            const scopedFoldersPaths = this._scopedFoldersPaths[scope];
            if (scopedFoldersPaths && scopedFoldersPaths.length) {
                this._scopedSettings[scope] = await this._load(
                    scopedFoldersPaths,
                    env,
                    config,
                );
            }
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
}
