var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDocmap from '@coffeekraken/s-docmap';
import __SPromise from '@coffeekraken/s-promise';
import { __base64 } from '@coffeekraken/sugar/crypto';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function sitemap() {
    return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const items = [
            {
                loc: 'http://localhost:9191/api/doc',
            },
        ];
        const docmapInstance = new __SDocmap();
        const docConfig = __SSugarConfig.get('doc');
        for (let [categoryId, categoryObj] of Object.entries(docConfig.categories)) {
            const searchResult = yield docmapInstance.search((_a = categoryObj.filters) !== null && _a !== void 0 ? _a : {});
            if (!Object.keys((_b = searchResult.items) !== null && _b !== void 0 ? _b : {}).length)
                continue;
            items.push({
                loc: `http://localhost:${docConfig.server.port}/api/doc/items/${__base64.encrypt(JSON.stringify((_c = categoryObj.filters) !== null && _c !== void 0 ? _c : {}))}`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU87SUFDM0IsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztRQUN0RCxNQUFNLEtBQUssR0FBRztZQUNWO2dCQUNJLEdBQUcsRUFBRSwrQkFBK0I7YUFDdkM7U0FDSixDQUFDO1FBRUYsTUFBTSxjQUFjLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUV2QyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVDLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNoRCxTQUFTLENBQUMsVUFBVSxDQUN2QixFQUFFO1lBQ0MsTUFBTSxZQUFZLEdBQUcsTUFBTSxjQUFjLENBQUMsTUFBTSxDQUM1QyxNQUFBLFdBQVcsQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FDNUIsQ0FBQztZQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUEsWUFBWSxDQUFDLEtBQUssbUNBQUksRUFBRSxDQUFDLENBQUMsTUFBTTtnQkFBRSxTQUFTO1lBRTVELEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsR0FBRyxFQUFFLG9CQUFvQixTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksa0JBQWtCLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFBLFdBQVcsQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUU7YUFDaEksQ0FBQyxDQUFDO1lBRUgsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMxRCxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNQLEdBQUcsRUFBRSxvQkFBb0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixPQUFPLENBQUMsRUFBRSxFQUFFO2lCQUM5RSxDQUFDLENBQUM7YUFDTjtTQUNKO1FBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=