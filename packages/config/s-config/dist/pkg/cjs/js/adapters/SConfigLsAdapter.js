"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_config_adapter_1 = __importDefault(require("@coffeekraken/s-config-adapter"));
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
class SConfigLsAdapter extends s_config_adapter_1.default {
    get configLsAdapterSettings() {
        return this.settings.configLsAdapter;
    }
    constructor(settings) {
        super((0, object_1.__deepMerge)({}, settings || {}));
    }
    load() {
        // try to get the config from the localstorage
        const config = (0, string_1.__parse)(localStorage.getItem(this.name)) || {};
        // mix the configs and save them in the instance
        return (0, object_1.__deepMerge)(config.default || {}, config.app || {}, config.user || {});
    }
    save(newConfig = {}) {
        const baseConfig = (0, object_1.__deepMerge)(this.settings.defaultConfig, this.settings.appConfig);
        localStorage.setItem(this.name, (0, string_1.__toString)({
            default: this.settings.defaultConfig,
            app: this.settings.appConfig,
            user: (0, object_1.__diff)(baseConfig, newConfig),
        }));
        return true;
    }
}
exports.default = SConfigLsAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUdkLHNGQUE4RDtBQUM5RCx1REFBaUU7QUFDakUsdURBQWlFO0FBaUNqRSxNQUFNLGdCQUFpQixTQUFRLDBCQUFnQjtJQUMzQyxJQUFJLHVCQUF1QjtRQUN2QixPQUFhLElBQUksQ0FBQyxRQUFTLENBQUMsZUFBZSxDQUFDO0lBQ2hELENBQUM7SUFFRCxZQUFZLFFBQW1DO1FBQzNDLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJO1FBQ0EsOENBQThDO1FBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU8sRUFBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU5RCxnREFBZ0Q7UUFDaEQsT0FBTyxJQUFBLG9CQUFXLEVBQ2QsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQ3BCLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRSxFQUNoQixNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FDcEIsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUU7UUFDZixNQUFNLFVBQVUsR0FBRyxJQUFBLG9CQUFXLEVBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FDMUIsQ0FBQztRQUNGLFlBQVksQ0FBQyxPQUFPLENBQ2hCLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBQSxtQkFBVSxFQUFDO1lBQ1AsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYTtZQUNwQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO1lBQzVCLElBQUksRUFBRSxJQUFBLGVBQU0sRUFBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO1NBQ3RDLENBQUMsQ0FDTCxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBRUQsa0JBQWUsZ0JBQWdCLENBQUMifQ==