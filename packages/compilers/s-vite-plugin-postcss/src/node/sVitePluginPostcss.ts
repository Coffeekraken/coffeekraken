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
    async transform(src, id) {

      if (fileRegex.test(id)) {

        // resolve plugins paths
        const plugins: any[] = [];
        for (let i=0; i<postcssConfig.plugins.length; i++) {
          const p = postcssConfig.plugins[i];
          if (typeof p === 'string') {
              const { default: plugin } = await import(p);
              const fn = plugin.default ?? plugin;
              const options = postcssConfig.pluginsOptions[p] ?? {};
              plugins.push(fn(options));
          } else {
            plugins.push(p);
          }
        }

        // build postcss
        const css = __postcss(plugins).process(src ?? '', {
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
