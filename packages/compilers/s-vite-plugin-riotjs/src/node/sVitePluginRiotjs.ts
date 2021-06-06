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
export default function sVitePluginRiotjs(riotSettings: any = {}) {
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
          `   riot.mount('${result.meta.tagName}');`,
          '});',
          `Component.mount = () => {
            riot.mount('${result.meta.tagName}');
          };`,
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
