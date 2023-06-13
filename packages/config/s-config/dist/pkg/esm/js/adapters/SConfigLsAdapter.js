// @ts-nocheck
import __SConfigAdapter from '@coffeekraken/s-config-adapter';
import { __deepMerge, __diff } from '@coffeekraken/sugar/object';
import { __parse, __toString } from '@coffeekraken/sugar/string';
class SConfigLsAdapter extends __SConfigAdapter {
    get configLsAdapterSettings() {
        return this.settings.configLsAdapter;
    }
    constructor(settings) {
        super(__deepMerge({}, settings || {}));
    }
    load() {
        // try to get the config from the localstorage
        const config = __parse(localStorage.getItem(this.name)) || {};
        // mix the configs and save them in the instance
        return __deepMerge(config.default || {}, config.app || {}, config.user || {});
    }
    save(newConfig = {}) {
        const baseConfig = __deepMerge(this.settings.defaultConfig, this.settings.appConfig);
        localStorage.setItem(this.name, __toString({
            default: this.settings.defaultConfig,
            app: this.settings.appConfig,
            user: __diff(baseConfig, newConfig),
        }));
        return true;
    }
}
export default SConfigLsAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFHZCxPQUFPLGdCQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQWlDakUsTUFBTSxnQkFBaUIsU0FBUSxnQkFBZ0I7SUFDM0MsSUFBSSx1QkFBdUI7UUFDdkIsT0FBYSxJQUFJLENBQUMsUUFBUyxDQUFDLGVBQWUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsWUFBWSxRQUFtQztRQUMzQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSTtRQUNBLDhDQUE4QztRQUM5QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFOUQsZ0RBQWdEO1FBQ2hELE9BQU8sV0FBVyxDQUNkLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxFQUNwQixNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFDaEIsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQ3BCLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFO1FBQ2YsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQzFCLENBQUM7UUFDRixZQUFZLENBQUMsT0FBTyxDQUNoQixJQUFJLENBQUMsSUFBSSxFQUNULFVBQVUsQ0FBQztZQUNQLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWE7WUFDcEMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztZQUM1QixJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUM7U0FDdEMsQ0FBQyxDQUNMLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFFRCxlQUFlLGdCQUFnQixDQUFDIn0=