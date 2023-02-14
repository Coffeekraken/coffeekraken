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
const fs_2 = __importDefault(require("fs"));
function apiSitemap() {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
                    console.log(`<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBRS9DLCtDQUFvRDtBQUNwRCw0Q0FBc0I7QUFFdEIsU0FBd0IsVUFBVTtJQUM5QixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXhCLE1BQU0sS0FBSyxHQUFpQyxFQUFFLENBQUM7UUFFL0MsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQy9ELDhCQUE4QjtZQUM5QixJQUNJLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO2dCQUM3QixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQ25DO2dCQUNFLFNBQVM7YUFDWjtZQUVELGFBQWE7WUFDYixJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsYUFBYTtnQkFDYixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQ1Asd0NBQXdDLFNBQVMsQ0FBQyxJQUFJLHVEQUF1RCxDQUNoSCxDQUFDO2lCQUNMO3FCQUFNO29CQUNILGFBQWE7b0JBQ2IsSUFBSSxHQUFHLElBQUEsZUFBVSxFQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUN2QzthQUNKO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxLQUFLLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3JCLEdBQUcsRUFBRSxRQUFRLFNBQVMsRUFBRTtnQkFDeEIsYUFBYTtnQkFDYixTQUFTLEVBQUUsSUFBSTthQUNsQixDQUFDLENBQUM7U0FDTjtRQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTNDRCw2QkEyQ0MifQ==