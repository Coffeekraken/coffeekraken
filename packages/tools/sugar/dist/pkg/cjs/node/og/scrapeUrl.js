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
const path_1 = require("@coffeekraken/sugar/path");
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
function srapeUrl(url, settings = {}) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const finalSettings = (0, deepMerge_1.default)({
            id: undefined,
            scraper: {},
            cache: {
                ttl: '1w',
            },
        }, settings);
        const cacheFilePath = `${(0, path_1.__packageCacheDir)()}/sugar/scrapeUrl.json`;
        let cacheJson = {};
        // leverage cache
        if (finalSettings.cache && fs_2.default.existsSync(cacheFilePath)) {
            cacheJson = (0, fs_1.__readJsonSync)(cacheFilePath);
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
            (0, fs_1.__writeJsonSync)(cacheFilePath, cacheJson);
        }
        // return the resuls
        return resolve(data.result);
    }));
}
exports.default = srapeUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEVBQXdEO0FBQ3hELDRFQUFvRDtBQUNwRCxtREFBNkQ7QUFDN0QsK0NBQXlFO0FBQ3pFLDRDQUFzQjtBQXVEdEIsU0FBd0IsUUFBUSxDQUM1QixHQUFXLEVBQ1gsV0FBd0MsRUFBRTtJQUUxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pDLE1BQU0sYUFBYSxHQUF1QixJQUFBLG1CQUFXLEVBQ2pEO1lBQ0ksRUFBRSxFQUFFLFNBQVM7WUFDYixPQUFPLEVBQUUsRUFBRTtZQUNYLEtBQUssRUFBRTtnQkFDSCxHQUFHLEVBQUUsSUFBSTthQUNaO1NBQ0osRUFDRCxRQUFRLENBQ1gsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUFHLEdBQUcsSUFBQSx3QkFBaUIsR0FBRSx1QkFBdUIsQ0FBQztRQUVwRSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFbkIsaUJBQWlCO1FBQ2pCLElBQUksYUFBYSxDQUFDLEtBQUssSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3ZELFNBQVMsR0FBRyxJQUFBLG1CQUFjLEVBQUMsYUFBYSxDQUFDLENBQUM7WUFDMUMsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hCLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7UUFFRCw2QkFBNkI7UUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLDRCQUFrQixrQ0FDOUIsYUFBYSxDQUFDLE9BQU8sS0FDeEIsR0FBRyxJQUNMLENBQUM7UUFFSCw0QkFBNEI7UUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlCO1FBRUQsa0JBQWtCO1FBQ2xCLElBQUksYUFBYSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3BDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLElBQUEsb0JBQWUsRUFBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDN0M7UUFFRCxvQkFBb0I7UUFDcEIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBaERELDJCQWdEQyJ9