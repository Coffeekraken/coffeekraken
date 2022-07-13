var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
import __SDocmap from '@coffeekraken/s-docmap';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __fileHash from '@coffeekraken/sugar/node/fs/fileHash';
import __fs from 'fs';
export default function apiSitemap() {
    return new __SPromise(({ resolve, emit }) =>
        __awaiter(this, void 0, void 0, function* () {
            const docmap = new __SDocmap();
            const docmapJson = yield docmap.read();
            const hashesByPath = {};
            const items = [];
            for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
                // do not take ".config" items
                if (
                    namespace.match(/\.config\./) &&
                    !namespace.match(/\.doc\.config/)
                ) {
                    continue;
                }
                // @ts-ignore
                let hash = hashesByPath[docmapObj.path];
                if (!hash) {
                    // @ts-ignore
                    if (!__fs.existsSync(docmapObj.path)) {
                        emit('log', {
                            type: __SLog.TYPE_WARN,
                            // @ts-ignore
                            value: `<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`,
                        });
                    } else {
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
        }),
    );
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVU7SUFDaEMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDaEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFeEIsTUFBTSxLQUFLLEdBQWlDLEVBQUUsQ0FBQztRQUUvQyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakUsOEJBQThCO1lBQzlCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ3RFLFNBQVM7YUFDVjtZQUVELGFBQWE7WUFDYixJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsYUFBYTtnQkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO3dCQUN0QixhQUFhO3dCQUNiLEtBQUssRUFBRSx3Q0FBd0MsU0FBUyxDQUFDLElBQUksdURBQXVEO3FCQUNySCxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsYUFBYTtvQkFDYixJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUNyQzthQUNGO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDVCxLQUFLLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3JCLEdBQUcsRUFBRSxRQUFRLFNBQVMsRUFBRTtnQkFDeEIsYUFBYTtnQkFDYixTQUFTLEVBQUUsSUFBSTthQUNoQixDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9
