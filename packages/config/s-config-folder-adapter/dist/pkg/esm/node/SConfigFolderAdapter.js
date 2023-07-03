// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SConfig from '@coffeekraken/s-config';
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
import { __hashFromSync } from '@coffeekraken/sugar/hash';
export default class SConfigFolderAdapter extends __SConfigAdapter {
    constructor(settings) {
        super(__deepMerge({
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
                    `${__packageRootDir(process.cwd())}/.local/%folderName`,
                ],
            },
            savingScope: 'user',
        }, settings || {}));
        this._scopedSettings = {};
        this._scopedFoldersPaths = {};
        this._foldersPaths = [];
        // determine the running format (cjs|esm)
        try {
            if (module !== undefined)
                format = 'cjs';
        }
        catch (e) {
        }
        // handle each scopes
        Object.keys(this.settings.scopes).forEach((scope) => {
            let scopeFoldersPathArray = this.settings.scopes[scope];
            if (scopeFoldersPathArray) {
                if (!Array.isArray(scopeFoldersPathArray))
                    scopeFoldersPathArray = [scopeFoldersPathArray];
                scopeFoldersPathArray = scopeFoldersPathArray.map((path) => {
                    return __replaceTokens(path.replace('%folderName', this.settings.folderName));
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
    integrity() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashes = [];
            for (let [scope, folderPaths] of Object.entries(this._scopedFoldersPaths)) {
                for (let i = 0; i < folderPaths.length; i++) {
                    const folderPath = folderPaths[i];
                    if (!__fs.existsSync(folderPath))
                        continue;
                    const filesPaths = __fs.readdirSync(folderPath);
                    for (let j = 0; j < filesPaths.length; j++) {
                        const filePath = `${folderPath}/${filesPaths[j]}`;
                        try {
                            hashes.push(__hashFromSync(filePath));
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                }
            }
            const hash = __sha256.encrypt(`${hashes.join('-')}`);
            return hash;
        });
    }
    _load(folderPaths, clearCache = false, env, configObj) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            folderPaths = __unique(folderPaths);
            for (let i = 0; i < folderPaths.length; i++) {
                const path = folderPaths[i];
                if (!__fs.existsSync(path))
                    continue;
                const paths = __fs.readdirSync(path);
                for (let j = 0; j < paths.length; j++) {
                    let file = paths[j], filePath = `${path}/${file}`, deleteAfterLoad = false;
                    const configId = filePath
                        .split('/')
                        .slice(-1)[0]
                        .replace(/\.config\.(t|j)s(on)?$/, '');
                    // exclude .d.ts files
                    if (filePath.match(/\.d\.ts$/))
                        continue;
                    // make sure it's a js, ts or json file
                    if (!filePath.match(/\.(j|t)s(on)?$/))
                        continue;
                    if (filePath.match(/\.js$/) &&
                        __fs.existsSync(filePath.replace(/\.js$/, '.ts'))) {
                        continue;
                    }
                    let buildTemporaryRes;
                    let importedConfig;
                    let importTimeout = setTimeout(() => {
                        throw new Error(`[SConfigFolderAdapter.load] The configuration "<cyan>${filePath}</cyan>" cannot be loaded for some unknown reason(s)...`);
                    }, 5000);
                    if (filePath.match(/\.ts$/)) {
                        buildTemporaryRes =
                            yield __STypescriptBuilder.buildTemporary(filePath);
                        filePath = buildTemporaryRes.path;
                        importedConfig = yield import(filePath);
                    }
                    else if (filePath.match(/\.json$/)) {
                        importedConfig = __readJsonSync(filePath);
                    }
                    else {
                        importedConfig = yield import(filePath);
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
                    let configData = importedConfig.default;
                    if (typeof configData === 'function') {
                        configData = configData({
                            env,
                            config: configObj !== null && configObj !== void 0 ? configObj : {},
                            get this() {
                                return configObj[configId];
                            },
                            get theme() {
                                if (!configObj.theme)
                                    return {};
                                const themeId = `${configObj.theme.theme}-${configObj.theme.variant}`;
                                return configObj.theme.themes[themeId];
                            },
                            extends: __merge,
                            // extends(...objects) {
                            //     return __merge.apply(null, ...objects.reverse());
                            // },
                        });
                    }
                    const configKey = __path.basename(filePath.replace(/\.config\.(j|t)s$/, ''));
                    configObj[configKey] = __deepMerge((_a = configObj[configKey]) !== null && _a !== void 0 ? _a : {}, configData);
                    if (importedConfig.postprocess &&
                        typeof importedConfig.postprocess === 'function') {
                        __SConfig.registerPostprocess(this.name, configKey, importedConfig.postprocess);
                    }
                    if (importedConfig.preprocess &&
                        typeof importedConfig.preprocess === 'function') {
                        __SConfig.registerPreprocess(this.name, configKey, importedConfig.preprocess);
                    }
                }
            }
            return Object.assign({}, configObj);
        });
    }
    load({ clearCache, env, config }) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            for (let i = 0; i < Object.keys(this._scopedFoldersPaths).length; i++) {
                const scope = Object.keys(this._scopedFoldersPaths)[i];
                const scopedFoldersPaths = this._scopedFoldersPaths[scope];
                if (scopedFoldersPaths && scopedFoldersPaths.length) {
                    this._scopedSettings[scope] = yield this._load(scopedFoldersPaths, clearCache, env, config);
                }
            }
            // } catch (e) {
            //     console.log('fffffffff', e);
            // }
            let resultSettings = {};
            Object.keys(this._scopedSettings).forEach((scope) => {
                resultSettings = __deepMerge(resultSettings, this._scopedSettings[scope]);
            });
            return resultSettings;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFHZCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUUvQyxPQUFPLGdCQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBa0QxRCxNQUFNLENBQUMsT0FBTyxPQUFPLG9CQUFxQixTQUFRLGdCQUFnQjtJQUs5RCxZQUFZLFFBQWdEO1FBQ3hELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLE1BQU0sRUFBRTtnQkFDSixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLEVBQUUsRUFBRTtnQkFDVixJQUFJLEVBQUU7b0JBQ0YsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFF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