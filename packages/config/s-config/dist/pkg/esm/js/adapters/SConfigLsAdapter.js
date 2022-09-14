// @ts-nocheck
import { __deepMerge, __diff } from '@coffeekraken/sugar/object';
import __parse from '@coffeekraken/sugar/shared/string/parse';
import { __toString } from '@coffeekraken/sugar/string';
import __SConfigAdapter from '../../shared/adapters/SConfigAdapter';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2pFLE9BQU8sT0FBTyxNQUFNLHlDQUF5QyxDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV4RCxPQUFPLGdCQUFnQixNQUFNLHNDQUFzQyxDQUFDO0FBc0JwRSxNQUFNLGdCQUFpQixTQUFRLGdCQUFnQjtJQUMzQyxJQUFJLHVCQUF1QjtRQUN2QixPQUFhLElBQUksQ0FBQyxRQUFTLENBQUMsZUFBZSxDQUFDO0lBQ2hELENBQUM7SUFFRCxZQUFZLFFBQW1DO1FBQzNDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJO1FBQ0EsOENBQThDO1FBQzlDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU5RCxnREFBZ0Q7UUFDaEQsT0FBTyxXQUFXLENBQ2QsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQ3BCLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRSxFQUNoQixNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FDcEIsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUU7UUFDZixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FDMUIsQ0FBQztRQUNGLFlBQVksQ0FBQyxPQUFPLENBQ2hCLElBQUksQ0FBQyxJQUFJLEVBQ1QsVUFBVSxDQUFDO1lBQ1AsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYTtZQUNwQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO1lBQzVCLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQztTQUN0QyxDQUFDLENBQ0wsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQUVELGVBQWUsZ0JBQWdCLENBQUMifQ==