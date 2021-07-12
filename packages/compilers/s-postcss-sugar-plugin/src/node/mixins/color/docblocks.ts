import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginDocblockColorsMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginDocblockColorsMixinInterface as interface };

/**
 * @name           docblocks
 * @namespace      mixins.color
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin print the documentation docblocks for the colors
 * into your final css.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.color.docblocks;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {
  const cssArray: string[] = [];

  const colorsObj = __theme().config('color');

  const colors = Object.keys(colorsObj);
  colors.forEach((colorName) => {
    const colorObj = colorsObj[colorName];
    Object.keys(colorObj).forEach((modifier) => {
      const colorValue = colorObj[modifier];
      cssArray.push(
        [
          `/**`,
          ` * @name 		    ${colorName}`,
          ` * @modifier        ${modifier}`,
          ` * @namespace       sugar.css.theme.${__theme().name}.colors`,
          ` * @type            color`,
          ` * @platform       css`,
          ` * @status         stable`,
          ` *`,
          ` * This is the "${colorName}${
            modifier !== 'default' ? `-${modifier}` : ''
          }" registered color`,
          ` *`,
          ` * @color 		${colorValue}`,
          ` */`
        ].join('\n')
      );
    });
  });

  replaceWith(cssArray);
}
