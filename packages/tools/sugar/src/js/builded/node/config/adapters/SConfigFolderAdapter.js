// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
        define(["require", "exports", "fs", "../../../shared/object/deepMerge", "../../fs/writeFileSync", "../../../shared/object/diff", "./SConfigAdapter", "../../path/packageRoot", "path", "chokidar"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs_1 = __importDefault(require("fs"));
    var deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
    var writeFileSync_1 = __importDefault(require("../../fs/writeFileSync"));
    var diff_1 = __importDefault(require("../../../shared/object/diff"));
    var SConfigAdapter_1 = __importDefault(require("./SConfigAdapter"));
    var packageRoot_1 = __importDefault(require("../../path/packageRoot"));
    var path_1 = __importDefault(require("path"));
    var chokidar_1 = __importDefault(require("chokidar"));
    var SConfigFolderAdapter = /** @class */ (function (_super) {
        __extends(SConfigFolderAdapter, _super);
        function SConfigFolderAdapter(settings) {
            var _this = _super.call(this, deepMerge_1.default({
                configFolderAdapter: {
                    fileName: '[name].config.js',
                    folderName: '.sugar',
                    defaultConfigPath: path_1.default.resolve(__dirname, '../../config'),
                    appConfigPath: packageRoot_1.default(process.cwd()) + "/[folderName]",
                    userConfigPath: packageRoot_1.default(process.cwd()) + "/.local/[folderName]"
                }
            }, settings || {})) || this;
            _this.configFolderAdapterSettings.folderName = _this.configFolderAdapterSettings.folderName.replace('[name]', _this.name);
            if (_this.configFolderAdapterSettings.defaultConfigPath)
                _this.configFolderAdapterSettings.defaultConfigPath = _this.configFolderAdapterSettings.defaultConfigPath.replace('[folderName]', _this.configFolderAdapterSettings.folderName);
            if (_this.configFolderAdapterSettings.appConfigPath)
                _this.configFolderAdapterSettings.appConfigPath = _this.configFolderAdapterSettings.appConfigPath.replace('[folderName]', _this.configFolderAdapterSettings.folderName);
            if (_this.configFolderAdapterSettings.userConfigPath)
                _this.configFolderAdapterSettings.userConfigPath = _this.configFolderAdapterSettings.userConfigPath.replace('[folderName]', _this.configFolderAdapterSettings.folderName);
            // watch for changes
            var watchPaths = [];
            if (_this.configFolderAdapterSettings.defaultConfigPath &&
                fs_1.default.existsSync(_this.configFolderAdapterSettings.defaultConfigPath)) {
                watchPaths.push(_this.configFolderAdapterSettings.defaultConfigPath);
            }
            if (_this.configFolderAdapterSettings.appConfigPath &&
                fs_1.default.existsSync(_this.configFolderAdapterSettings.appConfigPath)) {
                watchPaths.push(_this.configFolderAdapterSettings.appConfigPath);
            }
            if (_this.configFolderAdapterSettings.userConfigPath &&
                fs_1.default.existsSync(_this.configFolderAdapterSettings.userConfigPath)) {
                watchPaths.push(_this.configFolderAdapterSettings.userConfigPath);
            }
            chokidar_1.default
                .watch(watchPaths, {
                ignoreInitial: true
            })
                .on('change', function (p) { return _this.emit('update', p); })
                .on('unlink', function (p) { return _this.emit('update', p); })
                .on('add', function (p) { return _this.emit('update', p); });
            return _this;
        }
        Object.defineProperty(SConfigFolderAdapter.prototype, "configFolderAdapterSettings", {
            get: function () {
                return this._settings.configFolderAdapter;
            },
            enumerable: false,
            configurable: true
        });
        SConfigFolderAdapter.prototype.load = function () {
            var _this = this;
            this._defaultConfig = {};
            this._appConfig = {};
            this._userConfig = {};
            if (this.configFolderAdapterSettings.defaultConfigPath &&
                fs_1.default.existsSync(this.configFolderAdapterSettings.defaultConfigPath)) {
                process.env["SConfigFolderAdapter-" + this.configFolderAdapterSettings.defaultConfigPath] = true;
                fs_1.default
                    .readdirSync(this.configFolderAdapterSettings.defaultConfigPath)
                    .forEach(function (file) {
                    if (!file.includes(_this.configFolderAdapterSettings.fileName.replace('[name]', '')))
                        return;
                    if (_this._defaultConfig[file.replace('.config.js', '')] !== undefined)
                        return;
                    var configData = require(_this.configFolderAdapterSettings.defaultConfigPath + "/" + file);
                    _this._defaultConfig[file.replace('.config.js', '')] =
                        Object.keys(configData).length === 1 && configData.default
                            ? configData.default
                            : configData;
                });
                process.env["SConfigFolderAdapter-" + this.configFolderAdapterSettings.defaultConfigPath] = JSON.stringify(this._defaultConfig);
            }
            else if (process.env["SConfigFolderAdapter-" + this.configFolderAdapterSettings.defaultConfigPath]) {
                this._defaultConfig = JSON.parse(process.env["SConfigFolderAdapter-" + this.configFolderAdapterSettings.defaultConfigPath]);
            }
            if (this.configFolderAdapterSettings.defaultConfigPath !==
                this.configFolderAdapterSettings.appConfigPath &&
                this.configFolderAdapterSettings.appConfigPath &&
                fs_1.default.existsSync(this.configFolderAdapterSettings.appConfigPath)) {
                process.env["SConfigFolderAdapter-" + this.configFolderAdapterSettings.appConfigPath] = true; // intermediate value
                fs_1.default
                    .readdirSync(this.configFolderAdapterSettings.appConfigPath)
                    .forEach(function (file) {
                    if (!file.includes(_this.configFolderAdapterSettings.fileName.replace('[name]', '')))
                        return;
                    var configData = require(_this.configFolderAdapterSettings.appConfigPath + "/" + file);
                    _this._appConfig[file.replace('.config.js', '')] =
                        Object.keys(configData).length === 1 && configData.default
                            ? configData.default
                            : configData;
                });
                process.env["SConfigFolderAdapter-" + this.configFolderAdapterSettings.appConfigPath] = JSON.stringify(this._appConfig);
            }
            else if (process.env["SConfigFolderAdapter-" + this.configFolderAdapterSettings.appConfigPath]) {
                this._appConfig = JSON.parse(process.env["SConfigFolderAdapter-" + this.configFolderAdapterSettings.appConfigPath]);
            }
            if (this.configFolderAdapterSettings.defaultConfigPath !==
                this.configFolderAdapterSettings.userConfigPath &&
                this.configFolderAdapterSettings.appConfigPath !==
                    this.configFolderAdapterSettings.userConfigPath &&
                this.configFolderAdapterSettings.userConfigPath &&
                fs_1.default.existsSync(this.configFolderAdapterSettings.userConfigPath)) {
                process.env["SConfigFolderAdapter-" + this.configFolderAdapterSettings.userConfigPath] = true; // intermediate value
                fs_1.default
                    .readdirSync(this.configFolderAdapterSettings.userConfigPath)
                    .forEach(function (file) {
                    if (!file.includes(_this.configFolderAdapterSettings.fileName.replace('[name]', '')))
                        return;
                    var configData = require(_this.configFolderAdapterSettings.userConfigPath + "/" + file);
                    _this._userConfig[file.replace('.config.js', '')] =
                        Object.keys(configData).length === 1 && configData.default
                            ? configData.default
                            : configData;
                });
                process.env["SConfigFolderAdapter-" + this.configFolderAdapterSettings.userConfigPath] = JSON.stringify(this._userConfig);
            }
            else if (process.env["SConfigFolderAdapter-" + this.configFolderAdapterSettings.userConfigPath]) {
                this._userConfig = JSON.parse(process.env["SConfigFolderAdapter-" + this.configFolderAdapterSettings.userConfigPath]);
            }
            // mix the configs and save them in the instance
            var n = deepMerge_1.default(this._defaultConfig, this._appConfig, this._userConfig);
            return n;
        };
        SConfigFolderAdapter.prototype.save = function (newConfig) {
            var _this = this;
            if (newConfig === void 0) { newConfig = {}; }
            if (!this.configFolderAdapterSettings.userConfigPath) {
                throw new Error("You try to save the config \"" + this.name + "\" but the \"settings.userConfigPath\" is not set...");
            }
            var baseConfig = deepMerge_1.default(this._defaultConfig, this._appConfig);
            Object.keys(baseConfig).forEach(function (name) {
                var configToSave = diff_1.default(baseConfig[name], newConfig[name] || {});
                var newConfigString = "\n      module.exports = " + JSON.stringify(configToSave) + ";\n    ";
                // write the new config file
                writeFileSync_1.default(_this.configFolderAdapterSettings.userConfigPath +
                    '/' +
                    _this.configFolderAdapterSettings.fileName.replace('[name]', name), newConfigString);
            });
            return true;
        };
        return SConfigFolderAdapter;
    }(SConfigAdapter_1.default));
    exports.default = SConfigFolderAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9ub2RlL2NvbmZpZy9hZGFwdGVycy9TQ29uZmlnRm9sZGVyQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwQ0FBc0I7SUFDdEIsK0VBQTJEO0lBQzNELHlFQUFxRDtJQUNyRCxxRUFBaUQ7SUFDakQsb0VBQWdEO0lBRWhELHVFQUFtRDtJQUNuRCw4Q0FBMEI7SUFDMUIsc0RBQWtDO0lBbUNsQztRQUFrRCx3Q0FBZ0I7UUFLaEUsOEJBQVksUUFBMkM7WUFBdkQsWUFDRSxrQkFDRSxtQkFBVyxDQUNUO2dCQUNFLG1CQUFtQixFQUFFO29CQUNuQixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixVQUFVLEVBQUUsUUFBUTtvQkFDcEIsaUJBQWlCLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDO29CQUM1RCxhQUFhLEVBQUsscUJBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWU7b0JBQzdELGNBQWMsRUFBSyxxQkFBYSxDQUM5QixPQUFPLENBQUMsR0FBRyxFQUFFLENBQ2QseUJBQXNCO2lCQUN4QjthQUNGLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLFNBZ0RGO1lBL0NDLEtBQUksQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQy9GLFFBQVEsRUFDUixLQUFJLENBQUMsSUFBSSxDQUNWLENBQUM7WUFDRixJQUFJLEtBQUksQ0FBQywyQkFBMkIsQ0FBQyxpQkFBaUI7Z0JBQ3BELEtBQUksQ0FBQywyQkFBMkIsQ0FBQyxpQkFBaUIsR0FBRyxLQUFJLENBQUMsMkJBQTJCLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUM3Ryxj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