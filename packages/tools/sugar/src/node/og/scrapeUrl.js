var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __deepMerge from '../../shared/object/deepMerge';
import __openGraphScraper from 'open-graph-scraper';
import __SCache from '@coffeekraken/s-cache';
export default function srapeUrl(url, settings = {}) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const finalSettings = __deepMerge({
            id: undefined,
            scraper: {},
            cache: {
                ttl: '1w'
            }
        }, settings);
        let cache;
        // leverage cache
        if (finalSettings.cache) {
            cache = new __SCache((_a = finalSettings.id) !== null && _a !== void 0 ? _a : 'sugar.node.og.scrapeUrl', finalSettings.cache);
            const cachedValue = yield cache.get(url);
            if (cachedValue) {
                return resolve(cachedValue);
            }
        }
        // process to actual scraping
        const data = yield __openGraphScraper(Object.assign(Object.assign({}, finalSettings.scraper), { url }));
        // check if got some results
        if (data.error) {
            return reject(data.result);
        }
        // cache if needed
        if (finalSettings.cache && data.result) {
            yield cache.set(url, data.result);
        }
        // return the resuls
        return resolve(data.result);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyYXBlVXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NyYXBlVXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sa0JBQXdCLE1BQU0sb0JBQW9CLENBQUM7QUFDMUQsT0FBTyxRQUE2QixNQUFNLHVCQUF1QixDQUFDO0FBdURsRSxNQUFNLENBQUMsT0FBTyxVQUFVLFFBQVEsQ0FBQyxHQUFXLEVBQUUsV0FBd0MsRUFBRTtJQUNwRixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztRQUN6QyxNQUFNLGFBQWEsR0FBdUIsV0FBVyxDQUFDO1lBQ2xELEVBQUUsRUFBRSxTQUFTO1lBQ2IsT0FBTyxFQUFFLEVBQUU7WUFDWCxLQUFLLEVBQUU7Z0JBQ0gsR0FBRyxFQUFFLElBQUk7YUFDWjtTQUNKLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFYixJQUFJLEtBQUssQ0FBQztRQUVWLGlCQUFpQjtRQUNqQixJQUFJLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFDckIsS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLE1BQUEsYUFBYSxDQUFDLEVBQUUsbUNBQUkseUJBQXlCLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pGLE1BQU0sV0FBVyxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QyxJQUFJLFdBQVcsRUFBRTtnQkFDYixPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMvQjtTQUNKO1FBRUQsNkJBQTZCO1FBQzdCLE1BQU0sSUFBSSxHQUFHLE1BQU0sa0JBQWtCLGlDQUM5QixhQUFhLENBQUMsT0FBTyxLQUN4QixHQUFHLElBQ0wsQ0FBQztRQUVILDRCQUE0QjtRQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUI7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDcEMsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckM7UUFFRCxvQkFBb0I7UUFDcEIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWhDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=