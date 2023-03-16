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
        // return resolve([]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBRS9DLCtDQUFtRDtBQUNuRCxtREFBMEQ7QUFDMUQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUUxQixTQUF3QixVQUFVO0lBQzlCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxxQkFBcUI7UUFDckIsc0JBQXNCO1FBRXRCLE1BQU0sTUFBTSxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV4QixNQUFNLE9BQU8sR0FBRyxJQUFBLHFCQUFjLEVBQUM7WUFDM0IscUJBQXFCO1lBQ3JCLGNBQU0sQ0FBQyxPQUFPLENBQUMsSUFBQSxjQUFTLEdBQUUsRUFBRSxhQUFhLENBQUM7U0FDN0MsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLEdBQWlDLEVBQUUsQ0FBQztRQUUvQyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0QsOEJBQThCO1lBQzlCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDL0IsU0FBUzthQUNaO1lBRUQsYUFBYTtZQUNiLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxhQUFhO2dCQUNiLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FDUCx3Q0FBd0MsU0FBUyxDQUFDLElBQUksdURBQXVELENBQ2hILENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsYUFBYTtvQkFDYixJQUFJLEdBQUcsSUFBQSxxQkFBYyxFQUFDLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQ3ZDO2FBQ0o7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNQLEtBQUssRUFBRSxTQUFTLENBQUMsSUFBSTtnQkFDckIsR0FBRyxFQUFFLFFBQVEsU0FBUyxFQUFFO2dCQUN4QixhQUFhO2dCQUNiLFNBQVMsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBaERELDZCQWdEQyJ9