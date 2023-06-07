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
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import { __deepMerge, __merge } from '@coffeekraken/sugar/object';
import __replaceTokens from '@coffeekraken/sugar/shared/token/replaceTokens';
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
        var _a, _b;
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
                    let parentFreezedConfig = {};
                    try {
                        parentFreezedConfig = JSON.parse(JSON.stringify((_a = configObj[configId]) !== null && _a !== void 0 ? _a : {}));
                    }
                    catch (e) { }
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
                            parent: parentFreezedConfig,
                            extends: __merge,
                            // extends(...objects) {
                            //     return __merge.apply(null, ...objects.reverse());
                            // },
                        });
                    }
                    const configKey = __path.basename(filePath.replace(/\.config\.(j|t)s$/, ''));
                    configObj[configKey] = __deepMerge((_b = configObj[configKey]) !== null && _b !== void 0 ? _b : {}, configData);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFHZCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUUvQyxPQUFPLGdCQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25FLE9BQU8sZ0JBQWdCLE1BQU0sOENBQThDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRSxPQUFPLGVBQWUsTUFBTSxnREFBZ0QsQ0FBQztBQUM3RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQWtEMUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxvQkFBcUIsU0FBUSxnQkFBZ0I7SUFLOUQsWUFBWSxRQUFnRDtRQUN4RCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixVQUFVLEVBQUUsUUFBUTtZQUNwQixNQUFNLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDdEQsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFO29CQUNGLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dCQUMvQixPQUFPLEVB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