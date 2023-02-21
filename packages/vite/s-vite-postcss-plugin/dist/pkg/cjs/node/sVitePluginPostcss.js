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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const postcss_1 = __importDefault(require("postcss"));
/**
 * @name            sVitePluginPostcss
 * @namespace       node
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This plugin allows you to use the awesome RiotJs library
 * to build your webcomponent using vite frontend development stack.
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function sVitePluginPostcss() {
    const fileRegex = /\.css(\?.*)?$/;
    const postcssConfig = s_sugar_config_1.default.get('postcss');
    return {
        name: 's-vite-plugin-postcss',
        transform(src, id) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                if (fileRegex.test(id)) {
                    // resolve plugins paths
                    const plugins = [];
                    for (let i = 0; i < postcssConfig.plugins.length; i++) {
                        const p = postcssConfig.plugins[i];
                        if (typeof p === 'string') {
                            const { default: plugin } = yield Promise.resolve().then(() => __importStar(require(p)));
                            const fn = (_a = plugin.default) !== null && _a !== void 0 ? _a : plugin;
                            const options = (_b = postcssConfig.pluginsOptions[p]) !== null && _b !== void 0 ? _b : {};
                            plugins.push(fn(Object.assign({ target: 'vite' }, options)));
                        }
                        else {
                            plugins.push(p);
                        }
                    }
                    // build postcss
                    const result = yield (0, postcss_1.default)(plugins).process(src !== null && src !== void 0 ? src : '', {
                        from: id.split('?')[0],
                    });
                    return {
                        code: result.css,
                        map: null,
                    };
                }
            });
        },
    };
}
exports.default = sVitePluginPostcss;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRkFBMEQ7QUFDMUQsc0RBQWdDO0FBRWhDOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILFNBQXdCLGtCQUFrQjtJQUN0QyxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUM7SUFFbEMsTUFBTSxhQUFhLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFcEQsT0FBTztRQUNILElBQUksRUFBRSx1QkFBdUI7UUFDdkIsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFOzs7Z0JBQ25CLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDcEIsd0JBQXdCO29CQUN4QixNQUFNLE9BQU8sR0FBVSxFQUFFLENBQUM7b0JBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDbkQsTUFBTSxDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFbkMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7NEJBQ3ZCLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsd0RBQWEsQ0FBQyxHQUFDLENBQUM7NEJBQzVDLE1BQU0sRUFBRSxHQUFHLE1BQUEsTUFBTSxDQUFDLE9BQU8sbUNBQUksTUFBTSxDQUFDOzRCQUNwQyxNQUFNLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQzs0QkFDdEQsT0FBTyxDQUFDLElBQUksQ0FDUixFQUFFLGlCQUNFLE1BQU0sRUFBRSxNQUFNLElBQ1gsT0FBTyxFQUNaLENBQ0wsQ0FBQzt5QkFDTDs2QkFBTTs0QkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNuQjtxQkFDSjtvQkFFRCxnQkFBZ0I7b0JBQ2hCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxpQkFBUyxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLGFBQUgsR0FBRyxjQUFILEdBQUcsR0FBSSxFQUFFLEVBQUU7d0JBQ3ZELElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDekIsQ0FBQyxDQUFDO29CQUNILE9BQU87d0JBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHO3dCQUNoQixHQUFHLEVBQUUsSUFBSTtxQkFDWixDQUFDO2lCQUNMOztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUF4Q0QscUNBd0NDIn0=