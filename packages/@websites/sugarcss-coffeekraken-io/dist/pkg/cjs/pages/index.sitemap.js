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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
function sitemap() {
    return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBQy9DLHdFQUFpRDtBQUVqRCxrRkFBMEQ7QUFFMUQsU0FBd0IsT0FBTztJQUMzQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztRQUN0RCxNQUFNLEtBQUssR0FBRztZQUNWO2dCQUNJLEdBQUcsRUFBRSwrQkFBK0I7YUFDdkM7U0FDSixDQUFDO1FBRUYsTUFBTSxjQUFjLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFFdkMsTUFBTSxTQUFTLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ2hELFNBQVMsQ0FBQyxVQUFVLENBQ3ZCLEVBQUU7WUFDQyxNQUFNLFlBQVksR0FBRyxNQUFNLGNBQWMsQ0FBQyxNQUFNLENBQzVDLE1BQUEsV0FBVyxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUM1QixDQUFDO1lBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxZQUFZLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxNQUFNO2dCQUFFLFNBQVM7WUFFNUQsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMxRCxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNQLEdBQUcsRUFBRSxvQkFBb0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixPQUFPLENBQUMsRUFBRSxFQUFFO2lCQUM5RSxDQUFDLENBQUM7YUFDTjtTQUNKO1FBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBOUJELDBCQThCQyJ9