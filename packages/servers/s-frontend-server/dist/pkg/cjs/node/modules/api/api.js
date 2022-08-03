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
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
function api(express, settings, config) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // register handler
        config.handlers.api = {
            description: 'Handler that display the api documentation',
            path: `${(0, dirname_1.default)()}/apiHandler`,
        };
        // const docmap = new __SDocmap();
        // const docmapJson = await docmap.read();
        // const apiMenu = {};
        config.routes[(_a = settings.slug) !== null && _a !== void 0 ? _a : '/api/*'] = {
            handler: 'api',
        };
        // Object.keys(docmapJson.map).forEach((namespace) => {
        //     const docmapObj = docmapJson.map[namespace];
        //     const url = `/api/${namespace}`;
        //     __set(apiMenu, namespace, {
        //         type: docmapObj.type,
        //         name: docmapObj.name,
        //         namespace,
        //         url,
        //         path: docmapObj.path,
        //         relPath: docmapObj.relPath,
        //     });
        //     config.routes[url] = {
        //         handler: 'api',
        //     };
        // });
        return true;
    });
}
exports.default = api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsa0ZBQTREO0FBRzVELFNBQThCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07OztRQUN2RCxtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUc7WUFDbEIsV0FBVyxFQUFFLDRDQUE0QztZQUN6RCxJQUFJLEVBQUUsR0FBRyxJQUFBLGlCQUFTLEdBQUUsYUFBYTtTQUNwQyxDQUFDO1FBRUYsa0NBQWtDO1FBQ2xDLDBDQUEwQztRQUUxQyxzQkFBc0I7UUFFdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFBLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLFFBQVEsQ0FBQyxHQUFHO1lBQ3ZDLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUM7UUFFRix1REFBdUQ7UUFDdkQsbURBQW1EO1FBRW5ELHVDQUF1QztRQUV2QyxrQ0FBa0M7UUFDbEMsZ0NBQWdDO1FBQ2hDLGdDQUFnQztRQUNoQyxxQkFBcUI7UUFDckIsZUFBZTtRQUNmLGdDQUFnQztRQUNoQyxzQ0FBc0M7UUFDdEMsVUFBVTtRQUVWLDZCQUE2QjtRQUM3QiwwQkFBMEI7UUFDMUIsU0FBUztRQUNULE1BQU07UUFFTixPQUFPLElBQUksQ0FBQzs7Q0FDZjtBQXBDRCxzQkFvQ0MifQ==