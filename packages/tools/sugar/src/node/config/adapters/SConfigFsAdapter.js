"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const tmpDir_1 = __importDefault(require("../../fs/tmpDir"));
const writeFileSync_1 = __importDefault(require("../../fs/writeFileSync"));
const diff_1 = __importDefault(require("../../object/diff"));
const SConfigAdapter_1 = __importDefault(require("./SConfigAdapter"));
/**
 * @name                  SConfigFsAdapter
 * @namespace           sugar.node.config.adapters
 * @type                  Class
 *
 * The JSON data adapter for the SConfig class that let you define a filename where you want to save your configs, how you want to encrypt/decrypt it
 * and then you just have to use the SConfig class and that's it...
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
class SConfigFsAdapter extends SConfigAdapter_1.default {
    constructor(settings = {}) {
        settings = deepMerge_1.default({
            name: null,
            filename: '[name].config.js',
            defaultConfigPath: null,
            appConfigPath: `${process.cwd()}/[filename]`,
            userConfigPath: `${tmpDir_1.default()}/[filename]`
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
        let newConfigString = `
      module.exports = ${JSON.stringify(newConfig)};
    `;
        // write the new config file
        writeFileSync_1.default(this.settings.userConfigPath, newConfigString);
        return true;
    }
}
exports.default = SConfigFsAdapter;
;
