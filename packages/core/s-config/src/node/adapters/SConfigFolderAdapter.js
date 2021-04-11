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
const SConfigAdapter_1 = __importDefault(require("../../shared/adapters/SConfigAdapter"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/shared/path/packageRoot"));
const path_1 = __importDefault(require("path"));
const __chokidar = __importStar(require("chokidar"));
class SConfigFolderAdapter extends SConfigAdapter_1.default {
    constructor(settings) {
        super(deepMerge_1.default({
            configFolderAdapter: {
                fileName: '[name].config.js',
                folderName: '.sugar',
                scopes: {
                    default: [path_1.default.resolve(__dirname, '../../config')],
                    module: [],
                    extends: [],
                    repo: [`${packageRoot_1.default(process.cwd(), true)}/[folderName]`],
                    package: [`${packageRoot_1.default(process.cwd())}/[folderName]`],
                    user: [`${packageRoot_1.default(process.cwd())}/.local/[folderName]`]
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
                    if (fs_1.default.existsSync(path) &&
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
            process.env[`SConfigFolderAdapter-${scope}`] = JSON.stringify(configObj);
        });
        return Object.assign({}, configObj);
    }
    load() {
        Object.keys(this._scopedFoldersPaths).forEach((scope) => {
            const scopedFoldersPaths = this._scopedFoldersPaths[scope];
            if (scopedFoldersPaths) {
                this._scopedSettings[scope] = this._load(scopedFoldersPaths, scope);
            }
            else if (process.env[`SConfigFolderAdapter-${scope}`]) {
                this._scopedSettings[scope] = JSON.parse(process.env[`SConfigFolderAdapter-${scope}`]);
            }
        });
        let resultSettings = {};
        Object.keys(this._scopedSettings).forEach((scope) => {
            resultSettings = deepMerge_1.default(resultSettings, this._scopedSettings[scope]);
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
exports.default = SConfigFolderAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnRm9sZGVyQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsNENBQXNCO0FBQ3RCLDRGQUFzRTtBQUd0RSwwRkFBb0U7QUFDcEUsOEZBQXdFO0FBQ3hFLGdEQUEwQjtBQUMxQixxREFBdUM7QUFtQ3ZDLE1BQXFCLG9CQUFxQixTQUFRLHdCQUFnQjtJQVNoRSxZQUFZLFFBQTJDO1FBQ3JELEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsbUJBQW1CLEVBQUU7Z0JBQ25CLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixNQUFNLEVBQUU7b0JBQ04sT0FBTyxFQUFFLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7b0JBQ3BELE1BQU0sRUFBRSxFQUFFO29CQUNWLE9BQU8sRUFBRSxFQUFFO29CQUNYLElBQUksRUFBRSxDQUFDLEdBQUcscUJBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQztvQkFDNUQsT0FBTyxFQUFFLENBQUMsR0FBRyxxQkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQ3pELElBQUksRUFBRSxDQUFDLEdBQUcscUJBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQzlEO2dCQUNELFdBQVcsRUFBRSxNQUFNO2FBQ3BCO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQXhCSixvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQix3QkFBbUIsR0FBUSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBYSxFQUFFLENBQUM7UUF3QjNCLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsMkJBQTJCLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUMvRixRQUFRLEVBQ1IsSUFBSSxDQUFDLElBQUksQ0FDVixDQUFDO1FBRUYscUJBQXFCO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3JFLElBQUkscUJBQXFCLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FDakUsS0FBSyxDQUNOLENBQUM7WUFFRixJQUFJLHFCQUFxQixFQUFFO2dCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztvQkFDdkMscUJBQXFCLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUNsRCxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDekQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUNqQixjQUFjLEVBQ2QsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFVBQVUsQ0FDNUMsQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsMENBQTBDO1lBQzFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxxQkFBcUIsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FDeEQsS0FBSyxDQUNOLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ2hCLElBQ0UsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUN2Qzt3QkFDQSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDOUIsT0FBTyxJQUFJLENBQUM7cUJBQ2I7b0JBQ0QsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsb0JBQW9CO1FBQ3BCLFVBQVU7YUFDUCxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ2pCLGFBQWEsRUFBRSxJQUFJO1NBQ3BCLENBQUM7YUFDRCxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDbEMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2xDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFwRkQsSUFBSSwyQkFBMkI7UUFDN0IsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDO0lBQ25ELENBQUM7SUFvRkQsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLO1FBQ3RCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVyQixXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0IsWUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDdEMsSUFDRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQ1osSUFBSSxDQUFDLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUNoRTtvQkFDRCxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxTQUFTO29CQUV2RCxPQUFPO2dCQUNULE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7b0JBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFFckQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLG1CQUFXLENBQ2hDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFVBQVUsQ0FBQyxPQUFPO29CQUN4RCxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU87b0JBQ3BCLENBQUMsQ0FBQyxVQUFVLENBQ2YsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBSTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdEQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0QsSUFBSSxrQkFBa0IsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3JFO2lCQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDdkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixLQUFLLEVBQUUsQ0FBQyxDQUM3QyxDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksY0FBYyxHQUFRLEVBQUUsQ0FBQztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNsRCxjQUFjLEdBQUcsbUJBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRTtRQUNqQixNQUFNLElBQUksS0FBSyxDQUNiLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHlFQUF5RSxDQUN4RyxDQUFDO1FBRUYsMERBQTBEO1FBQzFELHFCQUFxQjtRQUNyQixrR0FBa0c7UUFDbEcsT0FBTztRQUNQLElBQUk7UUFFSix3RUFBd0U7UUFFeEUsOENBQThDO1FBQzlDLDBFQUEwRTtRQUUxRSw4QkFBOEI7UUFDOUIsc0RBQXNEO1FBQ3RELEtBQUs7UUFFTCxpQ0FBaUM7UUFDakMscUJBQXFCO1FBQ3JCLHdEQUF3RDtRQUN4RCxjQUFjO1FBQ2QsMkVBQTJFO1FBQzNFLHNCQUFzQjtRQUN0QixPQUFPO1FBQ1AsTUFBTTtRQUVOLGVBQWU7SUFDakIsQ0FBQztDQUNGO0FBeEtELHVDQXdLQyJ9