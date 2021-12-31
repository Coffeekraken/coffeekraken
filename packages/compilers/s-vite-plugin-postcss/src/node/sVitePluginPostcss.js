var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __postcss from 'postcss';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name            sVitePluginPostcss
 * @namespace       node
 * @type            Function
 *
 * This plugin allows you to use the awesome RiotJs library
 * to build your webcomponent using vite frontend development stack.
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function sVitePluginPostcss() {
    const fileRegex = /\.css(\?.*)?$/;
    const postcssConfig = __SSugarConfig.get('postcss');
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
                    const result = yield __postcss(plugins).process(src !== null && src !== void 0 ? src : '', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1ZpdGVQbHVnaW5Qb3N0Y3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic1ZpdGVQbHVnaW5Qb3N0Y3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0I7SUFDdEMsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDO0lBRWxDLE1BQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFcEQsT0FBTztRQUNILElBQUksRUFBRSx1QkFBdUI7UUFDdkIsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFOzs7Z0JBQ25CLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDcEIsd0JBQXdCO29CQUN4QixNQUFNLE9BQU8sR0FBVSxFQUFFLENBQUM7b0JBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDbkQsTUFBTSxDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFbkMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7NEJBQ3ZCLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVDLE1BQU0sRUFBRSxHQUFHLE1BQUEsTUFBTSxDQUFDLE9BQU8sbUNBQUksTUFBTSxDQUFDOzRCQUNwQyxNQUFNLE9BQU8sR0FBRyxNQUFBLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQzs0QkFDdEQsT0FBTyxDQUFDLElBQUksQ0FDUixFQUFFLGlCQUNFLE1BQU0sRUFBRSxNQUFNLElBQ1gsT0FBTyxFQUNaLENBQ0wsQ0FBQzt5QkFDTDs2QkFBTTs0QkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNuQjtxQkFDSjtvQkFFRCxnQkFBZ0I7b0JBQ2hCLE1BQU0sTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLGFBQUgsR0FBRyxjQUFILEdBQUcsR0FBSSxFQUFFLEVBQUU7d0JBQ3ZELElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDekIsQ0FBQyxDQUFDO29CQUNILE9BQU87d0JBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHO3dCQUNoQixHQUFHLEVBQUUsSUFBSTtxQkFDWixDQUFDO2lCQUNMOztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==