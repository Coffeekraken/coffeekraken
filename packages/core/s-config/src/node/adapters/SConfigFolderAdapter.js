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