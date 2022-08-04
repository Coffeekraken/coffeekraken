"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const packageRootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRootDir"));
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
const sha256_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/sha256"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const merge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/merge"));
const replaceTokens_1 = __importDefault(require("@coffeekraken/sugar/shared/token/replaceTokens"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class SConfigFolderAdapter extends s_config_adapter_1.default {
    constructor(settings) {
        super((0, deepMerge_1.default)({
            fileName: '%name.config.js',
            folderName: '.sugar',
            scopes: {
                default: [path_1.default.resolve((0, dirname_1.default)(), '../../config')],
                module: [],
                repo: [
                    `${(0, packageRootDir_1.default)(process.cwd(), {
                        highest: true,
                    })}/%folderName`,
                ],
                package: [
                    `${(0, packageRootDir_1.default)(process.cwd())}/%folderName`,
                ],
                user: [
                    `${(0, packageRootDir_1.default)(process.cwd())}/.local/%folderName`,
                ],
            },
            savingScope: 'user',
        }, settings || {}));
        this._scopedSettings = {};
        this._scopedFoldersPaths = {};
        this._foldersPaths = [];
        // determine the running format (cjs|esm)
        let format = 'esm';
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
                    return (0, replaceTokens_1.default)(path.replace('%folderName', this.settings.folderName));
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
                    if (!fs_1.default.existsSync(folderPath))
                        continue;
                    const filesPaths = fs_1.default.readdirSync(folderPath);
                    for (let j = 0; j < filesPaths.length; j++) {
                        const filePath = `${folderPath}/${filesPaths[j]}`;
                        try {
                            const stats = fs_1.default.statSync(filePath);
                            filesAddedTimes += stats.mtime.getTime();
                        }
                        catch (e) { }
                    }
                }
            }
            const hash = sha256_1.default.encrypt(`${filesAddedTimes}`);
            return hash;
        });
    }
    _load(folderPaths, clearCache = false, env, configObj) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            folderPaths = (0, unique_1.default)(folderPaths);
            for (let i = 0; i < folderPaths.length; i++) {
                const path = folderPaths[i];
                if (!fs_1.default.existsSync(path))
                    continue;
                const paths = fs_1.default.readdirSync(path);
                for (let j = 0; j < paths.length; j++) {
                    let file = paths[j], filePath = `${path}/${file}`, deleteAfterLoad = false;
                    const configId = filePath
                        .split('/')
                        .slice(-1)[0]
                        .replace(/\.config\.(t|j)s(on)?$/, '');
                    if (!filePath.match(/\.(j|t)s(on)?$/))
                        continue;
                    if (filePath.match(/\.js$/) &&
                        fs_1.default.existsSync(filePath.replace(/\.js$/, '.ts'))) {
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
                            yield s_typescript_builder_1.default.buildTemporary(filePath);
                        filePath = buildTemporaryRes.path;
                        importedConfig = yield Promise.resolve().then(() => __importStar(require(filePath)));
                    }
                    else {
                        importedConfig = yield Promise.resolve().then(() => __importStar(require(filePath)));
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
                            extends: merge_1.default,
                            // extends(...objects) {
                            //     return __merge.apply(null, ...objects.reverse());
                            // },
                        });
                    }
                    const configKey = path_1.default.basename(filePath.replace(/\.config\.(j|t)s$/, ''));
                    configObj[configKey] = (0, deepMerge_1.default)((_a = configObj[configKey]) !== null && _a !== void 0 ? _a : {}, configData);
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
                resultSettings = (0, deepMerge_1.default)(resultSettings, this._scopedSettings[scope]);
            });
            return resultSettings;
        });
    }
}
exports.default = SConfigFolderAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2Qsc0VBQStDO0FBRS9DLHNGQUE4RDtBQUM5RCw4RkFBc0U7QUFDdEUsa0ZBQTREO0FBQzVELGtHQUE0RTtBQUM1RSxxRkFBK0Q7QUFDL0QscUZBQStEO0FBQy9ELDRGQUFzRTtBQUN0RSxvRkFBOEQ7QUFDOUQsbUdBQTZFO0FBQzdFLDRDQUFzQjtBQUN0QixnREFBMEI7QUEyQzFCLE1BQXFCLG9CQUFxQixTQUFRLDBCQUFnQjtJQUs5RCxZQUFZLFFBQWdEO1FBQ3hELEtBQUssQ0FDRCxJQUFBLG1CQUFXLEVBQ1A7WUFDSSxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLE1BQU0sRUFBRTtnQkFDSixPQUFPLEVBQUUsQ0FBQyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUEsaUJBQVMsR0FBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLEVBQUUsRUFBRTtnQkFDVixJQUFJLEVBQUU7b0JBQ0YsR0FBRyxJQUFBLHdCQUFnQixFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDL0IsT0FBTyxFQUFFLElBQUk7cUJBQ2hCLENBQUMsY0FBYztpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLEdBQUcsSUFBQSx3QkFBZ0IsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYztpQkFDbkQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEdBQUcsSUFBQSx3QkFBZ0IsRUFDZixPQUFPLENBQUMsR0FBRyxFQUFFLENBQ2hCLHFCQUFxQjtpQkFDekI7YUFDSjtZQUNELFdBQVcsRUFBRSxNQUFNO1NBQ3RCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBL0JOLG9CQUFlLEdBQVEs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