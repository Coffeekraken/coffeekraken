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
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_config_adapter_1 = __importDefault(require("@coffeekraken/s-config-adapter"));
const packageRootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRootDir"));
const path_1 = __importDefault(require("path"));
const s_config_1 = __importDefault(require("@coffeekraken/s-config"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const sha256_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/sha256"));
const replaceTokens_1 = __importDefault(require("@coffeekraken/sugar/shared/token/replaceTokens"));
const s_typescript_builder_1 = __importDefault(require("@coffeekraken/s-typescript-builder"));
class SConfigFolderAdapter extends s_config_adapter_1.default {
    constructor(settings) {
        super((0, deepMerge_1.default)({
            configFolderAdapter: {
                fileName: '[name].config.js',
                folderName: '.sugar',
                scopes: {
                    default: [
                        path_1.default.resolve((0, dirname_1.default)(), '../../config'),
                    ],
                    module: [],
                    extends: [],
                    repo: [
                        `${(0, packageRootDir_1.default)(process.cwd(), {
                            highest: true,
                        })}/[folderName]`,
                    ],
                    package: [
                        `${(0, packageRootDir_1.default)(process.cwd())}/[folderName]`,
                    ],
                    user: [
                        `${(0, packageRootDir_1.default)(process.cwd())}/.local/[folderName]`,
                    ],
                },
                savingScope: 'user',
            },
        }, settings || {}));
        this._scopedSettings = {};
        this._scopedFoldersPaths = {};
        this._foldersPaths = [];
        // handle configs
        this.configFolderAdapterSettings.folderName = this.configFolderAdapterSettings.folderName.replace('[name]', this.name);
        // determine the running format (cjs|esm)
        let format = 'esm';
        try {
            if (module !== undefined)
                format = 'cjs';
        }
        catch (e) { }
        // handle each scopes
        Object.keys(this.configFolderAdapterSettings.scopes).forEach((scope) => {
            let scopeFoldersPathArray = this.configFolderAdapterSettings
                .scopes[scope];
            if (scopeFoldersPathArray) {
                if (!Array.isArray(scopeFoldersPathArray))
                    scopeFoldersPathArray = [scopeFoldersPathArray];
                scopeFoldersPathArray = scopeFoldersPathArray.map((path) => {
                    return (0, replaceTokens_1.default)(path.replace('[folderName]', this.configFolderAdapterSettings.folderName));
                    // .replace(/\%format/g, format);
                });
            }
            // append to the scoped folders path array
            this._scopedFoldersPaths[scope] = scopeFoldersPathArray;
        });
        // const watchPaths: string[] = [];
        // Object.keys(this.configFolderAdapterSettings.scopes).forEach(
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
    get configFolderAdapterSettings() {
        return this.settings.configFolderAdapter;
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
                    if (!filePath.match(/\.(j|t)s(on)?$/))
                        continue;
                    if (filePath.match(/\.js$/) &&
                        fs_1.default.existsSync(filePath.replace(/\.js$/, '.ts'))) {
                        continue;
                    }
                    if (filePath.match(/\.ts$/)) {
                        const builder = new s_typescript_builder_1.default();
                        const res = yield builder.build({
                            inDir: path_1.default.dirname(filePath),
                            glob: path_1.default.basename(filePath),
                            outDir: path_1.default.dirname(filePath),
                            formats: ['esm'],
                        });
                        deleteAfterLoad = true;
                        filePath = res.files[0].file.path;
                    }
                    if (!filePath.includes(this.configFolderAdapterSettings.fileName.replace('[name]', ''))) {
                        continue;
                    }
                    // @TODO      check for delete cache with import
                    const importedConfig = yield Promise.resolve().then(() => __importStar(require(filePath)));
                    if (deleteAfterLoad) {
                        setTimeout(() => {
                            try {
                                fs_1.default.unlinkSync(filePath);
                            }
                            catch (e) { }
                        }, 200);
                    }
                    let configData = importedConfig.default;
                    if (typeof configData === 'function') {
                        configData = configData(env, configObj !== null && configObj !== void 0 ? configObj : {});
                    }
                    const configKey = path_1.default.basename(filePath.replace(/\.config\.(j|t)s$/, ''));
                    configObj[configKey] = (0, deepMerge_1.default)((_a = configObj[configKey]) !== null && _a !== void 0 ? _a : {}, configData);
                    if (importedConfig.postprocess &&
                        typeof importedConfig.postprocess === 'function') {
                        s_config_1.default.registerPostprocess(this.configAdapterSettings.name, configKey, importedConfig.postprocess);
                    }
                    if (importedConfig.preprocess &&
                        typeof importedConfig.preprocess === 'function') {
                        s_config_1.default.registerPreprocess(this.configAdapterSettings.name, configKey, importedConfig.preprocess);
                    }
                }
            }
            return Object.assign({}, configObj);
        });
    }
    load(clearCache = false, env, configObj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let i = 0; i < Object.keys(this._scopedFoldersPaths).length; i++) {
                    const scope = Object.keys(this._scopedFoldersPaths)[i];
                    const scopedFoldersPaths = this._scopedFoldersPaths[scope];
                    if (scopedFoldersPaths && scopedFoldersPaths.length) {
                        this._scopedSettings[scope] = yield this._load(scopedFoldersPaths, clearCache, env, configObj);
                    }
                }
            }
            catch (e) {
                console.log('fffffffff', e);
            }
            let resultSettings = {};
            Object.keys(this._scopedSettings).forEach((scope) => {
                resultSettings = (0, deepMerge_1.default)(resultSettings, this._scopedSettings[scope]);
            });
            return resultSettings;
        });
    }
}
exports.default = SConfigFolderAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQscUZBQStEO0FBQy9ELDRDQUFzQjtBQUN0Qiw0RkFBc0U7QUFJdEUsc0ZBQThEO0FBQzlELGtHQUE0RTtBQUM1RSxnREFBMEI7QUFHMUIsc0VBQStDO0FBQy9DLGtGQUE0RDtBQUM1RCxxRkFBK0Q7QUFDL0QsbUdBQTZFO0FBRTdFLDhGQUFzRTtBQWlEdEUsTUFBcUIsb0JBQXFCLFNBQVEsMEJBQWdCO0lBUzlELFlBQVksUUFBb0Q7UUFDNUQsS0FBSyxDQUNELElBQUEsbUJBQVcsRUFDUDtZQUNJLG1CQUFtQixFQUFFO2dCQUNqQixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsTUFBTSxFQUFFO29CQUNKLE9BQU8sRUFBRTt3QkFDTCxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUEsaUJBQVMsR0FBRSxFQUFFLGNBQWMsQ0FBQztxQkFDOUM7b0JBQ0QsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsSUFBSSxFQUFFO3dCQUNGLEdBQUcsSUFBQSx3QkFBZ0IsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBQy9CLE9BQU8sRUFBRSxJQUFJO3lCQUNoQixDQUFDLGVBQWU7cUJBQ3BCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxHQUFHLElBQUEsd0JBQWdCLEVBQ2YsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUNoQixlQUFlO3FCQUNuQjtvQkFDRCxJQUFJLEVBQUU7d0JBQ0YsR0FBRyxJQUFBLHdCQUFnQixFQUNmLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FDaEIsc0JBQXNCO3FCQUMxQjtpQkFDSjtnQkFDRCxXQUFXLEVBQUUsTUFBTTthQUN0QjtTQUNKLEVBQ0QsUUFBUSxJQUFJ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