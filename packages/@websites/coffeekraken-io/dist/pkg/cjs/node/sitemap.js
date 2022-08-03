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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fileHash_1 = __importDefault(require("@coffeekraken/sugar/node/fs/fileHash"));
const fs_1 = __importDefault(require("fs"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
function sitemap() {
    return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        const items = [
            {
                loc: "/config/explorer",
            },
        ];
        const hashesByPath = {};
        const docmapInstance = new s_docmap_1.default();
        const docmapJson = yield docmapInstance.read();
        for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
            // @ts-ignore
            let hash = hashesByPath[docmapObj.path];
            if (!hash) {
                // @ts-ignore
                if (!fs_1.default.existsSync(docmapObj.path)) {
                    emit("log", {
                        type: s_log_1.default.TYPE_WARN,
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
                loc: `/api/${namespace}`,
                // @ts-ignore
                integrity: hash,
            });
        }
        resolve(items);
    }));
}
exports.default = sitemap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBQy9DLHdFQUFpRDtBQUNqRCxvRkFBOEQ7QUFDOUQsNENBQXNCO0FBQ3RCLGdFQUF5QztBQUV6QyxTQUF3QixPQUFPO0lBQzdCLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDeEQsTUFBTSxLQUFLLEdBQUc7WUFDWjtnQkFDRSxHQUFHLEVBQUUsa0JBQWtCO2FBQ3hCO1NBQ0YsQ0FBQztRQUVGLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV4QixNQUFNLGNBQWMsR0FBRyxJQUFJLGtCQUFTLEVBQUUsQ0FBQztRQUN2QyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUvQyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakUsYUFBYTtZQUNiLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxhQUFhO2dCQUNiLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDcEMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDVixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7d0JBQ3RCLEtBQUssRUFBRSx3Q0FBd0MsU0FBUyxDQUFDLElBQUksdURBQXVEO3FCQUNySCxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsYUFBYTtvQkFDYixJQUFJLEdBQUcsSUFBQSxrQkFBVSxFQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUNyQzthQUNGO1lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDVCxHQUFHLEVBQUUsUUFBUSxTQUFTLEVBQUU7Z0JBQ3hCLGFBQWE7Z0JBQ2IsU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUM7QUF6Q0QsMEJBeUNDIn0=