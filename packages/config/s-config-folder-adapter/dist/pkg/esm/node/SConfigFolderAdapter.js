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
import { __dirname } from '@coffeekraken/sugar/fs';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import { __unique } from '@coffeekraken/sugar/array';
import __sha256 from '@coffeekraken/sugar/shared/crypt/sha256';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __merge from '@coffeekraken/sugar/shared/object/merge';
import __replaceTokens from '@coffeekraken/sugar/shared/token/replaceTokens';
import __fs from 'fs';
import __path from 'path';
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
        catch (e) { }
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
            let filesAddedTimes = 0;
            for (let [scope, folderPaths] of Object.entries(this._scopedFoldersPaths)) {
                for (let i = 0; i < folderPaths.length; i++) {
                    const folderPath = folderPaths[i];
                    if (!__fs.existsSync(folderPath))
                        continue;
                    const filesPaths = __fs.readdirSync(folderPath);
                    for (let j = 0; j < filesPaths.length; j++) {
                        const filePath = `${folderPath}/${filesPaths[j]}`;
                        try {
                            const stats = __fs.statSync(filePath);
                            filesAddedTimes += stats.mtime.getTime();
                        }
                        catch (e) { }
                    }
                }
            }
            const hash = __sha256.encrypt(`${filesAddedTimes}`);
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
                    if (!filePath.match(/\.(j|t)s(on)?$/))
                        continue;
                    if (filePath.match(/\.js$/) &&
                        __fs.existsSync(filePath.replace(/\.js$/, '.ts'))) {
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
                            yield __STypescriptBuilder.buildTemporary(filePath);
                        filePath = buildTemporaryRes.path;
                        importedConfig = yield import(filePath, importSettings);
                    }
                    else {
                        importedConfig = yield import(filePath, importSettings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFHZCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUUvQyxPQUFPLGdCQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sZ0JBQWdCLE1BQU0sOENBQThDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sT0FBTyxNQUFNLHlDQUF5QyxDQUFDO0FBQzlELE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBQzdFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUEyQzFCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sb0JBQXFCLFNBQVEsZ0JBQWdCO0lBSzlELFlBQVksUUFBZ0Q7UUFDeEQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsVUFBVSxFQUFFLFFBQVE7WUFDcEIsTUFBTSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sRUFBRSxFQUFFO2dCQUNWLElBQUksRUFBRTtvQkFDRixHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDL0IsT0FBTyxFQUFFLElBQUk7cUJBQ2hCLENBQUMsY0FBYztpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29C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