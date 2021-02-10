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
/**
 * @name                  SConfigFolderAdapter
 * @namespace           sugar.node.config.adapters
 * @type                  Class
 * @status              beta
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
 * - userConfigPath (${__localDir()}/[filename]) {String}: This specify the path to the "user" config file
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since         2.0.0
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
                const configData = require(`${this.settings.defaultConfigPath}/${file}`);
                this._defaultConfig[file.replace('.config.js', '')] =
                    Object.keys(configData).length === 1 && configData.default
                        ? configData.default
                        : configData;
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
                const configData = require(`${this.settings.appConfigPath}/${file}`);
                this._appConfig[file.replace('.config.js', '')] =
                    Object.keys(configData).length === 1 && configData.default
                        ? configData.default
                        : configData;
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
                const configData = require(`${this.settings.userConfigPath}/${file}`);
                this._userConfig[file.replace('.config.js', '')] =
                    Object.keys(configData).length === 1 && configData.default
                        ? configData.default
                        : configData;
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
}
exports.default = SConfigFolderAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnRm9sZGVyQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw0Q0FBc0I7QUFDdEIsdUVBQWlEO0FBQ2pELDJFQUFxRDtBQUNyRCw2REFBdUM7QUFDdkMsc0VBQWdEO0FBR2hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFxQixvQkFBcUIsU0FBUSx3QkFBZ0I7SUFDaEUsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUN6RCxRQUFRLEVBQ1IsSUFBSSxDQUFDLElBQUksQ0FDVixDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQjtZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUN2RSxjQUFjLEVBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQ3pCLENBQUM7UUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQy9ELGNBQWMsRUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FDekIsQ0FBQztRQUNKLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FDakUsY0FBYyxFQUNkLElBQUksQ0FBQyxRQUFRLENBQUMs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