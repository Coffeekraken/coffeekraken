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