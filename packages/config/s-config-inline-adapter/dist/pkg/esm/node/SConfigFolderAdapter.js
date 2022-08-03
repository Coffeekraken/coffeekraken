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
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __fs from 'fs';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SConfigAdapter from '@coffeekraken/s-config-adapter';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __path from 'path';
import __SConfig from '@coffeekraken/s-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __sha256 from '@coffeekraken/sugar/shared/crypt/sha256';
import __replaceTokens from '@coffeekraken/sugar/shared/token/replaceTokens';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
export default class SConfigFolderAdapter extends __SConfigAdapter {
    constructor(settings) {
        super(__deepMerge({
            configFolderAdapter: {
                fileName: '[name].config.js',
                folderName: '.sugar',
                scopes: {
                    default: [
                        __path.resolve(__dirname(), '../../config'),
                    ],
                    module: [],
                    extends: [],
                    repo: [
                        `${__packageRootDir(process.cwd(), {
                            highest: true,
                        })}/[folderName]`,
                    ],
                    package: [
                        `${__packageRootDir(process.cwd())}/[folderName]`,
                    ],
                    user: [
                        `${__packageRootDir(process.cwd())}/.local/[folderName]`,
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
                    return __replaceTokens(path.replace('[folderName]', this.configFolderAdapterSettings.folderName));
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
                    if (!filePath.match(/\.(j|t)s(on)?$/))
                        continue;
                    if (filePath.match(/\.js$/) &&
                        __fs.existsSync(filePath.replace(/\.js$/, '.ts'))) {
                        continue;
                    }
                    if (filePath.match(/\.ts$/)) {
                        const builder = new __STypescriptBuilder();
                        const res = yield builder.build({
                            inDir: __path.dirname(filePath),
                            glob: __path.basename(filePath),
                            outDir: __path.dirname(filePath),
                            formats: ['esm'],
                        });
                        deleteAfterLoad = true;
                        filePath = res.files[0].file.path;
                    }
                    if (!filePath.includes(this.configFolderAdapterSettings.fileName.replace('[name]', ''))) {
                        continue;
                    }
                    // @TODO      check for delete cache with import
                    const importedConfig = yield import(filePath);
                    if (deleteAfterLoad) {
                        setTimeout(() => {
                            try {
                                __fs.unlinkSync(filePath);
                            }
                            catch (e) { }
                        }, 200);
                    }
                    let configData = importedConfig.default;
                    if (typeof configData === 'function') {
                        configData = configData(env, configObj !== null && configObj !== void 0 ? configObj : {});
                    }
                    const configKey = __path.basename(filePath.replace(/\.config\.(j|t)s$/, ''));
                    configObj[configKey] = __deepMerge((_a = configObj[configKey]) !== null && _a !== void 0 ? _a : {}, configData);
                    if (importedConfig.postprocess &&
                        typeof importedConfig.postprocess === 'function') {
                        __SConfig.registerPostprocess(this.configAdapterSettings.name, configKey, importedConfig.postprocess);
                    }
                    if (importedConfig.preprocess &&
                        typeof importedConfig.preprocess === 'function') {
                        __SConfig.registerPreprocess(this.configAdapterSettings.name, configKey, importedConfig.preprocess);
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
                resultSettings = __deepMerge(resultSettings, this._scopedSettings[scope]);
            });
            return resultSettings;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFJdEUsT0FBTyxnQkFBZ0IsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUcxQixPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRCxPQUFPLGVBQWUsTUFBTSxnREFBZ0QsQ0FBQztBQUU3RSxPQUFPLG9CQUFvQixNQUFNLG9DQUFvQyxDQUFDO0FBaUR0RSxNQUFNLENBQUMsT0FBTyxPQUFPLG9CQUFxQixTQUFRLGdCQUFnQjtJQVM5RCxZQUFZLFFBQW9EO1FBQzVELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxtQkFBbUIsRUFBRTtnQkFDakIsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLE1BQU0sRUFBRTtvQkFDSixPQUFPLEVBQUU7d0JBQ0wsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxjQUFjLENBQUM7cUJBQzlDO29CQUNELE1BQU0sRUFBRSxFQUFFO29CQUNWLE9BQU8sRUFBRSxFQUFFO29CQUNYLElBQUksRUFBRTt3QkFDRixHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTs0QkFDL0IsT0FBTyxFQUFFLElBQUk7eUJBQ2hCLENBQUMsZUFBZTtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLEdBQUcs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