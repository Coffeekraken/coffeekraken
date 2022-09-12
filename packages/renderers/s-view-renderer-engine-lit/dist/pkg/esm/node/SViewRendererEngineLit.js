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
import { __unique } from '@coffeekraken/sugar/array';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzFFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sMkNBQTJDLE1BQU0scURBQXFELENBQUM7QUFpQjlHLE1BQU0sQ0FBQyxPQUFPLE9BQU8sc0JBQXNCO0lBTXZDLFlBQVksUUFBbUQ7UUFGL0QsYUFBUSxHQUFvQyxFQUFFLENBQUM7UUFHM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU0sQ0FDRixRQUFnQixFQUNoQixPQUFZLEVBQUUsRUFDZCxvQkFBNEM7UUFFNUMsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxNQUFNLENBQ1QsNENBQTRDLFFBQVEsNkJBQTZCLENBQ3BGLENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtvQkFDMUMsU0FBUyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDO1lBQzNCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDMUQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztZQUNILFdBQVcsR0FBRyxXQUFXO2lCQUNwQixLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ1QsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV4QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztZQUVoQyxNQUFNLFNBQVMsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRS9CLFNBQWUsaUJBQWlCLENBQUMsUUFBUTs7OztvQkFDckMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOzt3QkFDaEIsS0FBMEIsYUFBQSxjQUFBLFFBQVEsQ0FBQTs0QkFBdkIsTUFBTSxLQUFLLHFCQUFBLENBQUE7NEJBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUM7eUJBQ25COzs7Ozs7Ozs7b0JBQ0QsT0FBTyxNQUFNLENBQUM7O2FBQ2pCO1lBRUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRTFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRTlCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFM0MsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUVILGlDQUFpQztZQUVqQyxVQUFVLENBQUMsR0FBUyxFQUFFO2dCQUNsQixNQUFNLEdBQUcsR0FBRyxNQUFNLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFBLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDYixDQUFDLENBQUEsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQzs7QUF6RU0seUJBQUUsR0FBRyxLQUFLLENBQUM7QUFDWCxpQ0FBVSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsd0NBQWlCLEdBQUcsMkNBQTJDLENBQUMifQ==