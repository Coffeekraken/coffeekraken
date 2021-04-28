// @ts-nocheck
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
    const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
    const parse_1 = __importDefault(require("@coffeekraken/sugar/shared/string/parse"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const SConfigAdapter_1 = __importDefault(require("../../shared/adapters/SConfigAdapter"));
    const diff_1 = __importDefault(require("@coffeekraken/sugar/shared/object/diff"));
    class SConfigLsAdapter extends SConfigAdapter_1.default {
        get configLsAdapterSettings() {
            return this.configLsAdapterSettings.configLsAdapter;
        }
        constructor(settings) {
            super(deepMerge_1.default({
                configLsAdapter: {}
            }, settings || {}));
        }
        load() {
            // try to get the config from the localstorage
            const config = parse_1.default(localStorage.getItem(this.name)) || {};
            // mix the configs and save them in the instance
            return deepMerge_1.default(config.default || {}, config.app || {}, config.user || {});
        }
        save(newConfig = {}) {
            const baseConfig = deepMerge_1.default(this.configLsAdapterSettings.defaultConfig, this.configLsAdapterSettings.appConfig);
            localStorage.setItem(this.name, toString_1.default({
                default: this.configLsAdapterSettings.defaultConfig,
                app: this.configLsAdapterSettings.appConfig,
                user: diff_1.default(baseConfig, newConfig)
            }));
            return true;
        }
    }
    exports.default = SConfigLsAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0xzQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy1jb25maWcvc3JjL2pzL2FkYXB0ZXJzL1NDb25maWdMc0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMEZBQW9FO0lBQ3BFLG9GQUE4RDtJQUM5RCw0RkFBc0U7SUFDdEUsMEZBQW9FO0lBQ3BFLGtGQUE0RDtJQXlCNUQsTUFBTSxnQkFBaUIsU0FBUSx3QkFBZ0I7UUFDN0MsSUFBSSx1QkFBdUI7WUFDekIsT0FBYSxJQUFJLENBQUMsdUJBQXdCLENBQUMsZUFBZSxDQUFDO1FBQzdELENBQUM7UUFFRCxZQUFZLFFBQXVDO1lBQ2pELEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLGVBQWUsRUFBRSxFQUFFO2FBQ3BCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFDSixDQUFDO1FBRUQsSUFBSTtZQUNGLDhDQUE4QztZQUM5QyxNQUFNLE1BQU0sR0FBRyxlQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFOUQsZ0RBQWdEO1lBQ2hELE9BQU8sbUJBQVcsQ0FDaEIsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQ3BCLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRSxFQUNoQixNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FDbEIsQ0FBQztRQUNKLENBQUM7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUU7WUFDakIsTUFBTSxVQUFVLEdBQUcsbUJBQVcsQ0FDNUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsRUFDMUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FDdkMsQ0FBQztZQUNGLFlBQVksQ0FBQyxPQUFPLENBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQ1Qsa0JBQVUsQ0FBQztnQkFDVCxPQUFPLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWE7Z0JBQ25ELEdBQUcsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUztnQkFDM0MsSUFBSSxFQUFFLGNBQU0sQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO2FBQ3BDLENBQUMsQ0FDSCxDQUFDO1lBQ0YsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0Y7SUFFRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9