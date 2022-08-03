var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDocmap from "@coffeekraken/s-docmap";
import __SPromise from "@coffeekraken/s-promise";
import __fileHash from "@coffeekraken/sugar/node/fs/fileHash";
import __fs from "fs";
import __SLog from "@coffeekraken/s-log";
export default function sitemap() {
    return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        const items = [
            {
                loc: "/config/explorer",
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
                    emit("log", {
                        type: __SLog.TYPE_WARN,
                        value: `<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`,
                    });
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
                loc: `/api/${namespace}`,
                // @ts-ignore
                integrity: hash,
            });
        }
        resolve(items);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUV6QyxNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU87SUFDN0IsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3hELE1BQU0sS0FBSyxHQUFHO1lBQ1o7Z0JBQ0UsR0FBRyxFQUFFLGtCQUFrQjthQUN4QjtTQUNGLENBQUM7UUFFRixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFeEIsTUFBTSxjQUFjLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUN2QyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUvQyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakUsYUFBYTtZQUNiLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxhQUFhO2dCQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDcEMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7d0JBQ3RCLEtBQUssRUFBRSx3Q0FBd0MsU0FBUyxDQUFDLElBQUksdURBQXVEO3FCQUNySCxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsYUFBYTtvQkFDYixJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUNyQzthQUNGO1lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDVCxHQUFHLEVBQUUsUUFBUSxTQUFTLEVBQUU7Z0JBQ3hCLGFBQWE7Z0JBQ2IsU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUMifQ==