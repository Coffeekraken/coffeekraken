"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const writeFileSync_1 = __importDefault(require("../../fs/writeFileSync"));
const diff_1 = __importDefault(require("../../object/diff"));
const SConfigAdapter_1 = __importDefault(require("./SConfigAdapter"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const path_1 = __importDefault(require("path"));
const chokidar_1 = __importDefault(require("chokidar"));
class SConfigFolderAdapter extends SConfigAdapter_1.default {
    get configFolderAdapterSettings() {
        return this._settings.configFolderAdapter;
    }
    constructor(settings) {
        super(deepMerge_1.default({
            configFolderAdapter: {
                fileName: '[name].config.js',
                folderName: '.sugar',
                defaultConfigPath: path_1.default.resolve(__dirname, '../../config'),
                appConfigPath: `${packageRoot_1.default(process.cwd())}/[folderName]`,
                userConfigPath: `${packageRoot_1.default(process.cwd())}/.local/[folderName]`
            }
        }, settings || {}));
        this.configFolderAdapterSettings.folderName = this.configFolderAdapterSettings.folderName.replace('[name]', this.name);
        if (this.configFolderAdapterSettings.defaultConfigPath)
            this.configFolderAdapterSettings.defaultConfigPath = this.configFolderAdapterSettings.defaultConfigPath.replace('[folderName]', this.configFolderAdapterSettings.folderName);
        if (this.configFolderAdapterSettings.appConfigPath)
            this.configFolderAdapterSettings.appConfigPath = this.configFolderAdapterSettings.appConfigPath.replace('[folderName]', this.configFolderAdapterSettings.folderName);
        if (this.configFolderAdapterSettings.userConfigPath)
            this.configFolderAdapterSettings.userConfigPath = this.configFolderAdapterSettings.userConfigPath.replace('[folderName]', this.configFolderAdapterSettings.folderName);
        // watch for changes
        const watchPaths = [];
        if (this.configFolderAdapterSettings.defaultConfigPath &&
            fs_1.default.existsSync(this.configFolderAdapterSettings.defaultConfigPath)) {
            watchPaths.push(this.configFolderAdapterSettings.defaultConfigPath);
        }
        if (this.configFolderAdapterSettings.appConfigPath &&
            fs_1.default.existsSync(this.configFolderAdapterSettings.appConfigPath)) {
            watchPaths.push(this.configFolderAdapterSettings.appConfigPath);
        }
        if (this.configFolderAdapterSettings.userConfigPath &&
            fs_1.default.existsSync(this.configFolderAdapterSettings.userConfigPath)) {
            watchPaths.push(this.configFolderAdapterSettings.userConfigPath);
        }
        chokidar_1.default
            .watch(watchPaths, {
            ignoreInitial: true
        })
            .on('change', (p) => this.emit('update', p))
            .on('unlink', (p) => this.emit('update', p))
            .on('add', (p) => this.emit('update', p));
    }
    load() {
        this._defaultConfig = {};
        this._appConfig = {};
        this._userConfig = {};
        if (this.configFolderAdapterSettings.defaultConfigPath &&
            fs_1.default.existsSync(this.configFolderAdapterSettings.defaultConfigPath)) {
            process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.defaultConfigPath}`] = true;
            fs_1.default
                .readdirSync(this.configFolderAdapterSettings.defaultConfigPath)
                .forEach((file) => {
                if (!file.includes(this.configFolderAdapterSettings.fileName.replace('[name]', '')))
                    return;
                if (this._defaultConfig[file.replace('.config.js', '')] !== undefined)
                    return;
                const configData = require(`${this.configFolderAdapterSettings.defaultConfigPath}/${file}`);
                this._defaultConfig[file.replace('.config.js', '')] =
                    Object.keys(configData).length === 1 && configData.default
                        ? configData.default
                        : configData;
            });
            process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.defaultConfigPath}`] = JSON.stringify(this._defaultConfig);
        }
        else if (process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.defaultConfigPath}`]) {
            this._defaultConfig = JSON.parse(process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.defaultConfigPath}`]);
        }
        if (this.configFolderAdapterSettings.defaultConfigPath !==
            this.configFolderAdapterSettings.appConfigPath &&
            this.configFolderAdapterSettings.appConfigPath &&
            fs_1.default.existsSync(this.configFolderAdapterSettings.appConfigPath)) {
            process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.appConfigPath}`] = true; // intermediate value
            fs_1.default
                .readdirSync(this.configFolderAdapterSettings.appConfigPath)
                .forEach((file) => {
                if (!file.includes(this.configFolderAdapterSettings.fileName.replace('[name]', '')))
                    return;
                const configData = require(`${this.configFolderAdapterSettings.appConfigPath}/${file}`);
                this._appConfig[file.replace('.config.js', '')] =
                    Object.keys(configData).length === 1 && configData.default
                        ? configData.default
                        : configData;
            });
            process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.appConfigPath}`] = JSON.stringify(this._appConfig);
        }
        else if (process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.appConfigPath}`]) {
            this._appConfig = JSON.parse(process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.appConfigPath}`]);
        }
        if (this.configFolderAdapterSettings.defaultConfigPath !==
            this.configFolderAdapterSettings.userConfigPath &&
            this.configFolderAdapterSettings.appConfigPath !==
                this.configFolderAdapterSettings.userConfigPath &&
            this.configFolderAdapterSettings.userConfigPath &&
            fs_1.default.existsSync(this.configFolderAdapterSettings.userConfigPath)) {
            process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.userConfigPath}`] = true; // intermediate value
            fs_1.default
                .readdirSync(this.configFolderAdapterSettings.userConfigPath)
                .forEach((file) => {
                if (!file.includes(this.configFolderAdapterSettings.fileName.replace('[name]', '')))
                    return;
                const configData = require(`${this.configFolderAdapterSettings.userConfigPath}/${file}`);
                this._userConfig[file.replace('.config.js', '')] =
                    Object.keys(configData).length === 1 && configData.default
                        ? configData.default
                        : configData;
            });
            process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.userConfigPath}`] = JSON.stringify(this._userConfig);
        }
        else if (process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.userConfigPath}`]) {
            this._userConfig = JSON.parse(process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.userConfigPath}`]);
        }
        // mix the configs and save them in the instance
        const n = deepMerge_1.default(this._defaultConfig, this._appConfig, this._userConfig);
        return n;
    }
    save(newConfig = {}) {
        if (!this.configFolderAdapterSettings.userConfigPath) {
            throw new Error(`You try to save the config "${this.name}" but the "settings.userConfigPath" is not set...`);
        }
        const baseConfig = deepMerge_1.default(this._defaultConfig, this._appConfig);
        Object.keys(baseConfig).forEach((name) => {
            const configToSave = diff_1.default(baseConfig[name], newConfig[name] || {});
            const newConfigString = `
      module.exports = ${JSON.stringify(configToSave)};
    `;
            // write the new config file
            writeFileSync_1.default(this.configFolderAdapterSettings.userConfigPath +
                '/' +
                this.configFolderAdapterSettings.fileName.replace('[name]', name), newConfigString);
        });
        return true;
    }
}
exports.default = SConfigFolderAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9jb25maWcvYWRhcHRlcnMvU0NvbmZpZ0ZvbGRlckFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNENBQXNCO0FBQ3RCLHVFQUFpRDtBQUNqRCwyRUFBcUQ7QUFDckQsNkRBQXVDO0FBQ3ZDLHNFQUFnRDtBQUVoRCx5RUFBbUQ7QUFDbkQsZ0RBQTBCO0FBQzFCLHdEQUFrQztBQW1DbEMsTUFBcUIsb0JBQXFCLFNBQVEsd0JBQWdCO0lBQ2hFLElBQUksMkJBQTJCO1FBQzdCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxtQkFBbUIsQ0FBQztJQUNuRCxDQUFDO0lBRUQsWUFBWSxRQUEyQztRQUNyRCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLG1CQUFtQixFQUFFO2dCQUNuQixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsaUJBQWlCLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDO2dCQUM1RCxhQUFhLEVBQUUsR0FBRyxxQkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlO2dCQUM3RCxjQUFjLEVBQUUsR0FBRyxxQkFBYSxDQUM5QixPQUFPLENBQUMsR0FBRyxFQUFFLENBQ2Qsc0JBQXNCO2FBQ3hCO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQy9GLFFBQVEsRUFDUixJQUFJLENBQUMsSUFBSSxDQUNWLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxpQkFBaUI7WUFDcEQsSUFBSSxDQUFDLDJCQUEyQixD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