"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_config_1 = __importDefault(require("@coffeekraken/s-config"));
const s_config_adapter_1 = __importDefault(require("@coffeekraken/s-config-adapter"));
const s_typescript_builder_1 = __importDefault(require("@coffeekraken/s-typescript-builder"));
const array_1 = require("@coffeekraken/sugar/array");
const crypto_1 = require("@coffeekraken/sugar/crypto");
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const token_1 = require("@coffeekraken/sugar/token");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const hash_1 = require("@coffeekraken/sugar/hash");
class SConfigFolderAdapter extends s_config_adapter_1.default {
    constructor(settings) {
        super((0, object_1.__deepMerge)({
            fileName: '%name.config.js',
            folderName: '.sugar',
            scopes: {
                default: [path_2.default.resolve((0, fs_1.__dirname)(), '../../config')],
                module: [],
                repo: [
                    `${(0, path_1.__packageRootDir)(process.cwd(), {
                        highest: true,
                    })}/%folderName`,
                ],
                package: [
                    `${(0, path_1.__packageRootDir)(process.cwd())}/%folderName`,
                ],
                user: [
                    `${(0, path_1.__packageRootDir)(process.cwd())}/.local/%folderName`,
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
                    return (0, token_1.__replaceTokens)(path.replace('%folderName', this.settings.folderName));
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
                    if (!fs_2.default.existsSync(folderPath))
                        continue;
                    const filesPaths = fs_2.default.readdirSync(folderPath);
                    for (let j = 0; j < filesPaths.length; j++) {
                        const filePath = `${folderPath}/${filesPaths[j]}`;
                        try {
                            hashes.push((0, hash_1.__hashFromSync)(filePath));
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                }
            }
            const hash = crypto_1.__sha256.encrypt(`${hashes.join('-')}`);
            return hash;
        });
    }
    _load(folderPaths, clearCache = false, env, configObj) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            folderPaths = (0, array_1.__unique)(folderPaths);
            for (let i = 0; i < folderPaths.length; i++) {
                const path = folderPaths[i];
                if (!fs_2.default.existsSync(path))
                    continue;
                const paths = fs_2.default.readdirSync(path);
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
                        fs_2.default.existsSync(filePath.replace(/\.js$/, '.ts'))) {
                        continue;
                    }
                    let buildTemporaryRes;
                    let importedConfig;
                    let importTimeout = setTimeout(() => {
                        throw new Error(`[SConfigFolderAdapter.load] The configuration "<cyan>${filePath}</cyan>" cannot be loaded for some unknown reason(s)...`);
                    }, 5000);
                    if (filePath.match(/\.ts$/)) {
                        buildTemporaryRes =
                            yield s_typescript_builder_1.default.buildTemporary(filePath);
                        filePath = buildTemporaryRes.path;
                        importedConfig = yield import(filePath);
                    }
                    else if (filePath.match(/\.json$/)) {
                        importedConfig = (0, fs_1.__readJsonSync)(filePath);
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
                            extends: object_1.__merge,
                            // extends(...objects) {
                            //     return __merge.apply(null, ...objects.reverse());
                            // },
                        });
                    }
                    const configKey = path_2.default.basename(filePath.replace(/\.config\.(j|t)s$/, ''));
                    configObj[configKey] = (0, object_1.__deepMerge)((_a = configObj[configKey]) !== null && _a !== void 0 ? _a : {}, configData);
                    if (importedConfig.postprocess &&
                        typeof importedConfig.postprocess === 'function') {
                        s_config_1.default.registerPostprocess(this.name, configKey, importedConfig.postprocess);
                    }
                    if (importedConfig.preprocess &&
                        typeof importedConfig.preprocess === 'function') {
                        s_config_1.default.registerPreprocess(this.name, configKey, importedConfig.preprocess);
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
                resultSettings = (0, object_1.__deepMerge)(resultSettings, this._scopedSettings[scope]);
            });
            return resultSettings;
        });
    }
}
exports.default = SConfigFolderAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLHNFQUErQztBQUUvQyxzRkFBOEQ7QUFDOUQsOEZBQXNFO0FBQ3RFLHFEQUFxRDtBQUNyRCx1REFBc0Q7QUFDdEQsK0NBQW1FO0FBQ25FLHVEQUFrRTtBQUNsRSxtREFBNEQ7QUFDNUQscURBQTREO0FBQzVELDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUIsbURBQTBEO0FBa0QxRCxNQUFxQixvQkFBcUIsU0FBUSwwQkFBZ0I7SUFLOUQsWUFBWSxRQUFnRDtRQUN4RCxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixVQUFVLEVBQUUsUUFBUTtZQUNwQixNQUFNLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFBLGNBQVMsR0FBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLEVBQUUsRUFBRTtnQkFDVixJQUFJLEVBQUU7b0JBQ0YsR0FBRyxJQUFBLHVCQUFnQixFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDL0IsT0FBTyxFQUFFLElBQUk7cUJBQ2hCLENBQUMsY0FBYztpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLEdBQUcsSUFBQSx1QkFBZ0IsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYztpQkFDbkQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEdBQUcsSUFBQSx1QkFBZ0IsRUFDZixPQUFPLENBQUMsR0FBRyxFQUFFLENBQ2hCLHFCQUFxQjtpQkFDekI7YUFDSjtZQUNELFdBQVcsRUFBRSxNQUFNO1NBQ3RCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBL0JOLG9CQUFlLEdBQVEsRUFBRSxDQUFDO1FBQzFCLHdCQUFtQixH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