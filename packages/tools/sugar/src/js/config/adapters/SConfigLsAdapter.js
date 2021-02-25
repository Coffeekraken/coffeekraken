// @ts-nocheck
import __toString from '../../string/toString';
import __parse from '../../string/parse';
import __deepMerge from '../../object/deepMerge';
import __SConfigAdapter from './SConfigAdapter';
import __diff from '../../object/diff';
class SConfigLsAdapter extends __SConfigAdapter {
    get configLsAdapterSettings() {
        return this.configLsAdapterSettings.configLsAdapter;
    }
    constructor(settings) {
        super(__deepMerge({
            configLsAdapter: {}
        }, settings || {}));
    }
    load() {
        // try to get the config from the localstorage
        const config = __parse(localStorage.getItem(this.name)) || {};
        // mix the configs and save them in the instance
        return __deepMerge(config.default || {}, config.app || {}, config.user || {});
    }
    save(newConfig = {}) {
        const baseConfig = __deepMerge(this.configLsAdapterSettings.defaultConfig, this.configLsAdapterSettings.appConfig);
        localStorage.setItem(this.name, __toString({
            default: this.configLsAdapterSettings.defaultConfig,
            app: this.configLsAdapterSettings.appConfig,
            user: __diff(baseConfig, newConfig)
        }));
        return true;
    }
}
export default SConfigLsAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0xzQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWdMc0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUlkLE9BQU8sVUFBVSxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sT0FBTyxNQUFNLG9CQUFvQixDQUFDO0FBRXpDLE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sZ0JBQWdCLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxNQUFNLE1BQU0sbUJBQW1CLENBQUM7QUF5QnZDLE1BQU0sZ0JBQWlCLFNBQVEsZ0JBQWdCO0lBQzdDLElBQUksdUJBQXVCO1FBQ3pCLE9BQWEsSUFBSSxDQUFDLHVCQUF3QixDQUFDLGVBQWUsQ0FBQztJQUM3RCxDQUFDO0lBRUQsWUFBWSxRQUF1QztRQUNqRCxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsZUFBZSxFQUFFLEVBQUU7U0FDcEIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJO1FBQ0YsOENBQThDO1FBQzlDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU5RCxnREFBZ0Q7UUFDaEQsT0FBTyxXQUFXLENBQ2hCLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxFQUNwQixNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFDaEIsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQ2xCLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFO1FBQ2pCLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FDNUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsRUFDMUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FDdkMsQ0FBQztRQUNGLFlBQVksQ0FBQyxPQUFPLENBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQ1QsVUFBVSxDQUFDO1lBQ1QsT0FBTyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhO1lBQ25ELEdBQUcsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUztZQUMzQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUM7U0FDcEMsQ0FBQyxDQUNILENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQUVELGVBQWUsZ0JBQWdCLENBQUMifQ==