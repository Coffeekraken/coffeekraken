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
        define(["require", "exports", "@coffeekraken/sugar/shared/string/toString", "@coffeekraken/sugar/shared/string/parse", "@coffeekraken/sugar/shared/object/deepMerge", "../../shared/adapters/SConfigAdapter", "@coffeekraken/sugar/shared/object/diff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
    var parse_1 = __importDefault(require("@coffeekraken/sugar/shared/string/parse"));
    var deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    var SConfigAdapter_1 = __importDefault(require("../../shared/adapters/SConfigAdapter"));
    var diff_1 = __importDefault(require("@coffeekraken/sugar/shared/object/diff"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0xzQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWdMc0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsd0ZBQW9FO0lBQ3BFLGtGQUE4RDtJQUM5RCwwRkFBc0U7SUFDdEUsd0ZBQW9FO0lBQ3BFLGdGQUE0RDtJQXlCNUQ7UUFBK0Isb0NBQWdCO1FBSzdDLDBCQUFZLFFBQXVDO21CQUNqRCxrQkFDRSxtQkFBVyxDQUNUO2dCQUNFLGVBQWUsRUFBRSxFQUFFO2FBQ3BCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGO1FBQ0gsQ0FBQztRQWJELHNCQUFJLHFEQUF1QjtpQkFBM0I7Z0JBQ0UsT0FBYSxJQUFJLENBQUMsdUJBQXdCLENBQUMsZUFBZSxDQUFDO1lBQzdELENBQUM7OztXQUFBO1FBYUQsK0JBQUksR0FBSjtZQUNFLDhDQUE4QztZQUM5QyxJQUFNLE1BQU0sR0FBRyxlQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFOUQsZ0RBQWdEO1lBQ2hELE9BQU8sbUJBQVcsQ0FDaEIsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQ3BCLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRSxFQUNoQixNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FDbEIsQ0FBQztRQUNKLENBQUM7UUFFRCwrQkFBSSxHQUFKLFVBQUssU0FBYztZQUFkLDBCQUFBLEVBQUEsY0FBYztZQUNqQixJQUFNLFVBQVUsR0FBRyxtQkFBVyxDQUM1QixJQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxFQUMxQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUN2QyxDQUFDO1lBQ0YsWUFBWSxDQUFDLE9BQU8sQ0FDbEIsSUFBSSxDQUFDLElBQUksRUFDVCxrQkFBVSxDQUFDO2dCQUNULE9BQU8sRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYTtnQkFDbkQsR0FBRyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTO2dCQUMzQyxJQUFJLEVBQUUsY0FBTSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUM7YUFDcEMsQ0FBQyxDQUNILENBQUM7WUFDRixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFDSCx1QkFBQztJQUFELENBQUMsQUEzQ0QsQ0FBK0Isd0JBQWdCLEdBMkM5QztJQUVELGtCQUFlLGdCQUFnQixDQUFDIn0=