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
import { __fileHash } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
export default function apiSitemap() {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const docmap = new __SDocmap();
        const docmapJson = yield docmap.read();
        const hashesByPath = {};
        const items = [];
        for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
            // do not take ".config" items
            if (namespace.match(/\.config\./) &&
                !namespace.match(/\.doc\.config/)) {
                continue;
            }
            // @ts-ignore
            let hash = hashesByPath[docmapObj.path];
            if (!hash) {
                // @ts-ignore
                if (!__fs.existsSync(docmapObj.path)) {
                    console.log(`<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`);
                }
                else {
                    // @ts-ignore
                    hash = __fileHash(docmapObj.path);
                    // save in stack
                    // @ts-ignore
                    hashesByPath[docmapObj.path] = hash;
                }
            }
            items.push({
                title: docmapObj.name,
                loc: `/api/${namespace}`,
                // @ts-ignore
                integrity: hash,
            });
        }
        resolve(items);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBRS9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVO0lBQzlCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV4QixNQUFNLEtBQUssR0FBaUMsRUFBRSxDQUFDO1FBRS9DLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvRCw4QkFBOEI7WUFDOUIsSUFDSSxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztnQkFDN0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUNuQztnQkFDRSxTQUFTO2FBQ1o7WUFFRCxhQUFhO1lBQ2IsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNsQyxPQUFPLENBQUMsR0FBRyxDQUNQLHdDQUF3QyxTQUFTLENBQUMsSUFBSSx1REFBdUQsQ0FDaEgsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxhQUFhO29CQUNiLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQyxnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQ3ZDO2FBQ0o7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNQLEtBQUssRUFBRSxTQUFTLENBQUMsSUFBSTtnQkFDckIsR0FBRyxFQUFFLFFBQVEsU0FBUyxFQUFFO2dCQUN4QixhQUFhO2dCQUNiLFNBQVMsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=