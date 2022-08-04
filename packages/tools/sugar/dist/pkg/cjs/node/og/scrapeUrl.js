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
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const open_graph_scraper_1 = __importDefault(require("open-graph-scraper"));
const packageCacheDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageCacheDir"));
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
const fs_1 = __importDefault(require("fs"));
function srapeUrl(url, settings = {}) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const finalSettings = (0, deepMerge_1.default)({
            id: undefined,
            scraper: {},
            cache: {
                ttl: '1w',
            },
        }, settings);
        const cacheFilePath = `${(0, packageCacheDir_1.default)()}/sugar/scrapeUrl.json`;
        let cacheJson = {};
        // leverage cache
        if (finalSettings.cache && fs_1.default.existsSync(cacheFilePath)) {
            cacheJson = (0, readJsonSync_1.default)(cacheFilePath);
            if (cacheJson[url]) {
                return resolve(cacheJson[url]);
            }
        }
        // process to actual scraping
        const data = yield (0, open_graph_scraper_1.default)(Object.assign(Object.assign({}, finalSettings.scraper), { url }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEVBQXdEO0FBQ3hELDRFQUFvRDtBQUNwRCxvR0FBOEU7QUFDOUUsNEZBQXNFO0FBQ3RFLDhGQUF3RTtBQUN4RSw0Q0FBc0I7QUF1RHRCLFNBQXdCLFFBQVEsQ0FDNUIsR0FBVyxFQUNYLFdBQXdDLEVBQUU7SUFFMUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6QyxNQUFNLGFBQWEsR0FBdUIsSUFBQSxtQkFBVyxFQUNqRDtZQUNJLEVBQUUsRUFBRSxTQUFTO1lBQ2IsT0FBTyxFQUFFLEVBQUU7WUFDWCxLQUFLLEVBQUU7Z0JBQ0gsR0FBRyxFQUFFLElBQUk7YUFDWjtTQUNKLEVBQ0QsUUFBUSxDQUNYLENBQUM7UUFFRixNQUFNLGFBQWEsR0FBRyxHQUFHLElBQUEseUJBQWlCLEdBQUUsdUJBQXVCLENBQUM7UUFFcEUsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRW5CLGlCQUFpQjtRQUNqQixJQUFJLGFBQWEsQ0FBQyxLQUFLLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN2RCxTQUFTLEdBQUcsSUFBQSxzQkFBYyxFQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQixPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNsQztTQUNKO1FBRUQsNkJBQTZCO1FBQzdCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSw0QkFBa0Isa0NBQzlCLGFBQWEsQ0FBQyxPQUFPLEtBQ3hCLEdBQUcsSUFDTCxDQUFDO1FBRUgsNEJBQTRCO1FBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM5QjtRQUVELGtCQUFrQjtRQUNsQixJQUFJLGFBQWEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNwQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QixJQUFBLHVCQUFlLEVBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsb0JBQW9CO1FBQ3BCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWhERCwyQkFnREMifQ==