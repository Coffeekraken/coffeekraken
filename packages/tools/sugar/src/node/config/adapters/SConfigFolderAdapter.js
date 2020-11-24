// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "../../object/deepMerge", "../../fs/writeFileSync", "../../object/diff", "./SConfigAdapter"], factory);
    }
})(function (require, exports) {
    "use strict";
    var fs_1 = __importDefault(require("fs"));
    var deepMerge_2 = __importDefault(require("../../object/deepMerge"));
    var writeFileSync_1 = __importDefault(require("../../fs/writeFileSync"));
    var diff_1 = __importDefault(require("../../object/diff"));
    var SConfigAdapter_1 = __importDefault(require("./SConfigAdapter"));
    return /** @class */ (function (_super) {
        __extends(SConfigFolderAdapter, _super);
        function SConfigFolderAdapter(settings) {
            if (settings === void 0) { settings = {}; }
            var _this = _super.call(this, settings) || this;
            _this.settings.foldername = _this.settings.foldername.replace('[name]', _this.name);
            if (_this.settings.defaultConfigPath)
                _this.settings.defaultConfigPath = _this.settings.defaultConfigPath.replace('[foldername]', _this.settings.foldername);
            if (_this.settings.appConfigPath)
                _this.settings.appConfigPath = _this.settings.appConfigPath.replace('[foldername]', _this.settings.foldername);
            if (_this.settings.userConfigPath)
                _this.settings.userConfigPath = _this.settings.userConfigPath.replace('[foldername]', _this.settings.foldername);
            return _this;
        }
        SConfigFolderAdapter.prototype.load = function () {
            var _this = this;
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
                process.env["SConfigFolderAdapter-" + this.settings.defaultConfigPath] = true;
                fs_1.default.readdirSync(this.settings.defaultConfigPath).forEach(function (file) {
                    if (!file.includes(_this.settings.filename.replace('[name]', '')))
                        return;
                    if (_this._defaultConfig[file.replace('.config.js', '')] !== undefined)
                        return;
                    _this._defaultConfig[file.replace('.config.js', '')] = require(_this.settings.defaultConfigPath + "/" + file);
                });
                process.env["SConfigFolderAdapter-" + this.settings.defaultConfigPath] = JSON.stringify(this._defaultConfig);
            }
            else if (process.env["SConfigFolderAdapter-" + this.settings.defaultConfigPath]) {
                this._defaultConfig = JSON.parse(process.env["SConfigFolderAdapter-" + this.settings.defaultConfigPath]);
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
                process.env["SConfigFolderAdapter-" + this.settings.appConfigPath] = true; // intermediate value
                fs_1.default.readdirSync(this.settings.appConfigPath).forEach(function (file) {
                    if (!file.includes(_this.settings.filename.replace('[name]', '')))
                        return;
                    _this._appConfig[file.replace('.config.js', '')] = require(_this.settings.appConfigPath + "/" + file);
                });
                process.env["SConfigFolderAdapter-" + this.settings.appConfigPath] = JSON.stringify(this._appConfig);
            }
            else if (process.env["SConfigFolderAdapter-" + this.settings.appConfigPath]) {
                this._appConfig = JSON.parse(process.env["SConfigFolderAdapter-" + this.settings.appConfigPath]);
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
                process.env["SConfigFolderAdapter-" + this.settings.userConfigPath] = true; // intermediate value
                fs_1.default.readdirSync(this.settings.userConfigPath).forEach(function (file) {
                    if (!file.includes(_this.settings.filename.replace('[name]', '')))
                        return;
                    _this._userConfig[file.replace('.config.js', '')] = require(_this.settings.userConfigPath + "/" + file);
                });
                process.env["SConfigFolderAdapter-" + this.settings.userConfigPath] = JSON.stringify(this._userConfig);
            }
            else if (process.env["SConfigFolderAdapter-" + this.settings.userConfigPath]) {
                this._userConfig = JSON.parse(process.env["SConfigFolderAdapter-" + this.settings.userConfigPath]);
            }
            // mix the configs and save them in the instance
            var n = deepMerge_2.default(this._defaultConfig, this._appConfig, this._userConfig);
            return n;
        };
        SConfigFolderAdapter.prototype.save = function (newConfig) {
            var _this = this;
            if (newConfig === void 0) { newConfig = {}; }
            if (!this.settings.userConfigPath) {
                throw new Error("You try to save the config \"" + this.name + "\" but the \"settings.userConfigPath\" is not set...");
            }
            var baseConfig = deepMerge_2.default(this._defaultConfig, this._appConfig);
            Object.keys(baseConfig).forEach(function (name) {
                var configToSave = diff_1.default(baseConfig[name], newConfig[name] || {});
                var newConfigString = "\n      module.exports = " + JSON.stringify(configToSave) + ";\n    ";
                // write the new config file
                writeFileSync_1.default(_this.settings.userConfigPath +
                    '/' +
                    _this.settings.filename.replace('[name]', name), newConfigString);
            });
            return true;
        };
        return SConfigFolderAdapter;
    }(SConfigAdapter_1.default));
});
