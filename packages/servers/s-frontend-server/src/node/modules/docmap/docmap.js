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
import __SPromise from '@coffeekraken/s-promise';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function docmap(express, settings, config) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const docmap = new __SDocmap();
        const docmapJson = yield pipe(docmap.read());
        const menu = docmapJson.menu;
        config.middlewares.docmap = {
            path: `${__dirname()}/docmapMiddleware`,
            settings: {},
        };
        // @ts-ignore
        Object.keys(menu.slug).forEach((slug) => {
            config.routes[slug] = {
                handler: 'markdown',
            };
        });
        if (menu.packages) {
            Object.keys(menu.packages).forEach((packageName) => {
                var _a;
                // @ts-ignore
                const packageObj = menu.packages[packageName];
                Object.keys((_a = packageObj === null || packageObj === void 0 ? void 0 : packageObj.slug) !== null && _a !== void 0 ? _a : {}).forEach((slug) => {
                    config.routes[slug] = {
                        handler: 'markdown',
                    };
                });
            });
        }
        resolve(true);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jbWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBRS9DLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFVBQVUsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTTtJQUNwRCxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDN0MsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUU3QixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRztZQUN4QixJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsbUJBQW1CO1lBQ3ZDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUVGLGFBQWE7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNsQixPQUFPLEVBQUUsVUFBVTthQUN0QixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTs7Z0JBQy9DLGFBQWE7Z0JBQ2IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHO3dCQUNsQixPQUFPLEVBQUUsVUFBVTtxQkFDdEIsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==