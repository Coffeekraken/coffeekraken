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
// import { __hashFrom } from '@coffeekraken/sugar/hash';
export default function apiSitemap() {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const docmap = new __SDocmap();
        const docmapJson = yield docmap.read();
        const hashesByPath = {};
        // const envHash = __hashFrom([
        //     '@coffeekraken/sugar',
        //     __path.resolve(__dirname(), '../../views'),
        // ]);
        const items = [];
        // for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
        //     // do not take ".config" items
        //     if (namespace.match(/\.config\./)) {
        //         continue;
        //     }
        //     // @ts-ignore
        //     let hash = hashesByPath[docmapObj.path];
        //     if (!hash) {
        //         // @ts-ignore
        //         if (!__fs.existsSync(docmapObj.path)) {
        //             console.log(
        //                 `<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`,
        //             );
        //         } else {
        //             // @ts-ignore
        //             // hash = __hashFrom([docmapObj.path]);
        //             hash = 'ckowijf';
        //             // save in stack
        //             // @ts-ignore
        //             hashesByPath[docmapObj.path] = hash;
        //         }
        //     }
        //     items.push({
        //         title: docmapObj.name,
        //         loc: `/api/${namespace}`,
        //         // @ts-ignore
        //         integrity: hash,
        //     });
        // }
        resolve(items);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBRS9DLHlEQUF5RDtBQUV6RCxNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVU7SUFDOUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXhCLCtCQUErQjtRQUMvQiw2QkFBNkI7UUFDN0Isa0RBQWtEO1FBQ2xELE1BQU07UUFFTixNQUFNLEtBQUssR0FBaUMsRUFBRSxDQUFDO1FBRS9DLHVFQUF1RTtRQUN2RSxxQ0FBcUM7UUFDckMsMkNBQTJDO1FBQzNDLG9CQUFvQjtRQUNwQixRQUFRO1FBRVIsb0JBQW9CO1FBQ3BCLCtDQUErQztRQUMvQyxtQkFBbUI7UUFDbkIsd0JBQXdCO1FBQ3hCLGtEQUFrRDtRQUNsRCwyQkFBMkI7UUFDM0IsaUlBQWlJO1FBQ2pJLGlCQUFpQjtRQUNqQixtQkFBbUI7UUFDbkIsNEJBQTRCO1FBQzVCLHNEQUFzRDtRQUN0RCxnQ0FBZ0M7UUFDaEMsK0JBQStCO1FBQy9CLDRCQUE0QjtRQUM1QixtREFBbUQ7UUFDbkQsWUFBWTtRQUNaLFFBQVE7UUFDUixtQkFBbUI7UUFDbkIsaUNBQWlDO1FBQ2pDLG9DQUFvQztRQUNwQyx3QkFBd0I7UUFDeEIsMkJBQTJCO1FBQzNCLFVBQVU7UUFDVixJQUFJO1FBRUosT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=