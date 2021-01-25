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
module.exports = class SConfigFolderAdapter extends SConfigAdapter_1.default {
    constructor(settings = {}) {
        super(settings);
        this.settings.foldername = this.settings.foldername.replace('[name]', this.name);
        if (this.settings.defaultConfigPath)
            this.settings.defaultConfigPath = this.settings.defaultConfigPath.replace('[foldername]', this.settings.foldername);
        if (this.settings.appConfigPath)
            this.settings.appConfigPath = this.settings.appConfigPath.replace('[foldername]', this.settings.foldername);
        if (this.settings.userConfigPath)
            this.settings.userConfigPath = this.settings.userConfigPath.replace('[foldername]', this.settings.foldername);
    }
    load() {
        this._defaultConfig = {};
        this._appConfig = {};
        this._userConfig = {};
        // load the default config if exists
        // if (
        //   !process.env[`SConfigFolderAdapter-${this.settings.defaultConfigPath}`] &&
        //   this.settings.defaultConfigPath &&
        //   __fs.existsSync(this.settings.defaultConfigPath)
        // ) {
        if (this.settings.defaultConfigPath &&
            fs_1.default.existsSync(this.settings.defaultConfigPath)) {
            process.env[`SConfigFolderAdapter-${this.settings.defaultConfigPath}`] = true;
            fs_1.default.readdirSync(this.settings.defaultConfigPath).forEach((file) => {
                if (!file.includes(this.settings.filename.replace('[name]', '')))
                    return;
                if (this._defaultConfig[file.replace('.config.js', '')] !== undefined)
                    return;
                this._defaultConfig[file.replace('.config.js', '')] = require(`${this.settings.defaultConfigPath}/${file}`);
            });
            process.env[`SConfigFolderAdapter-${this.settings.defaultConfigPath}`] = JSON.stringify(this._defaultConfig);
        }
        else if (process.env[`SConfigFolderAdapter-${this.settings.defaultConfigPath}`]) {
            this._defaultConfig = JSON.parse(process.env[`SConfigFolderAdapter-${this.settings.defaultConfigPath}`]);
        }
        // load the app config if exists
        // if (
        //   !process.env[`SConfigFolderAdapter-${this.settings.appConfigPath}`] &&
        //   this.settings.defaultConfigPath !== this.settings.appConfigPath &&
        //   this.settings.appConfigPath &&
        //   __fs.existsSync(this.settings.appConfigPath)
        // ) {
        if (this.settings.defaultConfigPath !== this.settings.appConfigPath &&
            this.settings.appConfigPath &&
            fs_1.default.existsSync(this.settings.appConfigPath)) {
            process.env[`SConfigFolderAdapter-${this.settings.appConfigPath}`] = true; // intermediate value
            fs_1.default.readdirSync(this.settings.appConfigPath).forEach((file) => {
                if (!file.includes(this.settings.filename.replace('[name]', '')))
                    return;
                this._appConfig[file.replace('.config.js', '')] = require(`${this.settings.appConfigPath}/${file}`);
            });
            process.env[`SConfigFolderAdapter-${this.settings.appConfigPath}`] = JSON.stringify(this._appConfig);
        }
        else if (process.env[`SConfigFolderAdapter-${this.settings.appConfigPath}`]) {
            this._appConfig = JSON.parse(process.env[`SConfigFolderAdapter-${this.settings.appConfigPath}`]);
        }
        // load the user config
        // if (
        //   !process.env[`SConfigFolderAdapter-${this.settings.userConfigPath}`] &&
        //   this.settings.defaultConfigPath !== this.settings.userConfigPath &&
        //   this.settings.appConfigPath !== this.settings.userConfigPath &&
        //   this.settings.userConfigPath &&
        //   __fs.existsSync(this.settings.userConfigPath)
        // ) {
        if (this.settings.defaultConfigPath !== this.settings.userConfigPath &&
            this.settings.appConfigPath !== this.settings.userConfigPath &&
            this.settings.userConfigPath &&
            fs_1.default.existsSync(this.settings.userConfigPath)) {
            process.env[`SConfigFolderAdapter-${this.settings.userConfigPath}`] = true; // intermediate value
            fs_1.default.readdirSync(this.settings.userConfigPath).forEach((file) => {
                if (!file.includes(this.settings.filename.replace('[name]', '')))
                    return;
                this._userConfig[file.replace('.config.js', '')] = require(`${this.settings.userConfigPath}/${file}`);
            });
            process.env[`SConfigFolderAdapter-${this.settings.userConfigPath}`] = JSON.stringify(this._userConfig);
        }
        else if (process.env[`SConfigFolderAdapter-${this.settings.userConfigPath}`]) {
            this._userConfig = JSON.parse(process.env[`SConfigFolderAdapter-${this.settings.userConfigPath}`]);
        }
        // mix the configs and save them in the instance
        const n = deepMerge_1.default(this._defaultConfig, this._appConfig, this._userConfig);
        return n;
    }
    save(newConfig = {}) {
        if (!this.settings.userConfigPath) {
            throw new Error(`You try to save the config "${this.name}" but the "settings.userConfigPath" is not set...`);
        }
        const baseConfig = deepMerge_1.default(this._defaultConfig, this._appConfig);
        Object.keys(baseConfig).forEach((name) => {
            const configToSave = diff_1.default(baseConfig[name], newConfig[name] || {});
            const newConfigString = `
      module.exports = ${JSON.stringify(configToSave)};
    `;
            // write the new config file
            writeFileSync_1.default(this.settings.userConfigPath +
                '/' +
                this.settings.filename.replace('[name]', name), newConfigString);
        });
        return true;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnRm9sZGVyQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLDRDQUFzQjtBQUN0Qix1RUFBaUQ7QUFDakQsMkVBQXFEO0FBQ3JELDZEQUF1QztBQUN2QyxzRUFBZ0Q7QUE0QmhELGlCQUFTLE1BQU0sb0JBQXFCLFNBQVEsd0JBQWdCO0lBQzFELFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FDekQsUUFBUSxFQUNSLElBQUksQ0FBQyxJQUFJLENBQ1YsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUI7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FDdkUsY0FBYyxFQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUN6QixDQUFDO1FBQ0osSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWE7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUMvRCxjQUFjLEVBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQ3pCLENBQUM7UUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYztZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQ2pFLGNBQWMsRUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FDekIsQ0FBQztJQUNOLENBQUM7SUFF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