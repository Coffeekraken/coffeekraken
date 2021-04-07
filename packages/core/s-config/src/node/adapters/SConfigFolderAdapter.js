"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
const diff_1 = __importDefault(require("@coffeekraken/sugar/shared/object/diff"));
const SConfigAdapter_1 = __importDefault(require("../../shared/adapters/SConfigAdapter"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/shared/path/packageRoot"));
const path_1 = __importDefault(require("path"));
const __chokidar = __importStar(require("chokidar"));
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
        if (this.configFolderAdapterSettings.defaultConfigPath) {
            if (!Array.isArray(this.configFolderAdapterSettings.defaultConfigPath))
                this.configFolderAdapterSettings.defaultConfigPath = [
                    this.configFolderAdapterSettings.defaultConfigPath
                ];
            this.configFolderAdapterSettings.defaultConfigPath = this.configFolderAdapterSettings.defaultConfigPath.map((path) => {
                return path.replace('[folderName]', this.configFolderAdapterSettings.folderName);
            });
        }
        if (this.configFolderAdapterSettings.appConfigPath) {
            if (!Array.isArray(this.configFolderAdapterSettings.appConfigPath))
                this.configFolderAdapterSettings.appConfigPath = [
                    this.configFolderAdapterSettings.appConfigPath
                ];
            this.configFolderAdapterSettings.appConfigPath = this.configFolderAdapterSettings.appConfigPath.map((path) => {
                return path.replace('[folderName]', this.configFolderAdapterSettings.folderName);
            });
        }
        if (this.configFolderAdapterSettings.userConfigPath) {
            if (!Array.isArray(this.configFolderAdapterSettings.userConfigPath))
                this.configFolderAdapterSettings.userConfigPath = [
                    this.configFolderAdapterSettings.userConfigPath
                ];
            this.configFolderAdapterSettings.userConfigPath = this.configFolderAdapterSettings.userConfigPath.map((path) => {
                return path.replace('[folderName]', this.configFolderAdapterSettings.folderName);
            });
        }
        // watch for changes
        const watchPaths = [];
        if (this.configFolderAdapterSettings.defaultConfigPath) {
            this.configFolderAdapterSettings.defaultConfigPath = this.configFolderAdapterSettings.defaultConfigPath.filter((path) => {
                if (fs_1.default.existsSync(path)) {
                    watchPaths.push(path);
                    return true;
                }
                return false;
            });
        }
        if (this.configFolderAdapterSettings.appConfigPath) {
            this.configFolderAdapterSettings.appConfigPath = this.configFolderAdapterSettings.appConfigPath.filter((path) => {
                if (fs_1.default.existsSync(path)) {
                    watchPaths.push(path);
                    return true;
                }
                return false;
            });
        }
        if (this.configFolderAdapterSettings.userConfigPath) {
            this.configFolderAdapterSettings.userConfigPath = this.configFolderAdapterSettings.userConfigPath.filter((path) => {
                if (fs_1.default.existsSync(path)) {
                    watchPaths.push(path);
                    return true;
                }
                return false;
            });
        }
        console.log(this.configFolderAdapterSettings);
        __chokidar
            .watch(watchPaths, {
            ignoreInitial: true
        })
            .on('change', (p) => this.update())
            .on('unlink', (p) => this.update())
            .on('add', (p) => this.update());
    }
    _load(folderPaths, level) {
        const configObj = {};
        folderPaths.forEach((path) => {
            fs_1.default.readdirSync(path).forEach((file) => {
                if (!file.includes(this.configFolderAdapterSettings.fileName.replace('[name]', '')) ||
                    configObj[file.replace('.config.js', '')] !== undefined)
                    return;
                const configData = require(`${path}/${file}`);
                const configKey = file.replace('.config.js', '');
                if (!configObj[configKey])
                    configObj[configKey] = {};
                configObj[configKey] = deepMerge_1.default(configObj[configKey], Object.keys(configData).length === 1 && configData.default
                    ? configData.default
                    : configData);
            });
            process.env[`SConfigFolderAdapter-${level}`] = JSON.stringify(configObj);
        });
        return Object.assign({}, configObj);
    }
    load() {
        this._defaultConfig = {};
        this._appConfig = {};
        this._userConfig = {};
        if (this.configFolderAdapterSettings.defaultConfigPath) {
            this._defaultConfig = this._load(this.configFolderAdapterSettings.defaultConfigPath, 'default');
        }
        else if (process.env[`SConfigFolderAdapter-default`]) {
            this._defaultConfig = JSON.parse(process.env[`SConfigFolderAdapter-default`]);
        }
        if (this.configFolderAdapterSettings.appConfigPath) {
            this._appConfig = this._load(this.configFolderAdapterSettings.appConfigPath, 'app');
        }
        else if (process.env[`SConfigFolderAdapter-app`]) {
            this._appConfig = JSON.parse(process.env[`SConfigFolderAdapter-app`]);
        }
        if (this.configFolderAdapterSettings.userConfigPath) {
            this._userConfig = this._load(this.configFolderAdapterSettings.userConfigPath, 'user');
        }
        else if (process.env[`SConfigFolderAdapter-user`]) {
            this._userConfig = JSON.parse(process.env[`SConfigFolderAdapter-user`]);
        }
        console.log(this._appConfig);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnRm9sZGVyQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsNENBQXNCO0FBQ3RCLDRGQUFzRTtBQUN0RSw4RkFBd0U7QUFDeEUsa0ZBQTREO0FBQzVELDBGQUFvRTtBQUNwRSw4RkFBd0U7QUFDeEUsZ0RBQTBCO0FBQzFCLHFEQUF1QztBQW1DdkMsTUFBcUIsb0JBQXFCLFNBQVEsd0JBQWdCO0lBQ2hFLElBQUksMkJBQTJCO1FBQzdCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztJQUNuRCxDQUFDO0lBRUQsWUFBWSxRQUEyQztRQUNyRCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLG1CQUFtQixFQUFFO2dCQUNuQixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsaUJBQWlCLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDO2dCQUM1RCxhQUFhLEVBQUUsR0FBRyxxQkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlO2dCQUM3RCxjQUFjLEVBQUUsR0FBRyxxQkFBYSxDQUM5QixPQUFPLENBQUMsR0FBRyxFQUFFLENBQ2Qsc0JBQXNCO2FBQ3hCO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQy9GLFFBQVEsRUFDUixJQUFJLENBQUMsSUFBSSxDQUNWLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxpQkFBaUIsRUFBRTtZQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJ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