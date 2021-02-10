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
const localDir_1 = __importDefault(require("../../path/localDir"));
/**
 * @name                  SConfigFsAdapter
 * @namespace           sugar.node.config.adapters
 * @type                  Class
 * @status              beta
 *
 * The JSON data adapter for the SConfig class that let you define a filename where you want to save your configs, how you want to encrypt/decrypt it
 * and then you just have to use the SConfig class and that's it...
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
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SConfigFsAdapter extends SConfigAdapter_1.default {
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
            const configData = require(`${this.settings.defaultConfigPath}`);
            this._defaultConfig =
                Object.keys(configData).length === 1 && configData.default
                    ? configData.default
                    : configData;
        }
        // load the app config if exists
        if (this.settings.appConfigPath &&
            fs_1.default.existsSync(this.settings.appConfigPath)) {
            const configData = require(`${this.settings.appConfigPath}`);
            this._appConfig =
                Object.keys(configData).length === 1 && configData.default
                    ? configData.default
                    : configData;
        }
        // load the user config
        if (this.settings.userConfigPath &&
            fs_1.default.existsSync(this.settings.userConfigPath)) {
            const configData = require(`${this.settings.userConfigPath}`);
            this._userConfig =
                Object.keys(configData).length === 1 && configData.default
                    ? configData.default
                    : configData;
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
}
exports.default = SConfigFsAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZzQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWdGc0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNENBQXNCO0FBQ3RCLHVFQUFpRDtBQUNqRCwyRUFBcUQ7QUFDckQsNkRBQXVDO0FBQ3ZDLHNFQUFnRDtBQUNoRCxtRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBcUIsZ0JBQWlCLFNBQVEsd0JBQWdCO0lBQzVELFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsYUFBYSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhO1lBQzVDLGNBQWMsRUFBRSxHQUFHLGtCQUFVLEVBQUUsYUFBYTtTQUM3QyxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBQ0YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDckQsUUFBUSxFQUNSLElBQUksQ0FBQyxJQUFJLENBQ1YsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUI7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FDdkUsWUFBWSxFQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUN2QixDQUFDO1FBQ0osSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWE7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFh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