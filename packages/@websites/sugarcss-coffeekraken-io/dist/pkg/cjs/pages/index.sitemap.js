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
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const crypto_1 = require("@coffeekraken/sugar/crypto");
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
function sitemap() {
    return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const items = [
            {
                loc: 'http://localhost:9191/api/doc',
            },
        ];
        const docmapInstance = new s_docmap_1.default();
        const docConfig = s_sugar_config_1.default.get('doc');
        for (let [categoryId, categoryObj] of Object.entries(docConfig.categories)) {
            const searchResult = yield docmapInstance.search((_a = categoryObj.filters) !== null && _a !== void 0 ? _a : {});
            if (!Object.keys((_b = searchResult.items) !== null && _b !== void 0 ? _b : {}).length)
                continue;
            items.push({
                loc: `http://localhost:${docConfig.server.port}/api/doc/items/${crypto_1.__base64.encrypt(JSON.stringify((_c = categoryObj.filters) !== null && _c !== void 0 ? _c : {}))}`
            });
            for (let [id, itemObj] of Object.entries(searchResult.items)) {
                items.push({
                    loc: `http://localhost:${docConfig.server.port}/api/doc/item/${itemObj.id}`,
                });
            }
        }
        resolve(items);
    }));
}
exports.default = sitemap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBQy9DLHdFQUFpRDtBQUNqRCx1REFBc0Q7QUFFdEQsa0ZBQTBEO0FBRTFELFNBQXdCLE9BQU87SUFDM0IsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7UUFDdEQsTUFBTSxLQUFLLEdBQUc7WUFDVjtnQkFDSSxHQUFHLEVBQUUsK0JBQStCO2FBQ3ZDO1NBQ0osQ0FBQztRQUVGLE1BQU0sY0FBYyxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1FBRXZDLE1BQU0sU0FBUyxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVDLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNoRCxTQUFTLENBQUMsVUFBVSxDQUN2QixFQUFFO1lBQ0MsTUFBTSxZQUFZLEdBQUcsTUFBTSxjQUFjLENBQUMsTUFBTSxDQUM1QyxNQUFBLFdBQVcsQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FDNUIsQ0FBQztZQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUEsWUFBWSxDQUFDLEtBQUssbUNBQUksRUFBRSxDQUFDLENBQUMsTUFBTTtnQkFBRSxTQUFTO1lBRTVELEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsR0FBRyxFQUFFLG9CQUFvQixTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksa0JBQWtCLGlCQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBQSxXQUFXLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxFQUFFO2FBQ2hJLENBQUMsQ0FBQztZQUVILEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDMUQsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDUCxHQUFHLEVBQUUsb0JBQW9CLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxpQkFBaUIsT0FBTyxDQUFDLEVBQUUsRUFBRTtpQkFDOUUsQ0FBQyxDQUFDO2FBQ047U0FDSjtRQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWxDRCwwQkFrQ0MifQ==