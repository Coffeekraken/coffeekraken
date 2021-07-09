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
            if (fileRegex.test(id)) {
                // resolve plugins paths
                const plugins = postcssConfig.plugins.map((p) => {
                    var _a, _b;
                    if (typeof p === 'string') {
                        const plugin = require(p);
                        const fn = (_a = plugin.default) !== null && _a !== void 0 ? _a : plugin;
                        const options = (_b = postcssConfig.pluginsOptions[p]) !== null && _b !== void 0 ? _b : {};
                        return fn(options);
                    }
                    return p;
                });
                // build postcss
                const css = __postcss(plugins).process(src !== null && src !== void 0 ? src : '', {
                    from: id.split('?')[0]
                }).css;
                return {
                    code: css,
                    map: null
                };
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1ZpdGVQbHVnaW5Qb3N0Y3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic1ZpdGVQbHVnaW5Qb3N0Y3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0I7SUFDeEMsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDO0lBRWxDLE1BQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFcEQsT0FBTztRQUNMLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBRWYsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUV0Qix3QkFBd0I7Z0JBQ3hCLE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7O29CQUM1QyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTt3QkFDdkIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixNQUFNLEVBQUUsR0FBRyxNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLE1BQU0sQ0FBQzt3QkFDcEMsTUFBTSxPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7d0JBQ3RELE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUN0QjtvQkFDRCxPQUFPLENBQUMsQ0FBQztnQkFDYixDQUFDLENBQUMsQ0FBQztnQkFFSCxnQkFBZ0I7Z0JBQ2hCLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxhQUFILEdBQUcsY0FBSCxHQUFHLEdBQUksRUFBRSxFQUFFO29CQUM5QyxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3pCLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQ1AsT0FBTztvQkFDTCxJQUFJLEVBQUUsR0FBRztvQkFDVCxHQUFHLEVBQUUsSUFBSTtpQkFDVixDQUFDO2FBQ0g7UUFDSCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==