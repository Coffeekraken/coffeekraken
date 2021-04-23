import __sugarConfig from './sugar';
import __get from '@coffeekraken/sugar/shared/object/get';

/**
 * @name            themeConfig
 * @namespace       shared
 * @type            Function
 *
 * This function simply get a theme value depending on the dot path passed and the
 * theme wanted.
 * If the wanted theme is not ```default```, it will try to get the value from
 * this passed theme and fallback to the default theme value if not exists.
 *
 * @param       {String}        dotPath         The dot path to the value wanted
 * @param       {String}        [theme='default']       The theme from which to get the value
 * @return      {Any}                           The value getted from the theme
 *
 * @example         js
 * import { themeConfig } from '@coffeekraken/s-sugar-config';
 * themeConfig('paddings.100', 'something'); // => 1rem
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function themeConfig(dotPath: string, theme?: string): any {
  // get theme
  const themeObj = __sugarConfig('theme');
  let activeTheme = theme ?? themeObj.baseTheme;
  if (!themeObj.themes[activeTheme]) activeTheme = 'default';
  const res = __get(themeObj.themes[activeTheme], dotPath);
  if (res !== undefined) return res;
  if (activeTheme !== 'default') return themeConfig(dotPath, 'default');
  throw new Error(
    `<red>[themeConfig]</red> Sorry but the requested value "<yellow>${dotPath}</yellow>" for the theme "<cyan>${activeTheme}</cyan>" does not exists...`
  );
}
