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
        define(["require", "exports", "../../string/toString", "../../string/parse", "../../object/deepMerge", "./SConfigAdapter", "../../object/diff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var toString_1 = __importDefault(require("../../string/toString"));
    var parse_1 = __importDefault(require("../../string/parse"));
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var SConfigAdapter_1 = __importDefault(require("./SConfigAdapter"));
    var diff_1 = __importDefault(require("../../object/diff"));
    var SConfigLsAdapter = /** @class */ (function (_super) {
        __extends(SConfigLsAdapter, _super);
        function SConfigLsAdapter(settings) {
            return _super.call(this, deepMerge_1.default({
                configLsAdapter: {}
            }, settings || {})) || this;
        }
        Object.defineProperty(SConfigLsAdapter.prototype, "configLsAdapterSettings", {
            get: function () {
                return this.configLsAdapterSettings.configLsAdapter;
            },
            enumerable: false,
            configurable: true
        });
        SConfigLsAdapter.prototype.load = function () {
            // try to get the config from the localstorage
            var config = parse_1.default(localStorage.getItem(this.name)) || {};
            // mix the configs and save them in the instance
            return deepMerge_1.default(config.default || {}, config.app || {}, config.user || {});
        };
        SConfigLsAdapter.prototype.save = function (newConfig) {
            if (newConfig === void 0) { newConfig = {}; }
            var baseConfig = deepMerge_1.default(this.configLsAdapterSettings.defaultConfig, this.configLsAdapterSettings.appConfig);
            localStorage.setItem(this.name, toString_1.default({
                default: this.configLsAdapterSettings.defaultConfig,
                app: this.configLsAdapterSettings.appConfig,
                user: diff_1.default(baseConfig, newConfig)
            }));
            return true;
        };
        return SConfigLsAdapter;
    }(SConfigAdapter_1.default));
    exports.default = SConfigLsAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0xzQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWdMc0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUlkLG1FQUErQztJQUMvQyw2REFBeUM7SUFFekMscUVBQWlEO0lBQ2pELG9FQUFnRDtJQUNoRCwyREFBdUM7SUF5QnZDO1FBQStCLG9DQUFnQjtRQUs3QywwQkFBWSxRQUF1QzttQkFDakQsa0JBQ0UsbUJBQVcsQ0FDVDtnQkFDRSxlQUFlLEVBQUUsRUFBRTthQUNwQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRjtRQUNILENBQUM7UUFiRCxzQkFBSSxxREFBdUI7aUJBQTNCO2dCQUNFLE9BQWEsSUFBSSxDQUFDLHVCQUF3QixDQUFDLGVBQWUsQ0FBQztZQUM3RCxDQUFDOzs7V0FBQTtRQWFELCtCQUFJLEdBQUo7WUFDRSw4Q0FBOEM7WUFDOUMsSUFBTSxNQUFNLEdBQUcsZUFBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRTlELGdEQUFnRDtZQUNoRCxPQUFPLG1CQUFXLENBQ2hCLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxFQUNwQixNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFDaEIsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQ2xCLENBQUM7UUFDSixDQUFDO1FBRUQsK0JBQUksR0FBSixVQUFLLFNBQWM7WUFBZCwwQkFBQSxFQUFBLGNBQWM7WUFDakIsSUFBTSxVQUFVLEdBQUcsbUJBQVcsQ0FDNUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsRUFDMUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FDdkMsQ0FBQztZQUNGLFlBQVksQ0FBQyxPQUFPLENBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQ1Qsa0JBQVUsQ0FBQztnQkFDVCxPQUFPLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWE7Z0JBQ25ELEdBQUcsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUztnQkFDM0MsSUFBSSxFQUFFLGNBQU0sQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO2FBQ3BDLENBQUMsQ0FDSCxDQUFDO1lBQ0YsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0gsdUJBQUM7SUFBRCxDQUFDLEFBM0NELENBQStCLHdCQUFnQixHQTJDOUM7SUFFRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9