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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fileHash_1 = __importDefault(require("@coffeekraken/sugar/node/fs/fileHash"));
const fs_1 = __importDefault(require("fs"));
function apiSitemap() {
    return new s_promise_1.default(({ resolve, emit }) => __awaiter(this, void 0, void 0, function* () {
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        const hashesByPath = {};
        const items = [];
        for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
            // do not take ".config" items
            if (namespace.match(/\.config\./) && !namespace.match(/\.doc\.config/)) {
                continue;
            }
            // @ts-ignore
            let hash = hashesByPath[docmapObj.path];
            if (!hash) {
                // @ts-ignore
                if (!fs_1.default.existsSync(docmapObj.path)) {
                    emit("log", {
                        type: s_log_1.default.TYPE_WARN,
                        // @ts-ignore
                        value: `<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`,
                    });
                }
                else {
                    // @ts-ignore
                    hash = (0, fileHash_1.default)(docmapObj.path);
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
exports.default = apiSitemap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBQy9DLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFFakQsb0ZBQThEO0FBQzlELDRDQUFzQjtBQUV0QixTQUF3QixVQUFVO0lBQ2hDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNoRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFeEIsTUFBTSxLQUFLLEdBQWlDLEVBQUUsQ0FBQztRQUUvQyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakUsOEJBQThCO1lBQzlCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ3RFLFNBQVM7YUFDVjtZQUVELGFBQWE7WUFDYixJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsYUFBYTtnQkFDYixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1YsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO3dCQUN0QixhQUFhO3dCQUNiLEtBQUssRUFBRSx3Q0FBd0MsU0FBUyxDQUFDLElBQUksdURBQXVEO3FCQUNySCxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsYUFBYTtvQkFDYixJQUFJLEdBQUcsSUFBQSxrQkFBVSxFQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUNyQzthQUNGO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDVCxLQUFLLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3JCLEdBQUcsRUFBRSxRQUFRLFNBQVMsRUFBRTtnQkFDeEIsYUFBYTtnQkFDYixTQUFTLEVBQUUsSUFBSTthQUNoQixDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTFDRCw2QkEwQ0MifQ==