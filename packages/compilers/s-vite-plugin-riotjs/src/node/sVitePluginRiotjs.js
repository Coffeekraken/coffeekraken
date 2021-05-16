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
    const fileRegex = /\.(riot)$/;
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
                let code = [
                    'import * as riot from "riot";',
                    result.code.replace('export default ', 'const Component = '),
                    // @ts-ignore
                    `riot.register('${result.meta.tagName}', Component);`,
                    // @ts-ignore
                    `riot.mount('${result.meta.tagName}');`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1ZpdGVQbHVnaW5SaW90anMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzVml0ZVBsdWdpblJpb3Rqcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFM0M7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCLENBQUMsZUFBb0IsRUFBRTtJQUM5RCxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUM7SUFFOUIsT0FBTztRQUNMLElBQUksRUFBRSxzQkFBc0I7UUFFNUIsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUN0QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFO29CQUMxQixTQUFTLEVBQUUsSUFBSTtvQkFDZixhQUFhO29CQUNiLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7b0JBQ3BCLFFBQVEsRUFBRSxLQUFLO2lCQUNoQixDQUFDLENBQUM7Z0JBRUgsSUFBSSxJQUFJLEdBQUc7b0JBQ1QsK0JBQStCO29CQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQztvQkFDNUQsYUFBYTtvQkFDYixrQkFBa0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLGdCQUFnQjtvQkFDckQsYUFBYTtvQkFDYixlQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLO29CQUN2QywyQkFBMkI7aUJBQzVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUViLE9BQU87b0JBQ0wsSUFBSTtvQkFDSixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7aUJBQ2hCLENBQUM7YUFDSDtRQUNILENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyJ9