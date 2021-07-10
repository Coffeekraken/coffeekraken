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
                    user: [`${__packageRootDir(process.cwd())}/.local/[folderName]`]
                },
                savingScope: 'user'
            }
        }, settings || {}));
        this._scopedSettings = {};
        this._scopedFoldersPaths = {};
        this._foldersPaths = [];
        // handle configs
        this.configFolderAdapterSettings.folderName =
            this.configFolderAdapterSettings.folderName.replace('[name]', this.name);
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
                    if (__fs.existsSync(path) &&
                        this._foldersPaths.indexOf(path) === -1) {
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
            ignoreInitial: true
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
    _load(folderPaths, scope, clearCache = false) {
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
                    // if (clearCache) delete require.cache[require.resolve(configFilePath)];
                    const { default: configData } = yield import(configFilePath);
                    const configKey = file.replace('.config.js', '');
                    if (!configObj[configKey])
                        configObj[configKey] = {};
                    configObj[configKey] = __deepMerge(configObj[configKey], configData.default ? configData.default : configData);
                    if (configData.prepare && typeof configData.prepare === 'function') {
                        __SConfig.registerPrepare(this.configAdapterSettings.name, configKey, configData.prepare);
                    }
                    if (configData.proxy && typeof configData.proxy === 'function') {
                        __SConfig.registerProxy(this.configAdapterSettings.name, configKey, configData.proxy);
                    }
                }
            }
            return Object.assign({}, configObj);
        });
    }
    load(clearCache = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let i = 0; i < Object.keys(this._scopedFoldersPaths).length; i++) {
                    const scope = Object.keys(this._scopedFoldersPaths)[i];
                    const scopedFoldersPaths = this._scopedFoldersPaths[scope];
                    if (scopedFoldersPaths && scopedFoldersPaths.length) {
                        this._scopedSettings[scope] = yield this._load(scopedFoldersPaths, scope, clearCache);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnRm9sZGVyQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBSXRFLE9BQU8sZ0JBQWdCLE1BQU0sc0NBQXNDLENBQUM7QUFDcEUsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxLQUFLLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxTQUFTLE1BQU0sc0JBQXNCLENBQUM7QUFDN0MsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFnRDVELE1BQU0sQ0FBQyxPQUFPLE9BQU8sb0JBQXFCLFNBQVEsZ0JBQWdCO0lBU2hFLFlBQVksUUFBb0Q7UUFDOUQsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLG1CQUFtQixFQUFFO2dCQUNuQixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsTUFBTSxFQUFFO29CQUNOLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7b0JBQ3RELE1BQU0sRUFBRSxFQUFFO29CQUNWLE9BQU8sRUFBRSxFQUFFO29CQUNYLElBQUksRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUM7b0JBQy9ELE9BQU8sRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDNUQsSUFBSSxFQUFFLENB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