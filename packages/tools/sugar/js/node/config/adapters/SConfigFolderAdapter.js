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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9jb25maWcvYWRhcHRlcnMvU0NvbmZpZ0ZvbGRlckFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMENBQXNCO0lBQ3RCLCtFQUEyRDtJQUMzRCx5RUFBcUQ7SUFDckQscUVBQWlEO0lBQ2pELG9FQUFnRDtJQUVoRCx1RUFBbUQ7SUFDbkQsOENBQTBCO0lBQzFCLHNEQUFrQztJQW1DbEM7UUFBa0Qsd0NBQWdCO1FBS2hFLDhCQUFZLFFBQTJDO1lBQXZELFlBQ0Usa0JBQ0UsbUJBQVcsQ0FDVDtnQkFDRSxtQkFBbUIsRUFBRTtvQkFDbkIsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsVUFBVSxFQUFFLFFBQVE7b0JBQ3BCLGlCQUFpQixFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQztvQkFDNUQsYUFBYSxFQUFLLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFlO29CQUM3RCxjQUFjLEVBQUsscUJBQWEsQ0FDOUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUNkLHlCQUFzQjtpQkFDeEI7YUFDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixTQWdERjtZQS9DQyxLQUFJLENBQUMsMkJBQTJCLENBQUMsVUFBVSxHQUFHLEtBQUksQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUMvRixRQUFRLEVBQ1IsS0FBSSxDQUFDLElBQUksQ0FDVixDQUFDO1lBQ0YsSUFBSSxLQUFJLENBQUMsMkJBQTJCLENBQUMsaUJBQWlCO2dCQUNwRCxLQUFJLENBQUMsMkJBQTJCLENBQUMsaUJBQWlCLEdBQUcsS0FBSSxDQUFDLDJCQUEyQixDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FDN0cs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