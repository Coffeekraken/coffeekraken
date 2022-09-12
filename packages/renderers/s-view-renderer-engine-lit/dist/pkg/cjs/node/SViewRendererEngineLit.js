"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const array_1 = require("@coffeekraken/sugar/array");
const render_with_global_dom_shim_js_1 = require("@lit-labs/ssr/lib/render-with-global-dom-shim.js");
const fs_1 = __importDefault(require("fs"));
const stream_1 = require("stream");
const SViewRendererEngineLitSettingsInterface_1 = __importDefault(require("./interface/SViewRendererEngineLitSettingsInterface"));
class SViewRendererEngineLit {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, viewRendererSettings) {
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.default.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
            if (!fs_1.default.existsSync(viewRendererSettings.cacheDir)) {
                fs_1.default.mkdirSync(viewRendererSettings.cacheDir, {
                    recursive: true,
                });
            }
            let viewDotPath = viewPath;
            (0, array_1.__unique)([...viewRendererSettings.rootDirs]).forEach((path) => {
                viewDotPath = viewDotPath.replace(`${path}/`, '');
            });
            viewDotPath = viewDotPath
                .split('/')
                .join('.')
                .replace('.js', '');
            console.log('SSS', viewDotPath);
            const component = (yield Promise.resolve().then(() => __importStar(require(viewPath)))).default;
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
            const ssrResult = (0, render_with_global_dom_shim_js_1.render)(component(data));
            console.log('SSR', ssrResult);
            const resultStr = stream_1.Readable.from(ssrResult);
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
exports.default = SViewRendererEngineLit;
SViewRendererEngineLit.id = 'lit';
SViewRendererEngineLit.extensions = ['js'];
SViewRendererEngineLit.settingsInterface = SViewRendererEngineLitSettingsInterface_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBRWpELHFEQUFxRDtBQUNyRCxxR0FBMEU7QUFDMUUsNENBQXNCO0FBQ3RCLG1DQUFrQztBQUNsQyxrSUFBOEc7QUFpQjlHLE1BQXFCLHNCQUFzQjtJQU12QyxZQUFZLFFBQW1EO1FBRi9ELGFBQVEsR0FBb0MsRUFBRSxDQUFDO1FBRzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxNQUFNLENBQ0YsUUFBZ0IsRUFDaEIsT0FBWSxFQUFFLEVBQ2Qsb0JBQTRDO1FBRTVDLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM1QixPQUFPLE1BQU0sQ0FDVCw0Q0FBNEMsUUFBUSw2QkFBNkIsQ0FDcEYsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pELFlBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFO29CQUMxQyxTQUFTLEVBQUUsSUFBSTtpQkFDbEIsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFDM0IsSUFBQSxnQkFBUSxFQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMxRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxHQUFHLFdBQVc7aUJBQ3BCLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDVCxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBRWhDLE1BQU0sU0FBUyxHQUFHLENBQUMsd0RBQWEsUUFBUSxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFL0IsU0FBZSxpQkFBaUIsQ0FBQyxRQUFROzs7O29CQUNyQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7O3dCQUNoQixLQUEwQixhQUFBLGNBQUEsUUFBUSxDQUFBOzRCQUF2QixNQUFNLEtBQUsscUJBQUEsQ0FBQTs0QkFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQzt5QkFDbkI7Ozs7Ozs7OztvQkFDRCxPQUFPLE1BQU0sQ0FBQzs7YUFDakI7WUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFBLHVDQUFNLEVBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFOUIsTUFBTSxTQUFTLEdBQUcsaUJBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFM0MsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUVILGlDQUFpQztZQUVqQyxVQUFVLENBQUMsR0FBUyxFQUFFO2dCQUNsQixNQUFNLEdBQUcsR0FBRyxNQUFNLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFBLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDYixDQUFDLENBQUEsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQzs7QUExRUwseUNBMkVDO0FBMUVVLHlCQUFFLEdBQUcsS0FBSyxDQUFDO0FBQ1gsaUNBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLHdDQUFpQixHQUFHLGlEQUEyQyxDQUFDIn0=