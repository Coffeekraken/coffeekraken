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
const fs_3 = require("@coffeekraken/sugar/fs");
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
        this._hashes = {};
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
                    return (0, token_1.__replaceTokens)(path.replace('%folderName', this.settings.folderName));
                });
            }
            // append to the scoped folders path array
            this._scopedFoldersPaths[scope] = scopeFoldersPathArray;
        });
        let fullFoldersPaths = [];
        for (let [scope, folderPaths] of Object.entries(this._scopedFoldersPaths)) {
            fullFoldersPaths = [
                ...fullFoldersPaths,
                ...folderPaths.map((folderPath) => {
                    return `${folderPath}/${this.settings.fileName.replace('%name', '*')}`;
                }),
            ];
        }
        this._pool = (0, fs_3.__pool)(fullFoldersPaths, {
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
    integrity() {
        if (!Object.keys(this._hashes).length) {
            this._pool.files.forEach((file) => {
                this._hashes[file.path] = file.hash;
            });
        }
        const hashes = [];
        for (let [path, hash] of Object.entries(this._hashes)) {
            hashes.push(hash);
        }
        const hash = crypto_1.__sha256.encrypt(`${hashes.join('-')}`);
        return hash;
    }
    _load(folderPaths, env, configObj) {
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
                    let buildTemporaryRes;
                    let importedConfig;
                    let importTimeout = setTimeout(() => {
                        throw new Error(`[SConfigFolderAdapter.load] The configuration "<cyan>${filePath}</cyan>" cannot be loaded for some unknown reason(s)...`);
                    }, 5000);
                    if (filePath.match(/\.ts$/)) {
                        buildTemporaryRes =
                            yield s_typescript_builder_1.default.buildTemporary(filePath);
                        filePath = buildTemporaryRes.path;
                        importedConfig = yield import(`${filePath}?v=${Math.round(Math.random() * 99999)}`);
                    }
                    else if (filePath.match(/\.json$/)) {
                        importedConfig = (0, fs_1.__readJsonSync)(filePath);
                    }
                    else {
                        importedConfig = yield import(`${filePath}?v=${Math.round(Math.random() * 99999)}`);
                    }
                    if (!importedConfig) {
                        importedConfig = {};
                    }
                    // CJS async import resolution
                    if ((importedConfig === null || importedConfig === void 0 ? void 0 : importedConfig.__esModule) && (importedConfig === null || importedConfig === void 0 ? void 0 : importedConfig.default)) {
                        importedConfig = importedConfig.default;
                    }
                    clearTimeout(importTimeout);
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
    load({ env, config }) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < Object.keys(this._scopedFoldersPaths).length; i++) {
                const scope = Object.keys(this._scopedFoldersPaths)[i];
                const scopedFoldersPaths = this._scopedFoldersPaths[scope];
                if (scopedFoldersPaths && scopedFoldersPaths.length) {
                    this._scopedSettings[scope] = yield this._load(scopedFoldersPaths, env, config);
                }
            }
            let resultSettings = {};
            Object.keys(this._scopedSettings).forEach((scope) => {
                resultSettings = (0, object_1.__deepMerge)(resultSettings, this._scopedSettings[scope]);
            });
            return resultSettings;
        });
    }
}
exports.default = SConfigFolderAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLHNFQUErQztBQUUvQyxzRkFBOEQ7QUFDOUQsOEZBQXNFO0FBQ3RFLHFEQUFxRDtBQUNyRCx1REFBc0Q7QUFDdEQsK0NBQW1FO0FBQ25FLHVEQUFrRTtBQUNsRSxtREFBNEQ7QUFDNUQscURBQTREO0FBQzVELDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUIsK0NBQWdEO0FBb0RoRCxNQUFxQixvQkFBcUIsU0FBUSwwQkFBZ0I7SUFNOUQsWUFBWSxRQUFnRDtRQUN4RCxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixVQUFVLEVBQUUsUUFBUTtZQUNwQixNQUFNLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFBLGNBQVMsR0FBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLEVBQUUsRUFBRTtnQkFDVixJQUFJLEVBQUU7b0JBQ0YsR0FBRyxJQUFBLHVCQUFnQixFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDL0IsT0FBTyxFQUFFLElBQUk7cUJBQ2hCLENBQUMsY0FBYztpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLEdBQUcsSUFBQSx1QkFBZ0IsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYztpQkFDbkQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEdBQUcsSUFBQSx1QkFBZ0IsRUFDZixPQUFPLENBQUMsR0FBRyxFQUFFLENBQ2hCLHFCQUFxQjtpQkFDekI7YUFDSjtZQUNELFdBQVcsRUFBRSxNQUFNO1NBQ3RCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBaENOLG9CQUFlLEdBQVEsRUFBRSxDQUFDO1FBQzFCLHdCQUFtQixH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