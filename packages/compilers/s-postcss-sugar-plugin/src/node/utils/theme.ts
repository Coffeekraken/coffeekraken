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
  default: __STheme.baseTheme
};

export { themeDefinition };
export default function theme(theme?: string): __STheme {
  if (
    global._postcssSugarPluginThemeScopeMixinTheme &&
    global._postcssSugarPluginThemeScopeMixinTheme.length >= 1
  ) {
    theme = global._postcssSugarPluginThemeScopeMixinTheme.pop();
  } else {
    theme = __STheme.baseTheme;
  }
  return __STheme.theme(theme);
}

// // @ts-ignore
// if (!global._sTheme) global._sTheme = new __STheme();
// // @ts-ignore
// export default global._sTheme;
