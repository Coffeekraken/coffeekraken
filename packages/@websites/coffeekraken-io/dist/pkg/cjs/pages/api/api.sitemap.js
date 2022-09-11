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
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
function apiSitemap() {
    return new s_promise_1.default(({ resolve, emit }) => __awaiter(this, void 0, void 0, function* () {
        const docmap = new s_docmap_1.default();
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
                if (!fs_2.default.existsSync(docmapObj.path)) {
                    emit('log', {
                        type: s_log_1.default.TYPE_WARN,
                        // @ts-ignore
                        value: `<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`,
                    });
                }
                else {
                    // @ts-ignore
                    hash = (0, fs_1.__fileHash)(docmapObj.path);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBQy9DLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFFakQsK0NBQW9EO0FBQ3BELDRDQUFzQjtBQUV0QixTQUF3QixVQUFVO0lBQzlCLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM5QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFeEIsTUFBTSxLQUFLLEdBQWlDLEVBQUUsQ0FBQztRQUUvQyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0QsOEJBQThCO1lBQzlCLElBQ0ksU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7Z0JBQzdCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFDbkM7Z0JBQ0UsU0FBUzthQUNaO1lBRUQsYUFBYTtZQUNiLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxhQUFhO2dCQUNiLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7d0JBQ3RCLGFBQWE7d0JBQ2IsS0FBSyxFQUFFLHdDQUF3QyxTQUFTLENBQUMsSUFBSSx1REFBdUQ7cUJBQ3ZILENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDSCxhQUFhO29CQUNiLElBQUksR0FBRyxJQUFBLGVBQVUsRUFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2xDLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDdkM7YUFDSjtZQUNELEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNyQixHQUFHLEVBQUUsUUFBUSxTQUFTLEVBQUU7Z0JBQ3hCLGFBQWE7Z0JBQ2IsU0FBUyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUE3Q0QsNkJBNkNDIn0=