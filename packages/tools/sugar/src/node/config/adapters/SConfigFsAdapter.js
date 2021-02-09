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
}
exports.default = SConfigFsAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZzQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWdGc0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNENBQXNCO0FBQ3RCLHVFQUFpRDtBQUNqRCwyRUFBcUQ7QUFDckQsNkRBQXVDO0FBQ3ZDLHNFQUFnRDtBQUNoRCxtRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBcUIsZ0JBQWlCLFNBQVEsd0JBQWdCO0lBQzVELFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsYUFBYSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhO1lBQzVDLGNBQWMsRUFBRSxHQUFHLGtCQUFVLEVBQUUsYUFBYTtTQUM3QyxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBQ0YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDckQsUUFBUSxFQUNSLElBQUksQ0FBQyxJQUFJLENBQ1YsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUI7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FDdkUsWUFBWSxFQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUN2QixDQUFDO1FBQ0osSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWE7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFh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