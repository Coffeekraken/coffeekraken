import { compile } from '@riotjs/compiler';
/**
 * @name            sVitePluginRiotjs
 * @namespace       node
 * @type            Function
 *
 * This plugin allows you to use the awesome RiotJs library
 * to build your webcomponent using vite frontend development stack.
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function sVitePluginRiotjs(riotSettings = {}) {
    const fileRegex = /\.riot(\?.*)?$/;
    return {
        name: 's-vite-plugin-riotjs',
        transform(src, id) {
            if (fileRegex.test(id)) {
                const result = compile(src, {
                    scopedCss: true,
                    // @ts-ignore
                    brackets: ['{', '}'],
                    comments: false
                });
                const code = [
                    'import * as riot from "riot";',
                    result.code.replace('export default ', 'const Component = '),
                    // @ts-ignore
                    `riot.register('${result.meta.tagName}', Component);`,
                    // @ts-ignore
                    'setTimeout(() => {',
                    // @ts-ignore
                    `   riot.mount('${result.meta.tagName}');`,
                    '});',
                    `Component.mount = () => {`,
                    // @ts-ignore
                    `riot.mount('${result.meta.tagName}');`,
                    `};`,
                    'export default Component;'
                ].join('\n');
                return {
                    code,
                    map: result.map
                };
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1ZpdGVQbHVnaW5SaW90anMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzVml0ZVBsdWdpblJpb3Rqcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFM0M7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCLENBQUMsZUFBb0IsRUFBRTtJQUM5RCxNQUFNLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztJQUVuQyxPQUFPO1FBQ0wsSUFBSSxFQUFFLHNCQUFzQjtRQUU1QixTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDZixJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3RCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7b0JBQzFCLFNBQVMsRUFBRSxJQUFJO29CQUNmLGFBQWE7b0JBQ2IsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztvQkFDcEIsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztnQkFFSCxNQUFNLElBQUksR0FBRztvQkFDWCwrQkFBK0I7b0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDO29CQUM1RCxhQUFhO29CQUNiLGtCQUFrQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sZ0JBQWdCO29CQUNyRCxhQUFhO29CQUNiLG9CQUFvQjtvQkFDcEIsYUFBYTtvQkFDYixrQkFBa0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUs7b0JBQzFDLEtBQUs7b0JBQ0wsMkJBQTJCO29CQUN6QixhQUFhO29CQUNiLGVBQWUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUs7b0JBQ3pDLElBQUk7b0JBQ0osMkJBQTJCO2lCQUM1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFYixPQUFPO29CQUNMLElBQUk7b0JBQ0osR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHO2lCQUNoQixDQUFDO2FBQ0g7UUFDSCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==