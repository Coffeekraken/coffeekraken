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
// import { __hashFrom } from '@coffeekraken/sugar/hash';
function apiSitemap() {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const docmap = new s_docmap_1.default();
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
exports.default = apiSitemap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBRS9DLHlEQUF5RDtBQUV6RCxTQUF3QixVQUFVO0lBQzlCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFeEIsK0JBQStCO1FBQy9CLDZCQUE2QjtRQUM3QixrREFBa0Q7UUFDbEQsTUFBTTtRQUVOLE1BQU0sS0FBSyxHQUFpQyxFQUFFLENBQUM7UUFFL0MsdUVBQXVFO1FBQ3ZFLHFDQUFxQztRQUNyQywyQ0FBMkM7UUFDM0Msb0JBQW9CO1FBQ3BCLFFBQVE7UUFFUixvQkFBb0I7UUFDcEIsK0NBQStDO1FBQy9DLG1CQUFtQjtRQUNuQix3QkFBd0I7UUFDeEIsa0RBQWtEO1FBQ2xELDJCQUEyQjtRQUMzQixpSUFBaUk7UUFDakksaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQiw0QkFBNEI7UUFDNUIsc0RBQXNEO1FBQ3RELGdDQUFnQztRQUNoQywrQkFBK0I7UUFDL0IsNEJBQTRCO1FBQzVCLG1EQUFtRDtRQUNuRCxZQUFZO1FBQ1osUUFBUTtRQUNSLG1CQUFtQjtRQUNuQixpQ0FBaUM7UUFDakMsb0NBQW9DO1FBQ3BDLHdCQUF3QjtRQUN4QiwyQkFBMkI7UUFDM0IsVUFBVTtRQUNWLElBQUk7UUFFSixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUE5Q0QsNkJBOENDIn0=