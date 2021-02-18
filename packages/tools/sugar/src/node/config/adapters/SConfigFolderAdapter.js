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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnRm9sZGVyQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw0Q0FBc0I7QUFDdEIsdUVBQWlEO0FBQ2pELDJFQUFxRDtBQUNyRCw2REFBdUM7QUFDdkMsc0VBQWdEO0FBRWhELHlFQUFtRDtBQUNuRCxnREFBMEI7QUFDMUIsd0RBQWtDO0FBbUNsQyxNQUFxQixvQkFBcUIsU0FBUSx3QkFBZ0I7SUFDaEUsSUFBSSwyQkFBMkI7UUFDN0IsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLG1CQUFtQixDQUFDO0lBQ25ELENBQUM7SUFFRCxZQUFZLFFBQTJDO1FBQ3JELEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsbUJBQW1CLEVBQUU7Z0JBQ25CLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixpQkFBaUIsRUFBRSxjQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUM7Z0JBQzVELGFBQWEsRUFBRSxHQUFHLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWU7Z0JBQzdELGNBQWMsRUFBRSxHQUFHLHFCQUFhLENBQzlCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FDZCxzQkFBc0I7YUFDeEI7U0FDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FDL0YsUUFBUSxFQUNSLElBQUksQ0FBQyxJQUFJLENBQ1YsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLDJCQUEyQixDQUFDLGlCQUFpQjtZQUNwRCxJQUFJLENBQUMsMkJBQTJCLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFD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