"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const writeFileSync_1 = __importDefault(require("../../fs/writeFileSync"));
const diff_1 = __importDefault(require("../../object/diff"));
const SConfigAdapter_1 = __importDefault(require("./SConfigAdapter"));
const localDir_1 = __importDefault(require("../../fs/localDir"));
module.exports = class SConfigFsAdapter extends SConfigAdapter_1.default {
    constructor(settings = {}) {
        settings = deepMerge_1.default({
            name: null,
            filename: '[name].config.js',
            defaultConfigPath: null,
            appConfigPath: `${process.cwd()}/[filename]`,
            userConfigPath: `${localDir_1.default()}/[filename]`
        }, settings);
        super(settings);
        this.settings.filename = this.settings.filename.replace('[name]', this.name);
        if (this.settings.defaultConfigPath)
            this.settings.defaultConfigPath = this.settings.defaultConfigPath.replace('[filename]', this.settings.filename);
        if (this.settings.appConfigPath)
            this.settings.appConfigPath = this.settings.appConfigPath.replace('[filename]', this.settings.filename);
        if (this.settings.userConfigPath)
            this.settings.userConfigPath = this.settings.userConfigPath.replace('[filename]', this.settings.filename);
    }
    load() {
        this._defaultConfig = {};
        this._appConfig = {};
        this._userConfig = {};
        // load the default config if exists
        if (this.settings.defaultConfigPath &&
            fs_1.default.existsSync(this.settings.defaultConfigPath)) {
            this._defaultConfig = require(`${this.settings.defaultConfigPath}`);
        }
        // load the app config if exists
        if (this.settings.appConfigPath &&
            fs_1.default.existsSync(this.settings.appConfigPath)) {
            this._appConfig = require(`${this.settings.appConfigPath}`);
        }
        // load the user config
        if (this.settings.userConfigPath &&
            fs_1.default.existsSync(this.settings.userConfigPath)) {
            this._userConfig = require(`${this.settings.userConfigPath}`);
        }
        // mix the configs and save them in the instance
        return deepMerge_1.default(this._defaultConfig, this._appConfig, this._userConfig);
    }
    save(newConfig = {}) {
        if (!this.settings.userConfigPath) {
            throw new Error(`You try to save the config "${this.name}" but the "settings.userConfigPath" is not set...`);
        }
        const baseConfig = deepMerge_1.default(this._defaultConfig, this._appConfig);
        newConfig = diff_1.default(baseConfig, newConfig);
        const newConfigString = `
      module.exports = ${JSON.stringify(newConfig)};
    `;
        // write the new config file
        writeFileSync_1.default(this.settings.userConfigPath, newConfigString);
        return true;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZzQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWdGc0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCw0Q0FBc0I7QUFDdEIsdUVBQWlEO0FBQ2pELDJFQUFxRDtBQUNyRCw2REFBdUM7QUFDdkMsc0VBQWdEO0FBQ2hELGlFQUEyQztBQTJCM0MsaUJBQVMsTUFBTSxnQkFBaUIsU0FBUSx3QkFBZ0I7SUFDdEQsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWE7WUFDNUMsY0FBYyxFQUFFLEdBQUcsa0JBQVUsRUFBRSxhQUFhO1NBQzdDLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFDRixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUNyRCxRQUFRLEVBQ1IsSUFBSSxDQUFDLElBQUksQ0FDVixDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQjtZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUN2RSxZQUFZLEVBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3ZCLENBQUM7UUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQy9ELFlBQVksRUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDdkIsQ0FBQztRQUNKLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FDakUsWUFBWSxFQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUN2QixDQUFDO0lBQ04sQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV0QixvQ0FBb0M7UUFDcEMsSUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQjtZQUMvQixZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFDaEQ7WUFDQSxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1NBQ3JFO1FBRUQsZ0NBQWdDO1FBQ2hDLElBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhO1lBQzNCLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFDNUM7WUFDQSxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztTQUM3RDtRQUVELHVCQUF1QjtRQUN2QixJQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYztZQUM1QixZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQzdDO1lBQ0EsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7U0FDL0Q7UUFFRCxnREFBZ0Q7UUFDaEQsT0FBTyxtQkFBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FDYiwrQkFBK0IsSUFBSSxDQUFDLElBQUksbURBQW1ELENBQzVGLENBQUM7U0FDSDtRQUVELE1BQU0sVUFBVSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckUsU0FBUyxHQUFHLGNBQU0sQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFMUMsTUFBTSxlQUFlLEdBQUc7eUJBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7S0FDN0MsQ0FBQztRQUVGLDRCQUE0QjtRQUM1Qix1QkFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRS9ELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGLENBQUMifQ==