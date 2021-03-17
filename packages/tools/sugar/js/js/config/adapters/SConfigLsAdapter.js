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
        define(["require", "exports", "../../../shared/string/toString", "../../../shared/string/parse", "../../../shared/object/deepMerge", "./SConfigAdapter", "../../../shared/object/diff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var toString_1 = __importDefault(require("../../../shared/string/toString"));
    var parse_1 = __importDefault(require("../../../shared/string/parse"));
    var deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
    var SConfigAdapter_1 = __importDefault(require("./SConfigAdapter"));
    var diff_1 = __importDefault(require("../../../shared/object/diff"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0xzQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9qcy9jb25maWcvYWRhcHRlcnMvU0NvbmZpZ0xzQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJZCw2RUFBeUQ7SUFDekQsdUVBQW1EO0lBRW5ELCtFQUEyRDtJQUMzRCxvRUFBZ0Q7SUFDaEQscUVBQWlEO0lBeUJqRDtRQUErQixvQ0FBZ0I7UUFLN0MsMEJBQVksUUFBdUM7bUJBQ2pELGtCQUNFLG1CQUFXLENBQ1Q7Z0JBQ0UsZUFBZSxFQUFFLEVBQUU7YUFDcEIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0Y7UUFDSCxDQUFDO1FBYkQsc0JBQUkscURBQXVCO2lCQUEzQjtnQkFDRSxPQUFhLElBQUksQ0FBQyx1QkFBd0IsQ0FBQyxlQUFlLENBQUM7WUFDN0QsQ0FBQzs7O1dBQUE7UUFhRCwrQkFBSSxHQUFKO1lBQ0UsOENBQThDO1lBQzlDLElBQU0sTUFBTSxHQUFHLGVBQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUU5RCxnREFBZ0Q7WUFDaEQsT0FBTyxtQkFBVyxDQUNoQixNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFDcEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQ2hCLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUNsQixDQUFDO1FBQ0osQ0FBQztRQUVELCtCQUFJLEdBQUosVUFBSyxTQUFjO1lBQWQsMEJBQUEsRUFBQSxjQUFjO1lBQ2pCLElBQU0sVUFBVSxHQUFHLG1CQUFXLENBQzVCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLEVBQzFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQ3ZDLENBQUM7WUFDRixZQUFZLENBQUMsT0FBTyxDQUNsQixJQUFJLENBQUMsSUFBSSxFQUNULGtCQUFVLENBQUM7Z0JBQ1QsT0FBTyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhO2dCQUNuRCxHQUFHLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVM7Z0JBQzNDLElBQUksRUFBRSxjQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQzthQUNwQyxDQUFDLENBQ0gsQ0FBQztZQUNGLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNILHVCQUFDO0lBQUQsQ0FBQyxBQTNDRCxDQUErQix3QkFBZ0IsR0EyQzlDO0lBRUQsa0JBQWUsZ0JBQWdCLENBQUMifQ==