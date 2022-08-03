var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import __SPromise from '@coffeekraken/s-promise';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';
import __fs from 'fs';
import { Readable } from 'stream';
import __SViewRendererBladeEngineSettingsInterface from './interface/SViewRendererEngineLitSettingsInterface';
export default class SViewRendererEngineLit {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, viewRendererSettings) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            if (!__fs.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
            if (!__fs.existsSync(viewRendererSettings.cacheDir)) {
                __fs.mkdirSync(viewRendererSettings.cacheDir, {
                    recursive: true,
                });
            }
            let viewDotPath = viewPath;
            __unique([...viewRendererSettings.rootDirs]).forEach((path) => {
                viewDotPath = viewDotPath.replace(`${path}/`, '');
            });
            viewDotPath = viewDotPath
                .split('/')
                .join('.')
                .replace('.js', '');
            console.log('SSS', viewDotPath);
            const component = (yield import(viewPath)).default;
            console.log('comp', component);
            function readableToString2(readable) {
                var readable_1, readable_1_1;
                var e_1, _a;
                return __awaiter(this, void 0, void 0, function* () {
                    let result = '';
                    try {
                        for (readable_1 = __asyncValues(readable); readable_1_1 = yield readable_1.next(), !readable_1_1.done;) {
                            const chunk = readable_1_1.value;
                            result += chunk;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (readable_1_1 && !readable_1_1.done && (_a = readable_1.return)) yield _a.call(readable_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return result;
                });
            }
            const ssrResult = render(component(data));
            console.log('SSR', ssrResult);
            const resultStr = Readable.from(ssrResult);
            resultStr.on('finish', (...args) => {
                console.log('END', args);
            });
            // console.log('res', resultStr);
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                const str = yield readableToString2(resultStr);
                resolve(str);
            }), 5000);
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
SViewRendererEngineLit.id = 'lit';
SViewRendererEngineLit.extensions = ['js'];
SViewRendererEngineLit.settingsInterface = __SViewRendererBladeEngineSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDMUUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTywyQ0FBMkMsTUFBTSxxREFBcUQsQ0FBQztBQWlCOUcsTUFBTSxDQUFDLE9BQU8sT0FBTyxzQkFBc0I7SUFNdkMsWUFBWSxRQUFtRDtRQUYvRCxhQUFRLEdBQW9DLEVBQUUsQ0FBQztRQUczQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUNGLFFBQWdCLEVBQ2hCLE9BQVksRUFBRSxFQUNkLG9CQUE0QztRQUU1QyxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM1QixPQUFPLE1BQU0sQ0FDVCw0Q0FBNEMsUUFBUSw2QkFBNkIsQ0FDcEYsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFO29CQUMxQyxTQUFTLEVBQUUsSUFBSTtpQkFDbEIsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFDM0IsUUFBUSxDQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMxRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxHQUFHLFdBQVc7aUJBQ3BCLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDVCxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBRWhDLE1BQU0sU0FBUyxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFL0IsU0FBZSxpQkFBaUIsQ0FBQyxRQUFROzs7O29CQUNyQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7O3dCQUNoQixLQUEwQixhQUFBLGNBQUEsUUFBUSxDQUFBOzRCQUF2QixNQUFNLEtBQUsscUJBQUEsQ0FBQTs0QkFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQzt5QkFDbkI7Ozs7Ozs7OztvQkFDRCxPQUFPLE1BQU0sQ0FBQzs7YUFDakI7WUFFRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFOUIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1lBRUgsaUNBQWlDO1lBRWpDLFVBQVUsQ0FBQyxHQUFTLEVBQUU7Z0JBQ2xCLE1BQU0sR0FBRyxHQUFHLE1BQU0saUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNiLENBQUMsQ0FBQSxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDOztBQXpFTSx5QkFBRSxHQUFHLEtBQUssQ0FBQztBQUNYLGlDQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQix3Q0FBaUIsR0FBRywyQ0FBMkMsQ0FBQyJ9