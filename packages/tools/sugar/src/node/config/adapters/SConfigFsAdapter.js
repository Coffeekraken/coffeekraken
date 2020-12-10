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
//# sourceMappingURL=module.js.map