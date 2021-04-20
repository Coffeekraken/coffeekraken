import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __postCss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

import __docblockColors from '../color/docblock';

class postcssSugarPluginMediaMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginMediaMixinInterface as interface };

/**
 * @name           init
 * @namespace      mixins
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to apply media queries depending on the ```media.config.js``` config
 * file with ease.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function (params = {}, atRule = null) {
  const colors = __docblockColors();

  const cssArray = [colors];

  if (atRule) {
    const AST = __postCss.parse(cssArray.join('\n'));
    atRule.replaceWith(AST);
  } else {
    return cssArray.join('\n');
  }
}
