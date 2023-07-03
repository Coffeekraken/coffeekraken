var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __postcss from 'postcss';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQzs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGtCQUFrQjtJQUN0QyxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUM7SUFFbEMsTUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVwRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLHVCQUF1QjtRQUN2QixTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUU7OztnQkFDbkIsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUNwQix3QkFBd0I7b0JBQ3hCLE1BQU0sT0FBTyxHQUFVLEVBQUUsQ0FBQztvQkFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNuRCxNQUFNLENBQUMsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUVuQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTs0QkFDdkIsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDNUMsTUFBTSxFQUFFLEdBQUcsTUFBQSxNQUFNLENBQUMsT0FBTyxtQ0FBSSxNQUFNLENBQUM7NEJBQ3BDLE1BQU0sT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDOzRCQUN0RCxPQUFPLENBQUMsSUFBSSxDQUNSLEVBQUUsaUJBQ0UsTUFBTSxFQUFFLE1BQU0sSUFDWCxPQUFPLEVBQ1osQ0FDTCxDQUFDO3lCQUNMOzZCQUFNOzRCQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ25CO3FCQUNKO29CQUVELGdCQUFnQjtvQkFDaEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsYUFBSCxHQUFHLGNBQUgsR0FBRyxHQUFJLEVBQUUsRUFBRTt3QkFDdkQsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN6QixDQUFDLENBQUM7b0JBQ0gsT0FBTzt3QkFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUc7d0JBQ2hCLEdBQUcsRUFBRSxJQUFJO3FCQUNaLENBQUM7aUJBQ0w7O1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9