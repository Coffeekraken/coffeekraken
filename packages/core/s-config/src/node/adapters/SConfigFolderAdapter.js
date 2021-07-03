// @ts-nocheck
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __fs from 'fs';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SConfigAdapter from '../../shared/adapters/SConfigAdapter';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __path from 'path';
import * as __chokidar from 'chokidar';
import __SConfig from '../../shared/SConfig';
export default class SConfigFolderAdapter extends __SConfigAdapter {
    constructor(settings) {
        super(__deepMerge({
            configFolderAdapter: {
                fileName: '[name].config.js',
                folderName: '.sugar',
                scopes: {
                    default: [__path.resolve(__dirname, '../../config')],
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
        const configObj = {};
        folderPaths = __unique(folderPaths);
        folderPaths.forEach((path) => {
            __fs.readdirSync(path).forEach((file) => {
                if (!file.match(/\.js(on)?$/))
                    return;
                if (!file.includes(this.configFolderAdapterSettings.fileName.replace('[name]', '')))
                    return;
                const configFilePath = `${path}/${file}`;
                if (clearCache)
                    delete require.cache[require.resolve(configFilePath)];
                const configData = require(configFilePath);
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
            });
            // process.env[`SConfigFolderAdapter-${scope}`] = JSON.stringify(configObj);
        });
        return Object.assign({}, configObj);
    }
    load(clearCache = false) {
        try {
            Object.keys(this._scopedFoldersPaths).forEach((scope) => {
                const scopedFoldersPaths = this._scopedFoldersPaths[scope];
                if (scopedFoldersPaths && scopedFoldersPaths.length) {
                    this._scopedSettings[scope] = this._load(scopedFoldersPaths, scope, clearCache);
                }
                // else if (process.env[`SConfigFolderAdapter-${scope}`]) {
                //   this._scopedSettings[scope] = JSON.parse(
                //     process.env[`SConfigFolderAdapter-${scope}`]
                //   );
                // }
            });
        }
        catch (e) {
            console.log('fffffffff', e);
        }
        let resultSettings = {};
        Object.keys(this._scopedSettings).forEach((scope) => {
            resultSettings = __deepMerge(resultSettings, this._scopedSettings[scope]);
        });
        return resultSettings;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnRm9sZGVyQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBSXRFLE9BQU8sZ0JBQWdCLE1BQU0sc0NBQXNDLENBQUM7QUFDcEUsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxLQUFLLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxTQUFTLE1BQU0sc0JBQXNCLENBQUM7QUFnRDdDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sb0JBQXFCLFNBQVEsZ0JBQWdCO0lBU2hFLFlBQVksUUFBb0Q7UUFDOUQsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLG1CQUFtQixFQUFFO2dCQUNuQixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsTUFBTSxFQUFFO29CQUNOLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUNwRCxNQUFNLEVBQUUsRUFBRTtvQkFDVixPQUFPLEVBQUUsRUFBRTtvQkFDWCxJQUFJLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDO29CQUMvRCxPQUFPLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzVELElBQUksRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLHNC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