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
                            const { default: plugin } = yield import(p);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELHNEQUFnQztBQUVoQzs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxTQUF3QixrQkFBa0I7SUFDdEMsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDO0lBRWxDLE1BQU0sYUFBYSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXBELE9BQU87UUFDSCxJQUFJLEVBQUUsdUJBQXVCO1FBQ3ZCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7O2dCQUNuQixJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3BCLHdCQUF3QjtvQkFDeEIsTUFBTSxPQUFPLEdBQVUsRUFBRSxDQUFDO29CQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ25ELE1BQU0sQ0FBQyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRW5DLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFOzRCQUN2QixNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxNQUFNLEVBQUUsR0FBRyxNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLE1BQU0sQ0FBQzs0QkFDcEMsTUFBTSxPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7NEJBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQ1IsRUFBRSxpQkFDRSxNQUFNLEVBQUUsTUFBTSxJQUNYLE9BQU8sRUFDWixDQUNMLENBQUM7eUJBQ0w7NkJBQU07NEJBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDbkI7cUJBQ0o7b0JBRUQsZ0JBQWdCO29CQUNoQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsaUJBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxhQUFILEdBQUcsY0FBSCxHQUFHLEdBQUksRUFBRSxFQUFFO3dCQUN2RCxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3pCLENBQUMsQ0FBQztvQkFDSCxPQUFPO3dCQUNILElBQUksRUFBRSxNQUFNLENBQUMsR0FBRzt3QkFDaEIsR0FBRyxFQUFFLElBQUk7cUJBQ1osQ0FBQztpQkFDTDs7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBeENELHFDQXdDQyJ9