var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDocmap from '@coffeekraken/s-docmap';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __set from '@coffeekraken/sugar/shared/object/set';
export default function api(express, settings, config) {
    return __awaiter(this, void 0, void 0, function* () {
        // register handler
        config.handlers.api = {
            description: 'Handler that display the api documentation',
            path: `${__dirname()}/apiHandler`
        };
        const docmap = new __SDocmap();
        const docmapJson = yield docmap.read();
        const apiMenu = {};
        Object.keys(docmapJson.map).forEach((namespace) => {
            const docmapObj = docmapJson.map[namespace];
            const url = `/api/${namespace}`;
            __set(apiMenu, namespace, {
                type: docmapObj.type,
                name: docmapObj.name,
                namespace,
                url,
                path: docmapObj.path,
                relPath: docmapObj.relPath,
            });
            config.routes[url] = {
                handler: 'api',
            };
        });
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBRS9DLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFVBQWdCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07O1FBQ3ZELG1CQUFtQjtRQUNuQixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRztZQUNsQixXQUFXLEVBQUUsNENBQTRDO1lBQ3pELElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxhQUFhO1NBQ3BDLENBQUM7UUFFRixNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXZDLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUVuQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM5QyxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTVDLE1BQU0sR0FBRyxHQUFHLFFBQVEsU0FBUyxFQUFFLENBQUM7WUFFaEMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7Z0JBQ3RCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTtnQkFDcEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNwQixTQUFTO2dCQUNULEdBQUc7Z0JBQ0gsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNwQixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87YUFDN0IsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRztnQkFDakIsT0FBTyxFQUFFLEtBQUs7YUFDakIsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUFBIn0=