var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __readJsonSync from '../fs/readJsonSync.js';
import __writeJsonSync from '../fs/writeJsonSync.js';
import __packageCacheDir from '../path/packageCacheDir.js';
import __fs from 'fs';
import __openGraphScraper from 'open-graph-scraper';
import __deepMerge from '../../shared/object/deepMerge.js';
export default function srapeUrl(url, settings = {}) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const finalSettings = __deepMerge({
            scraper: {},
            cache: {
                ttl: '1w',
            },
            timeout: 2000,
        }, settings);
        const cacheFilePath = `${__packageCacheDir()}/sugar/scrapeUrl.json`;
        let cacheJson = {}, timeout, rejected = false;
        // leverage cache
        if (finalSettings.cache && __fs.existsSync(cacheFilePath)) {
            cacheJson = __readJsonSync(cacheFilePath);
            if (cacheJson[url]) {
                return resolve(cacheJson[url]);
            }
        }
        console.log(`<yellow>[SMarkdownBuilder]</yellow> Scraping the opengraph metas from the url "<cyan>${url}</cyan>"`);
        // init timeout
        if (finalSettings.timeout) {
            timeout = setTimeout(() => {
                rejected = true;
                resolve();
            }, finalSettings.timeout);
        }
        // process to actual scraping
        let data = yield __openGraphScraper(Object.assign(Object.assign({}, finalSettings.scraper), { url }));
        clearTimeout(timeout);
        // if rejected
        if (rejected)
            return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sZUFBZSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8saUJBQWlCLE1BQU0sNEJBQTRCLENBQUM7QUFFM0QsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sa0JBQWtCLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxXQUFXLE1BQU0sa0NBQWtDLENBQUM7QUErRDNELE1BQU0sQ0FBQyxPQUFPLFVBQVUsUUFBUSxDQUM1QixHQUFXLEVBQ1gsV0FBd0MsRUFBRTtJQUUxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pDLE1BQU0sYUFBYSxHQUF1QixXQUFXLENBQ2pEO1lBQ0ksT0FBTyxFQUFFLEVBQUU7WUFDWCxLQUFLLEVBQUU7Z0JBQ0gsR0FBRyxFQUFFLElBQUk7YUFDWjtZQUNELE9BQU8sRUFBRSxJQUFJO1NBQ2hCLEVBQ0QsUUFBUSxDQUNYLENBQUM7UUFFRixNQUFNLGFBQWEsR0FBRyxHQUFHLGlCQUFpQixFQUFFLHVCQUF1QixDQUFDO1FBRXBFLElBQUksU0FBUyxHQUFHLEVBQUUsRUFDZCxPQUFPLEVBQ1AsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUVyQixpQkFBaUI7UUFDakIsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDdkQsU0FBUyxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMxQyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEIsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbEM7U0FDSjtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQ1Asd0ZBQXdGLEdBQUcsVUFBVSxDQUN4RyxDQUFDO1FBRUYsZUFBZTtRQUNmLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUN2QixPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDaEIsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO1FBRUQsNkJBQTZCO1FBQzdCLElBQUksSUFBSSxHQUFHLE1BQU0sa0JBQWtCLGlDQUM1QixhQUFhLENBQUMsT0FBTyxLQUN4QixHQUFHLElBQ0wsQ0FBQztRQUVILFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV0QixjQUFjO1FBQ2QsSUFBSSxRQUFRO1lBQUUsT0FBTztRQUVyQiw0QkFBNEI7UUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlCO1FBRUQsa0JBQWtCO1FBQ2xCLElBQUksYUFBYSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3BDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLGVBQWUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDN0M7UUFFRCxvQkFBb0I7UUFDcEIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=