var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function api(express, settings, config) {
    return __awaiter(this, void 0, void 0, function* () {
        // register handler
        config.handlers.api = {
            description: 'Handler that display the api documentation',
            path: `${__dirname()}/apiHandler`,
        };
        // const docmap = new __SDocmap();
        // const docmapJson = await docmap.read();
        // const apiMenu = {};
        // config.routes[settings.slug ?? '/api/*'] = {
        //     handler: 'api',
        // };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRzVELE1BQU0sQ0FBQyxPQUFPLFVBQWdCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07O1FBQ3ZELG1CQUFtQjtRQUNuQixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRztZQUNsQixXQUFXLEVBQUUsNENBQTRDO1lBQ3pELElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxhQUFhO1NBQ3BDLENBQUM7UUFFRixrQ0FBa0M7UUFDbEMsMENBQTBDO1FBRTFDLHNCQUFzQjtRQUV0QiwrQ0FBK0M7UUFDL0Msc0JBQXNCO1FBQ3RCLEtBQUs7UUFFTCx1REFBdUQ7UUFDdkQsbURBQW1EO1FBRW5ELHVDQUF1QztRQUV2QyxrQ0FBa0M7UUFDbEMsZ0NBQWdDO1FBQ2hDLGdDQUFnQztRQUNoQyxxQkFBcUI7UUFDckIsZUFBZTtRQUNmLGdDQUFnQztRQUNoQyxzQ0FBc0M7UUFDdEMsVUFBVTtRQUVWLDZCQUE2QjtRQUM3QiwwQkFBMEI7UUFDMUIsU0FBUztRQUNULE1BQU07UUFFTixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQUEifQ==