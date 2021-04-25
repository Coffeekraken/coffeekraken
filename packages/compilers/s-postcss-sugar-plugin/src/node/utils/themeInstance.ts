import __STheme from '@coffeekraken/s-theme';

/**
 * @name        themeInstance
 * @namespace      node.utils
 * @type          STheme
 *
 * Gives you access to the current theme STheme instance in order to access
 * utilities methods like loopOnColors, etc...
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

// @ts-ignore
if (!global._sTheme) global._sTheme = new __STheme();
// @ts-ignore
export default global._sTheme;
