"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const writeFileSync_1 = __importDefault(require("../../fs/writeFileSync"));
const diff_1 = __importDefault(require("../../object/diff"));
const SConfigAdapter_1 = __importDefault(require("./SConfigAdapter"));
/**
 * @name                  SConfigFolderAdapter
 * @namespace           sugar.node.config.adapters
 * @type                  Class
 *
 * This adapter let you specify a folder in which to put all the config files and access it normaly as you would with the SConfig system.
 * Each file in the folder will be the first level of the final config object like for example the file "colors.config.js" will be stored
 * in the final object under ```{ colors: ... }```.
 *
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - filename ('[name].config.js') {String}: Specify the filename to use for the file that will store the configs
 * - defaultConfigPath (null) {String}: This specify the path to the "default" config file.
 * - appConfigPath (${process.cwd()}/[filename]) {String}: This specify the path to the "app" config file
 * - userConfigPath (${__tmpDir()}/[filename]) {String}: This specify the path to the "user" config file
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SConfigFolderAdapter extends SConfigAdapter_1.default {
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
            let newConfigString = `
      module.exports = ${JSON.stringify(configToSave)};
    `;
            // write the new config file
            writeFileSync_1.default(this.settings.userConfigPath +
                '/' +
                this.settings.filename.replace('[name]', name), newConfigString);
        });
        return true;
    }
}
exports.default = SConfigFolderAdapter;
;
