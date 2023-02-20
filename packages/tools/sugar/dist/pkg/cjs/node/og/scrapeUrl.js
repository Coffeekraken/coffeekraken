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
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
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
        const cacheFilePath = `${(0, path_1.__packageCacheDir)()}/sugar/scrapeUrl.json`;
        let cacheJson = {}, timeout, rejected = false;
        // leverage cache
        if (finalSettings.cache && fs_2.default.existsSync(cacheFilePath)) {
            cacheJson = (0, fs_1.__readJsonSync)(cacheFilePath);
            if (cacheJson[url]) {
                return resolve(cacheJson[url]);
            }
        }
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
            (0, fs_1.__writeJsonSync)(cacheFilePath, cacheJson);
        }
        // return the resuls
        return resolve(data.result);
    }));
}
exports.default = srapeUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQXlFO0FBQ3pFLG1EQUE2RDtBQUM3RCw0Q0FBc0I7QUFDdEIsNEVBQW9EO0FBQ3BELDhFQUF3RDtBQTREeEQsU0FBd0IsUUFBUSxDQUM1QixHQUFXLEVBQ1gsV0FBd0MsRUFBRTtJQUUxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pDLE1BQU0sYUFBYSxHQUF1QixJQUFBLG1CQUFXLEVBQ2pEO1lBQ0ksT0FBTyxFQUFFLEVBQUU7WUFDWCxLQUFLLEVBQUU7Z0JBQ0gsR0FBRyxFQUFFLElBQUk7YUFDWjtZQUNELE9BQU8sRUFBRSxJQUFJO1NBQ2hCLEVBQ0QsUUFBUSxDQUNYLENBQUM7UUFFRixNQUFNLGFBQWEsR0FBRyxHQUFHLElBQUEsd0JBQWlCLEdBQUUsdUJBQXVCLENBQUM7UUFFcEUsSUFBSSxTQUFTLEdBQUcsRUFBRSxFQUNkLE9BQU8sRUFDUCxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGlCQUFpQjtRQUNqQixJQUFJLGFBQWEsQ0FBQyxLQUFLLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN2RCxTQUFTLEdBQUcsSUFBQSxtQkFBYyxFQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQixPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNsQztTQUNKO1FBRUQsZUFBZTtRQUNmLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUN2QixPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDaEIsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO1FBRUQsNkJBQTZCO1FBQzdCLElBQUksSUFBSSxHQUFHLE1BQU0sSUFBQSw0QkFBa0Isa0NBQzVCLGFBQWEsQ0FBQyxPQUFPLEtBQ3hCLEdBQUcsSUFDTCxDQUFDO1FBRUgsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXRCLGNBQWM7UUFDZCxJQUFJLFFBQVE7WUFBRSxPQUFPO1FBRXJCLDRCQUE0QjtRQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUI7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDcEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDN0IsSUFBQSxvQkFBZSxFQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUM3QztRQUVELG9CQUFvQjtRQUNwQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUEvREQsMkJBK0RDIn0=