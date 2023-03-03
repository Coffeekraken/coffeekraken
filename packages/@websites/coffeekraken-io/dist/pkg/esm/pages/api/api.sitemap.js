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
import { __dirname } from '@coffeekraken/sugar/fs';
import { __hashFromSync } from '@coffeekraken/sugar/hash';
import __fs from 'fs';
import __path from 'path';
export default function apiSitemap() {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        // temporary disabled
        return resolve([]);
        const docmap = new __SDocmap();
        const docmapJson = yield docmap.read();
        const hashesByPath = {};
        const envHash = __hashFromSync([
            '@coffeekraken/sugar',
            __path.resolve(__dirname(), '../../views'),
        ]);
        const items = [];
        for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
            // do not take ".config" items
            if (namespace.match(/\.config\./)) {
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
                    hash = __hashFromSync([envHash, docmapObj.path]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBRS9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVU7SUFDOUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLHFCQUFxQjtRQUNyQixPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVuQixNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV4QixNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUM7WUFDM0IscUJBQXFCO1lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsYUFBYSxDQUFDO1NBQzdDLENBQUMsQ0FBQztRQUVILE1BQU0sS0FBSyxHQUFpQyxFQUFFLENBQUM7UUFFL0MsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQy9ELDhCQUE4QjtZQUM5QixJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQy9CLFNBQVM7YUFDWjtZQUVELGFBQWE7WUFDYixJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsYUFBYTtnQkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQ1Asd0NBQXdDLFNBQVMsQ0FBQyxJQUFJLHVEQUF1RCxDQUNoSCxDQUFDO2lCQUNMO3FCQUFNO29CQUNILGFBQWE7b0JBQ2IsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDakQsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUN2QzthQUNKO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxLQUFLLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3JCLEdBQUcsRUFBRSxRQUFRLFNBQVMsRUFBRTtnQkFDeEIsYUFBYTtnQkFDYixTQUFTLEVBQUUsSUFBSTthQUNsQixDQUFDLENBQUM7U0FDTjtRQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9