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
import { __fileHashSync } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
export default function sitemap() {
    return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        const items = [
            {
                loc: '/config/explorer',
            },
        ];
        const hashesByPath = {};
        const docmapInstance = new __SDocmap();
        const docmapJson = yield docmapInstance.read();
        for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
            // @ts-ignore
            let hash = hashesByPath[docmapObj.path];
            if (!hash) {
                // @ts-ignore
                if (!__fs.existsSync(docmapObj.path)) {
                    console.warn(`<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`);
                }
                else {
                    // @ts-ignore
                    hash = __fileHashSync(docmapObj.path);
                    // save in stack
                    // @ts-ignore
                    hashesByPath[docmapObj.path] = hash;
                }
            }
            items.push({
                loc: `/api/${namespace}`,
                // @ts-ignore
                integrity: hash,
            });
        }
        resolve(items);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPO0lBQzNCLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0RCxNQUFNLEtBQUssR0FBRztZQUNWO2dCQUNJLEdBQUcsRUFBRSxrQkFBa0I7YUFDMUI7U0FDSixDQUFDO1FBRUYsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXhCLE1BQU0sY0FBYyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDdkMsTUFBTSxVQUFVLEdBQUcsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFL0MsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQy9ELGFBQWE7WUFDYixJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsYUFBYTtnQkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQ1Isd0NBQXdDLFNBQVMsQ0FBQyxJQUFJLHVEQUF1RCxDQUNoSCxDQUFDO2lCQUNMO3FCQUFNO29CQUNILGFBQWE7b0JBQ2IsSUFBSSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RDLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDdkM7YUFDSjtZQUVELEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsR0FBRyxFQUFFLFFBQVEsU0FBUyxFQUFFO2dCQUN4QixhQUFhO2dCQUNiLFNBQVMsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=