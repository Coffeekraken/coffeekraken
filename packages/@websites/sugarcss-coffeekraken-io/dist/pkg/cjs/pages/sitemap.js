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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
function sitemap() {
    return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        const items = [
            {
                loc: '/config/explorer',
            },
        ];
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
exports.default = sitemap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBRWpELFNBQXdCLE9BQU87SUFDM0IsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0RCxNQUFNLEtBQUssR0FBRztZQUNWO2dCQUNJLEdBQUcsRUFBRSxrQkFBa0I7YUFDMUI7U0FDSixDQUFDO1FBRUYsMkJBQTJCO1FBRTNCLDBDQUEwQztRQUMxQyxrREFBa0Q7UUFFbEQsdUVBQXVFO1FBQ3ZFLG9CQUFvQjtRQUNwQiwrQ0FBK0M7UUFDL0MsbUJBQW1CO1FBQ25CLHdCQUF3QjtRQUN4QixrREFBa0Q7UUFDbEQsNEJBQTRCO1FBQzVCLGlJQUFpSTtRQUNqSSxpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLDRCQUE0QjtRQUM1QixxREFBcUQ7UUFDckQsK0JBQStCO1FBQy9CLDRCQUE0QjtRQUM1QixtREFBbUQ7UUFDbkQsWUFBWTtRQUNaLFFBQVE7UUFFUixtQkFBbUI7UUFDbkIsb0NBQW9DO1FBQ3BDLHdCQUF3QjtRQUN4QiwyQkFBMkI7UUFDM0IsVUFBVTtRQUNWLElBQUk7UUFFSixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUF4Q0QsMEJBd0NDIn0=