import __theme from './theme';
import __minifyVar from './minifyVar';

/**
 * @name        themeVar
 * @namespace   node.utils
 * @type        Function
 *
 * This function take a simple theme dot path and returns the proper
 * variable string with the value fallback.
 *
 * @param       {String}        dotPath         The dot path theme variable you want
 * @return      {String}                        The proper css variable string that represent this value with his fallback just in case
 *
 * @example         js
 * import { themeVar } from '@coffeekraken/s-postcss-sugar-plugin';
 * themeVar('ui.button.padding'); // => var(--s-theme-ui-button-padding, 1em 1.2em)
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function themeVar(dotPath: string, fallback = true): string {
  let fb = __theme().config(dotPath);
  if (!fallback || typeof fb === 'string' && fb.includes(',')) fb = 0;

  const v = `var(${__minifyVar(`--s-theme-${dotPath
    .replace(/\./gm, '-')
    .replace(/:/gm, '-')
    .replace(/\?/gm, '')
    .replace(/--/gm, '-')}`)}, ${fb})`;
  return v;
}
