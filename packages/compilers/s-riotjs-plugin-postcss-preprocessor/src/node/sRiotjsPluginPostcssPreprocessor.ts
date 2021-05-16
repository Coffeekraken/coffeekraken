import { registerPreprocessor } from '@riotjs/compiler';
import postcss from 'postcss';

/**
 * @name            sRiotjsPluginPostcssPreprocessor
 * @namespace       node
 * @type            Function
 *
 * This riot preprocessor allows you to use postcss inside your component
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function sRiotjsPluginPostcssPreprocessor(
  postcssPlugins: any[]
) {
  // @ts-ignore
  registerPreprocessor('css', 'postcss', function (code) {
    const css = postcss(postcssPlugins).process(code).css;
    return {
      code: css,
      map: null
    };
  });
}
