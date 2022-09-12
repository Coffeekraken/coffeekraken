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
import { __packageCacheDir } from '@coffeekraken/sugar/path';
import { __readJsonSync, __writeJsonSync } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
export default function srapeUrl(url, settings = {}) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const finalSettings = __deepMerge({
            id: undefined,
            scraper: {},
            cache: {
                ttl: '1w',
            },
        }, settings);
        const cacheFilePath = `${__packageCacheDir()}/sugar/scrapeUrl.json`;
        let cacheJson = {};
        // leverage cache
        if (finalSettings.cache && __fs.existsSync(cacheFilePath)) {
            cacheJson = __readJsonSync(cacheFilePath);
            if (cacheJson[url]) {
                return resolve(cacheJson[url]);
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
            cacheJson[url] = data.result;
            __writeJsonSync(cacheFilePath, cacheJson);
        }
        // return the resuls
        return resolve(data.result);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sa0JBQWtCLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUF1RHRCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsUUFBUSxDQUM1QixHQUFXLEVBQ1gsV0FBd0MsRUFBRTtJQUUxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pDLE1BQU0sYUFBYSxHQUF1QixXQUFXLENBQ2pEO1lBQ0ksRUFBRSxFQUFFLFNBQVM7WUFDYixPQUFPLEVBQUUsRUFBRTtZQUNYLEtBQUssRUFBRTtnQkFDSCxHQUFHLEVBQUUsSUFBSTthQUNaO1NBQ0osRUFDRCxRQUFRLENBQ1gsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUFHLEdBQUcsaUJBQWlCLEVBQUUsdUJBQXVCLENBQUM7UUFFcEUsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRW5CLGlCQUFpQjtRQUNqQixJQUFJLGFBQWEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN2RCxTQUFTLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQixPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNsQztTQUNKO1FBRUQsNkJBQTZCO1FBQzdCLE1BQU0sSUFBSSxHQUFHLE1BQU0sa0JBQWtCLGlDQUM5QixhQUFhLENBQUMsT0FBTyxLQUN4QixHQUFHLElBQ0wsQ0FBQztRQUVILDRCQUE0QjtRQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUI7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDcEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDN0IsZUFBZSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUM3QztRQUVELG9CQUFvQjtRQUNwQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==