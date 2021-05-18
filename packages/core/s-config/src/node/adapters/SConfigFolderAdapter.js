// @ts-nocheck
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __fs from 'fs';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SConfigAdapter from '../../shared/adapters/SConfigAdapter';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
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
                    repo: [`${__packageRoot(process.cwd(), true)}/[folderName]`],
                    package: [`${__packageRoot(process.cwd())}/[folderName]`],
                    user: [`${__packageRoot(process.cwd())}/.local/[folderName]`]
                },
                savingScope: 'user'
            }
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
            .watch(watchPaths, {
            ignoreInitial: true
        })
            .on('change', (p) => this.update())
            .on('unlink', (p) => this.update())
            .on('add', (p) => this.update());
    }
    get configFolderAdapterSettings() {
        return this._settings.configFolderAdapter;
    }
    _load(folderPaths, scope) {
        const configObj = {};
        folderPaths = __unique(folderPaths);
        folderPaths.forEach((path) => {
            __fs.readdirSync(path).forEach((file) => {
                if (!file.match(/\.js(on)?$/))
                    return;
                if (!file.includes(this.configFolderAdapterSettings.fileName.replace('[name]', '')) ||
                    configObj[file.replace('.config.js', '')] !== undefined)
                    return;
                const configData = require(`${path}/${file}`);
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
            process.env[`SConfigFolderAdapter-${scope}`] = JSON.stringify(configObj);
        });
        return Object.assign({}, configObj);
    }
    load() {
        try {
            Object.keys(this._scopedFoldersPaths).forEach((scope) => {
                const scopedFoldersPaths = this._scopedFoldersPaths[scope];
                if (scopedFoldersPaths) {
                    this._scopedSettings[scope] = this._load(scopedFoldersPaths, scope);
                }
                else if (process.env[`SConfigFolderAdapter-${scope}`]) {
                    this._scopedSettings[scope] = JSON.parse(process.env[`SConfigFolderAdapter-${scope}`]);
                }
            });
        }
        catch (e) {
            console.log('EEEE', e);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnRm9sZGVyQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBSXRFLE9BQU8sZ0JBQWdCLE1BQU0sc0NBQXNDLENBQUM7QUFDcEUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ3ZDLE9BQU8sU0FBUyxNQUFNLHNCQUFzQixDQUFDO0FBZ0Q3QyxNQUFNLENBQUMsT0FBTyxPQUFPLG9CQUFxQixTQUFRLGdCQUFnQjtJQVNoRSxZQUFZLFFBQW9EO1FBQzlELEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxtQkFBbUIsRUFBRTtnQkFDbkIsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLE1BQU0sRUFBRTtvQkFDTixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFDcEQsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUM7b0JBQzVELE9BQU8sRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQ3pELElBQUksRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FB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