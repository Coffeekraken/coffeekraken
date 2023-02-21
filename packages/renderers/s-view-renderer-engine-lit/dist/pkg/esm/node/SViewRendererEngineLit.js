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
            const component = (yield import(viewPath)).default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzFFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sMkNBQTJDLE1BQU0scURBQXFELENBQUM7QUFtQjlHLE1BQU0sQ0FBQyxPQUFPLE9BQU8sc0JBQXNCO0lBTXZDLFlBQVksUUFBbUQ7UUFGL0QsYUFBUSxHQUFvQyxFQUFFLENBQUM7UUFHM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU0sQ0FDRixRQUFnQixFQUNoQixPQUFZLEVBQUUsRUFDZCxvQkFBNEM7UUFFNUMsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7b0JBQzFDLFNBQVMsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUM7YUFDTjtZQUVELElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUMzQixRQUFRLENBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzFELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLEdBQUcsV0FBVztpQkFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNULE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFeEIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUVuRCxTQUFlLGlCQUFpQixDQUFDLFFBQVE7Ozs7b0JBQ3JDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7d0JBQ2hCLEtBQTBCLGFBQUEsY0FBQSxRQUFRLENBQUE7NEJBQXZCLE1BQU0sS0FBSyxxQkFBQSxDQUFBOzRCQUNsQixNQUFNLElBQUksS0FBSyxDQUFDO3lCQUNuQjs7Ozs7Ozs7O29CQUNELE9BQU8sTUFBTSxDQUFDOzthQUNqQjtZQUVELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUUxQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztZQUU5QixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTNDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7WUFFSCxpQ0FBaUM7WUFFakMsVUFBVSxDQUFDLEdBQVMsRUFBRTtnQkFDbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7O0FBaEVNLHlCQUFFLEdBQUcsS0FBSyxDQUFDO0FBQ1gsaUNBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLHdDQUFpQixHQUFHLDJDQUEyQyxDQUFDIn0=