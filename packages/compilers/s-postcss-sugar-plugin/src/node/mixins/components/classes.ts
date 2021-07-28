import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginComponentsClassesInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginComponentsClassesInterface as interface };

/**
 * @name           classes
 * @namespace      mixins.components
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to print all the ui classes for listed in the theme config components
 *
 * @example         postcss
 * \@sugar.components.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bospsel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: any;
  atRule: any;
  replaceWith: Function;
}) {
  const cssArray: string[] = [];

  const componentsObj = __theme().config('components');

    Object.keys(componentsObj).forEach(selector => {
        cssArray.push(`
            ${selector} {
                @sugar.utils.configToCss(components.${selector});
            }
        `);
    });

  replaceWith(cssArray);
}
