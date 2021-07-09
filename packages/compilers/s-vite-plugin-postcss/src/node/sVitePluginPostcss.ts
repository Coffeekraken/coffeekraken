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
            if (typeof p === 'string') {
                const plugin = require(p);
                const fn = plugin.default ?? plugin;
                const options = postcssConfig.pluginsOptions[p] ?? {};
                return fn(options);
            }
            return p;
        });

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
