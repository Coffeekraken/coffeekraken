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
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function sitemap() {
    return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const items = [];
        const docmapInstance = new __SDocmap();
        const docConfig = __SSugarConfig.get('doc');
        for (let [categoryId, categoryObj] of Object.entries(docConfig.categories)) {
            const searchResult = yield docmapInstance.search((_a = categoryObj.filters) !== null && _a !== void 0 ? _a : {});
            if (!Object.keys((_b = searchResult.items) !== null && _b !== void 0 ? _b : {}).length)
                continue;
            for (let [id, itemObj] of Object.entries(searchResult.items)) {
                items.push({
                    loc: `http://localhost:${docConfig.server.port}/api/doc/${itemObj.id}`,
                });
            }
        }
        // const hashesByPath = {};
        // const docmapInstance = new __SDocmap();
        // const docmapJson = await docmapInstance.read();
        // for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
        //     // @ts-ignore
        //     let hash = hashesByPath[docmapObj.path];
        //     if (!hash) {
        //         // @ts-ignore
        //         if (!__fs.existsSync(docmapObj.path)) {
        //             console.warn(
        //                 `<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`,
        //             );
        //         } else {
        //             // @ts-ignore
        //             hash = __fileHashSync(docmapObj.path);
        //             // save in stack
        //             // @ts-ignore
        //             hashesByPath[docmapObj.path] = hash;
        //         }
        //     }
        //     items.push({
        //         loc: `/api/${namespace}`,
        //         // @ts-ignore
        //         integrity: hash,
        //     });
        // }
        resolve(items);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTztJQUMzQixPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1FBQ3RELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVqQixNQUFNLGNBQWMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBRXZDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ2hELFNBQVMsQ0FBQyxVQUFVLENBQ3ZCLEVBQUU7WUFDQyxNQUFNLFlBQVksR0FBRyxNQUFNLGNBQWMsQ0FBQyxNQUFNLENBQzVDLE1BQUEsV0FBVyxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUM1QixDQUFDO1lBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxZQUFZLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxNQUFNO2dCQUFFLFNBQVM7WUFFNUQsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMxRCxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNQLEdBQUcsRUFBRSxvQkFBb0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQVksT0FBTyxDQUFDLEVBQUUsRUFBRTtpQkFDekUsQ0FBQyxDQUFDO2FBQ047U0FDSjtRQUVELDJCQUEyQjtRQUUzQiwwQ0FBMEM7UUFDMUMsa0RBQWtEO1FBRWxELHVFQUF1RTtRQUN2RSxvQkFBb0I7UUFDcEIsK0NBQStDO1FBQy9DLG1CQUFtQjtRQUNuQix3QkFBd0I7UUFDeEIsa0RBQWtEO1FBQ2xELDRCQUE0QjtRQUM1QixpSUFBaUk7UUFDakksaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQiw0QkFBNEI7UUFDNUIscURBQXFEO1FBQ3JELCtCQUErQjtRQUMvQiw0QkFBNEI7UUFDNUIsbURBQW1EO1FBQ25ELFlBQVk7UUFDWixRQUFRO1FBRVIsbUJBQW1CO1FBQ25CLG9DQUFvQztRQUNwQyx3QkFBd0I7UUFDeEIsMkJBQTJCO1FBQzNCLFVBQVU7UUFDVixJQUFJO1FBRUosT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=