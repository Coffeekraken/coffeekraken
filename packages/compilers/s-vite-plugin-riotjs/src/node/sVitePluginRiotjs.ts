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
          `import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';`,
          `import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';`,
          result.code.replace('export default ', 'const Component = '),
          // @ts-ignore
          `riot.register('${result.meta.tagName}', Component);`,
          // // @ts-ignore
          // 'setTimeout(() => {',
          // // @ts-ignore
          // `   riot.mount('${result.meta.tagName}');`,
          // '});',
          // @ts-ignore
          `__querySelectorLive('${result.meta.tagName}', ($elm) => {`,
          // @ts-ignore
          ` const id = $elm.id || '${result.meta.tagName}-' + __uniqid();
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
