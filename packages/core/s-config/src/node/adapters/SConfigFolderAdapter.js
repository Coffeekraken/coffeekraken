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
import __SConfigAdapter from '../../shared/adapters/SConfigAdapter';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __path from 'path';
import * as __chokidar from 'chokidar';
import __SConfig from '../../shared/SConfig';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default class SConfigFolderAdapter extends __SConfigAdapter {
    constructor(settings) {
        super(__deepMerge({
            configFolderAdapter: {
                fileName: '[name].config.js',
                folderName: '.sugar',
                scopes: {
                    default: [__path.resolve(__dirname(), '../../config')],
                    module: [],
                    extends: [],
                    repo: [`${__packageRootDir(process.cwd(), true)}/[folderName]`],
                    package: [`${__packageRootDir(process.cwd())}/[folderName]`],
                    user: [`${__packageRootDir(process.cwd())}/.local/[folderName]`],
                },
                savingScope: 'user',
            },
        }, settings || {}));
        this._scopedSettings = {};
        this._scopedFoldersPaths = {};
        this._foldersPaths = [];
        // handle configs
        this.configFolderAdapterSettings.folderName = this.configFolderAdapterSettings.folderName.replace('[name]', this.name);
        // handle each scopes
        Object.keys(this.configFolderAdapterSettings.scopes).forEach((scope) => {
            let scopeFoldersPathArray = this.configFolderAdapterSettings.scopes[scope];
            if (scopeFoldersPathArray) {
                if (!Array.isArray(scopeFoldersPathArray))
                    scopeFoldersPathArray = [scopeFoldersPathArray];
                scopeFoldersPathArray = scopeFoldersPathArray.map((path) => {
                    return path.replace('[folderName]', this.configFolderAdapterSettings.folderName);
                });
            }
            // append to the scoped folders path array
            this._scopedFoldersPaths[scope] = scopeFoldersPathArray;
        });
        const watchPaths = [];
        Object.keys(this.configFolderAdapterSettings.scopes).forEach((scope) => {
            if (this._scopedFoldersPaths[scope]) {
                this._scopedFoldersPaths[scope] = this._scopedFoldersPaths[scope].filter((path) => {
                    if (__fs.existsSync(path) && this._foldersPaths.indexOf(path) === -1) {
                        watchPaths.push(path);
                        this._foldersPaths.push(path);
                        return true;
                    }
                    return false;
                });
            }
        });
        // watch for changes
        __chokidar
            .watch(__unique(watchPaths), {
            ignoreInitial: true,
        })
            .on('change', (p) => {
            this.update(p);
        })
            .on('unlink', (p) => this.update(p))
            .on('add', (p) => this.update(p));
    }
    get configFolderAdapterSettings() {
        return this._settings.configFolderAdapter;
    }
    _load(folderPaths, clearCache = false, env, configObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const configObj = {};
            folderPaths = __unique(folderPaths);
            for (let i = 0; i < folderPaths.length; i++) {
                const path = folderPaths[i];
                const paths = __fs.readdirSync(path);
                for (let j = 0; j < paths.length; j++) {
                    const file = paths[j];
                    if (!file.match(/\.js(on)?$/))
                        continue;
                    if (!file.includes(this.configFolderAdapterSettings.fileName.replace('[name]', ''))) {
                        continue;
                    }
                    const configFilePath = `${path}/${file}`;
                    // @TODO      check for delete cache with import
                    const importedConfig = yield import(configFilePath);
                    let configData = importedConfig.default;
                    if (typeof configData === 'function')
                        configData = configData(env, configObj);
                    const configKey = file.replace('.config.js', '');
                    if (!configData)
                        continue;
                    configObj[configKey] = __deepMerge(configObj[configKey], configData);
                    if (importedConfig.prepare && typeof importedConfig.prepare === 'function') {
                        __SConfig.registerPrepare(this.configAdapterSettings.name, configKey, importedConfig.prepare);
                    }
                    if (importedConfig.preprocess && typeof importedConfig.preprocess === 'function') {
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
    save(newConfig = {}) {
        throw new Error(`<red>[${this.constructor.name}.save]</red> Sorry but the save feature has not been implemented yet...`);
        // if (!this.configFolderAdapterSettings.userConfigPath) {
        //   throw new Error(
        //     `You try to save the config "${this.name}" but the "settings.userConfigPath" is not set...`
        //   );
        // }
        // const baseConfig = __deepMerge(this._defaultConfig, this._appConfig);
        // Object.keys(baseConfig).forEach((name) => {
        //   const configToSave = __diff(baseConfig[name], newConfig[name] || {});
        //   const newConfigString = `
        //   module.exports = ${JSON.stringify(configToSave)};
        // `;
        //   // write the new config file
        //   __writeFileSync(
        //     this.configFolderAdapterSettings.userConfigPath +
        //       '/' +
        //       this.configFolderAdapterSettings.fileName.replace('[name]', name),
        //     newConfigString
        //   );
        // });
        // return true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnRm9sZGVyQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBSXRFLE9BQU8sZ0JBQWdCLE1BQU0sc0NBQXNDLENBQUM7QUFDcEUsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxLQUFLLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxTQUE2QixNQUFNLHNCQUFzQixDQUFDO0FBQ2pFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBZ0Q1RCxNQUFNLENBQUMsT0FBTyxPQUFPLG9CQUFxQixTQUFRLGdCQUFnQjtJQVM5RCxZQUFZLFFBQW9EO1FBQzVELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxtQkFBbUIsRUFBRTtnQkFDakIsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLE1BQU0sRUFBRTtvQkFDSixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUN0RCxNQUFNLEVBQUUsRUFBRTtvQkFDVixPQUFPLEVBQUUsRUFBRTtvQkFDWCxJQUFJLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDO29CQUMvRCxPQUFPLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzVELElBQUksRUFBRSxD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