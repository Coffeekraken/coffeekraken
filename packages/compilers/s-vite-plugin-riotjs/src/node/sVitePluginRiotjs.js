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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                    `import ____querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';`,
                    `import ____uniqid from '@coffeekraken/sugar/shared/string/uniqid';`,
                    result.code.replace('export default ', 'const Component = '),
                    // @ts-ignore
                    `riot.register('${result.meta.tagName}', Component);`,
                    // // @ts-ignore
                    // 'setTimeout(() => {',
                    // // @ts-ignore
                    // `   riot.mount('${result.meta.tagName}');`,
                    // '});',
                    // @ts-ignore
                    `____querySelectorLive('${result.meta.tagName}:not([mounted])', ($elm) => {`,
                    // @ts-ignore
                    ` const id = $elm.id || '${result.meta.tagName}-' + ____uniqid();
            $elm.setAttribute('id', id);
            riot.mount('#' + id);
          });`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1ZpdGVQbHVnaW5SaW90anMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzVml0ZVBsdWdpblJpb3Rqcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFM0M7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCLENBQUMsZUFBb0IsRUFBRTtJQUM5RCxNQUFNLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztJQUVuQyxPQUFPO1FBQ0wsSUFBSSxFQUFFLHNCQUFzQjtRQUU1QixTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDZixJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3RCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7b0JBQzFCLFNBQVMsRUFBRSxJQUFJO29CQUNmLGFBQWE7b0JBQ2IsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztvQkFDcEIsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztnQkFFSCxNQUFNLElBQUksR0FBRztvQkFDWCwrQkFBK0I7b0JBQy9CLHlGQUF5RjtvQkFDekYsb0VBQW9FO29CQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQztvQkFDNUQsYUFBYTtvQkFDYixrQkFBa0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLGdCQUFnQjtvQkFDckQsZ0JBQWdCO29CQUNoQix3QkFBd0I7b0JBQ3hCLGdCQUFnQjtvQkFDaEIsOENBQThDO29CQUM5QyxTQUFTO29CQUNULGFBQWE7b0JBQ2IsMEJBQTBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTywrQkFBK0I7b0JBQzVFLGFBQWE7b0JBQ2IsMkJBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTzs7O2NBRzFDO29CQUNKLDJCQUEyQjtvQkFDekIsYUFBYTtvQkFDYixlQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLO29CQUN6QyxJQUFJO29CQUNKLDJCQUEyQjtpQkFDNUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRWIsT0FBTztvQkFDTCxJQUFJO29CQUNKLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRztpQkFDaEIsQ0FBQzthQUNIO1FBQ0gsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDIn0=