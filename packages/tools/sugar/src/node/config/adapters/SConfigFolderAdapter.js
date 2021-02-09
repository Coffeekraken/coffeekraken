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
}
exports.default = SConfigFolderAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnRm9sZGVyQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw0Q0FBc0I7QUFDdEIsdUVBQWlEO0FBQ2pELDJFQUFxRDtBQUNyRCw2REFBdUM7QUFDdkMsc0VBQWdEO0FBR2hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFxQixvQkFBcUIsU0FBUSx3QkFBZ0I7SUFDaEUsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUN6RCxRQUFRLEVBQ1IsSUFBSSxDQUFDLElBQUksQ0FDVixDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQjtZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUN2RSxjQUFjLEVBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQ3pCLENBQUM7UUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQy9ELGNBQWMsRUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FDekIsQ0FBQztRQUNKLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FDakUsY0FBYyxFQUNkLElBQUksQ0FBQyxRQUFRLENBQUMs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