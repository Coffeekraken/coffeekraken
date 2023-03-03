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
const fs_1 = require("@coffeekraken/sugar/fs");
const hash_1 = require("@coffeekraken/sugar/hash");
const fs_2 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function apiSitemap() {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        // temporary disabled
        return resolve([]);
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        const hashesByPath = {};
        const envHash = (0, hash_1.__hashFromSync)([
            '@coffeekraken/sugar',
            path_1.default.resolve((0, fs_1.__dirname)(), '../../views'),
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
                if (!fs_2.default.existsSync(docmapObj.path)) {
                    console.log(`<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`);
                }
                else {
                    // @ts-ignore
                    hash = (0, hash_1.__hashFromSync)([envHash, docmapObj.path]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBRS9DLCtDQUFtRDtBQUNuRCxtREFBMEQ7QUFDMUQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUUxQixTQUF3QixVQUFVO0lBQzlCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxxQkFBcUI7UUFDckIsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXhCLE1BQU0sT0FBTyxHQUFHLElBQUEscUJBQWMsRUFBQztZQUMzQixxQkFBcUI7WUFDckIsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFBLGNBQVMsR0FBRSxFQUFFLGFBQWEsQ0FBQztTQUM3QyxDQUFDLENBQUM7UUFFSCxNQUFNLEtBQUssR0FBaUMsRUFBRSxDQUFDO1FBRS9DLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvRCw4QkFBOEI7WUFDOUIsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUMvQixTQUFTO2FBQ1o7WUFFRCxhQUFhO1lBQ2IsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNsQyxPQUFPLENBQUMsR0FBRyxDQUNQLHdDQUF3QyxTQUFTLENBQUMsSUFBSSx1REFBdUQsQ0FDaEgsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxhQUFhO29CQUNiLElBQUksR0FBRyxJQUFBLHFCQUFjLEVBQUMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2pELGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDdkM7YUFDSjtZQUNELEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNyQixHQUFHLEVBQUUsUUFBUSxTQUFTLEVBQUU7Z0JBQ3hCLGFBQWE7Z0JBQ2IsU0FBUyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFoREQsNkJBZ0RDIn0=