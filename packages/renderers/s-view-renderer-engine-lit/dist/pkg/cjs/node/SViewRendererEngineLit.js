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
            const component = (yield Promise.resolve().then(() => __importStar(require(viewPath)))).default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBRWpELHFEQUFxRDtBQUNyRCxxR0FBMEU7QUFDMUUsNENBQXNCO0FBQ3RCLG1DQUFrQztBQUNsQyxrSUFBOEc7QUFtQjlHLE1BQXFCLHNCQUFzQjtJQU12QyxZQUFZLFFBQW1EO1FBRi9ELGFBQVEsR0FBb0MsRUFBRSxDQUFDO1FBRzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxNQUFNLENBQ0YsUUFBZ0IsRUFDaEIsT0FBWSxFQUFFLEVBQ2Qsb0JBQTRDO1FBRTVDLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNqRCxZQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtvQkFDMUMsU0FBUyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDO1lBQzNCLElBQUEsZ0JBQVEsRUFBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDMUQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztZQUNILFdBQVcsR0FBRyxXQUFXO2lCQUNwQixLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ1QsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV4QixNQUFNLFNBQVMsR0FBRyxDQUFDLHdEQUFhLFFBQVEsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBRW5ELFNBQWUsaUJBQWlCLENBQUMsUUFBUTs7OztvQkFDckMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOzt3QkFDaEIsS0FBMEIsYUFBQSxjQUFBLFFBQVEsQ0FBQTs0QkFBdkIsTUFBTSxLQUFLLHFCQUFBLENBQUE7NEJBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUM7eUJBQ25COzs7Ozs7Ozs7b0JBQ0QsT0FBTyxNQUFNLENBQUM7O2FBQ2pCO1lBRUQsTUFBTSxTQUFTLEdBQUcsSUFBQSx1Q0FBTSxFQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRTFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRTlCLE1BQU0sU0FBUyxHQUFHLGlCQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTNDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7WUFFSCxpQ0FBaUM7WUFFakMsVUFBVSxDQUFDLEdBQVMsRUFBRTtnQkFDbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7O0FBakVMLHlDQWtFQztBQWpFVSx5QkFBRSxHQUFHLEtBQUssQ0FBQztBQUNYLGlDQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQix3Q0FBaUIsR0FBRyxpREFBMkMsQ0FBQyJ9