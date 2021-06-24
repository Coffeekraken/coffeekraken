import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginClassesMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginClassesMixinInterface as interface };

/**
 * @name           classes
 * @namespace      mixins.classes
 * @type           Mixin
 * @status        beta
 *
 * This mixin generate all the sugar classes like utilities for colors, fonts, margins, etc...
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.Classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {

  const cssArray: string[] = [
    '@sugar.ui.classes;',
    '@sugar.typo.classes;',
    '@sugar.layout.classes;',
    '@sugar.color.classes;',
    '@sugar.align.classes;',
    '@sugar.text.classes;',
    '@sugar.font.classes;',
    '@sugar.depth.classes;',
    '@sugar.flex.classes;',
    '@sugar.ratio.classes;',
    '@sugar.border.classes;',
    '@sugar.display.classes;',
    '@sugar.position.classes;',
    '@sugar.style.classes;',
    '@sugar.icon.classes;',
    '@sugar.space.classes;',
    '@sugar.width.classes;'
  ];

  replaceWith(cssArray);
}
