import __postcss from 'postcss';

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
export default function sVitePluginPostcss(postcssPlugins: any[] = []) {
  const fileRegex = /\.css(\?.*)?$/;

  return {
    name: 's-vite-plugin-postcss',

    transform(src, id) {
      if (fileRegex.test(id)) {
        const css = __postcss(postcssPlugins).process(src).css;
        return {
          code: css,
          map: null
        };
      }
    }
  };
}
