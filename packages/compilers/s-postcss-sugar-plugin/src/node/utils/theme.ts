// @ts-nocheck

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

const themeDefinition = {
  type: 'String',
  values: __STheme.themes,
  default: __STheme.theme
};

export { themeDefinition };
export default function theme(theme?: string): __STheme {
  return __STheme.getTheme(theme);
}