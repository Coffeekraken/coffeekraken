"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readJsonSync_1 = __importDefault(require("../fs/readJsonSync"));
const writeJsonSync_1 = __importDefault(require("../fs/writeJsonSync"));
const packageCacheDir_1 = __importDefault(require("../path/packageCacheDir"));
const fs_1 = __importDefault(require("fs"));
const open_graph_scraper_1 = __importDefault(require("open-graph-scraper"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
function srapeUrl(url, settings = {}) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const finalSettings = (0, deepMerge_1.default)({
            scraper: {},
            cache: {
                ttl: '1w',
            },
            timeout: 2000,
        }, settings);
        const cacheFilePath = `${(0, packageCacheDir_1.default)()}/sugar/scrapeUrl.json`;
        let cacheJson = {}, timeout, rejected = false;
        // leverage cache
        if (finalSettings.cache && fs_1.default.existsSync(cacheFilePath)) {
            cacheJson = (0, readJsonSync_1.default)(cacheFilePath);
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
        let data = yield (0, open_graph_scraper_1.default)(Object.assign(Object.assign({}, finalSettings.scraper), { url }));
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
            (0, writeJsonSync_1.default)(cacheFilePath, cacheJson);
        }
        // return the resuls
        return resolve(data.result);
    }));
}
exports.default = srapeUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQWdEO0FBQ2hELHdFQUFrRDtBQUNsRCw4RUFBd0Q7QUFFeEQsNENBQXNCO0FBQ3RCLDRFQUFvRDtBQUNwRCw4RUFBd0Q7QUErRHhELFNBQXdCLFFBQVEsQ0FDNUIsR0FBVyxFQUNYLFdBQXdDLEVBQUU7SUFFMUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6QyxNQUFNLGFBQWEsR0FBdUIsSUFBQSxtQkFBVyxFQUNqRDtZQUNJLE9BQU8sRUFBRSxFQUFFO1lBQ1gsS0FBSyxFQUFFO2dCQUNILEdBQUcsRUFBRSxJQUFJO2FBQ1o7WUFDRCxPQUFPLEVBQUUsSUFBSTtTQUNoQixFQUNELFFBQVEsQ0FDWCxDQUFDO1FBRUYsTUFBTSxhQUFhLEdBQUcsR0FBRyxJQUFBLHlCQUFpQixHQUFFLHVCQUF1QixDQUFDO1FBRXBFLElBQUksU0FBUyxHQUFHLEVBQUUsRUFDZCxPQUFPLEVBQ1AsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUVyQixpQkFBaUI7UUFDakIsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDdkQsU0FBUyxHQUFHLElBQUEsc0JBQWMsRUFBQyxhQUFhLENBQUMsQ0FBQztZQUMxQyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEIsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbEM7U0FDSjtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQ1Asd0ZBQXdGLEdBQUcsVUFBVSxDQUN4RyxDQUFDO1FBRUYsZUFBZTtRQUNmLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUN2QixPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDaEIsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO1FBRUQsNkJBQTZCO1FBQzdCLElBQUksSUFBSSxHQUFHLE1BQU0sSUFBQSw0QkFBa0Isa0NBQzVCLGFBQWEsQ0FBQyxPQUFPLEtBQ3hCLEdBQUcsSUFDTCxDQUFDO1FBRUgsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXRCLGNBQWM7UUFDZCxJQUFJLFFBQVE7WUFBRSxPQUFPO1FBRXJCLDRCQUE0QjtRQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUI7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDcEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDN0IsSUFBQSx1QkFBZSxFQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUM3QztRQUVELG9CQUFvQjtRQUNwQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFuRUQsMkJBbUVDIn0=