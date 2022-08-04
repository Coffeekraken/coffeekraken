"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const diff_1 = __importDefault(require("@coffeekraken/sugar/shared/object/diff"));
const parse_1 = __importDefault(require("@coffeekraken/sugar/shared/string/parse"));
const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
const SConfigAdapter_1 = __importDefault(require("../../shared/adapters/SConfigAdapter"));
class SConfigLsAdapter extends SConfigAdapter_1.default {
    get configLsAdapterSettings() {
        return this.settings.configLsAdapter;
    }
    constructor(settings) {
        super((0, deepMerge_1.default)({}, settings || {}));
    }
    load() {
        // try to get the config from the localstorage
        const config = (0, parse_1.default)(localStorage.getItem(this.name)) || {};
        // mix the configs and save them in the instance
        return (0, deepMerge_1.default)(config.default || {}, config.app || {}, config.user || {});
    }
    save(newConfig = {}) {
        const baseConfig = (0, deepMerge_1.default)(this.settings.defaultConfig, this.settings.appConfig);
        localStorage.setItem(this.name, (0, toString_1.default)({
            default: this.settings.defaultConfig,
            app: this.settings.appConfig,
            user: (0, diff_1.default)(baseConfig, newConfig),
        }));
        return true;
    }
}
exports.default = SConfigLsAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRGQUFzRTtBQUN0RSxrRkFBNEQ7QUFDNUQsb0ZBQThEO0FBQzlELDBGQUFvRTtBQUVwRSwwRkFBb0U7QUFzQnBFLE1BQU0sZ0JBQWlCLFNBQVEsd0JBQWdCO0lBQzNDLElBQUksdUJBQXVCO1FBQ3ZCLE9BQWEsSUFBSSxDQUFDLFFBQVMsQ0FBQyxlQUFlLENBQUM7SUFDaEQsQ0FBQztJQUVELFlBQVksUUFBbUM7UUFDM0MsS0FBSyxDQUFDLElBQUEsbUJBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQUk7UUFDQSw4Q0FBOEM7UUFDOUMsTUFBTSxNQUFNLEdBQUcsSUFBQSxlQUFPLEVBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFOUQsZ0RBQWdEO1FBQ2hELE9BQU8sSUFBQSxtQkFBVyxFQUNkLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxFQUNwQixNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFDaEIsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQ3BCLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFO1FBQ2YsTUFBTSxVQUFVLEdBQUcsSUFBQSxtQkFBVyxFQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQzFCLENBQUM7UUFDRixZQUFZLENBQUMsT0FBTyxDQUNoQixJQUFJLENBQUMsSUFBSSxFQUNULElBQUEsa0JBQVUsRUFBQztZQUNQLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWE7WUFDcEMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztZQUM1QixJQUFJLEVBQUUsSUFBQSxjQUFNLEVBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQztTQUN0QyxDQUFDLENBQ0wsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQUVELGtCQUFlLGdCQUFnQixDQUFDIn0=