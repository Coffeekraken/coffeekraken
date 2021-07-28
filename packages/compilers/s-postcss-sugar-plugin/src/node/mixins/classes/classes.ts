import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginClassesMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginClassesMixinInterface as interface };

/**
 * @name           classes
 * @namespace      node.mixins.classes
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the sugar classes like utilities for colors, fonts, margins, etc...
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * \@sugar.classes;
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
    '@sugar.overflow.classes;',
    '@sugar.position.classes;',
    '@sugar.pointer.classes;',
    '@sugar.icon.classes;',
    '@sugar.margin.classes;',
    '@sugar.padding.classes;',
    '@sugar.width.classes;',
    '@sugar.components.classes;'
  ];

  replaceWith(cssArray);
}
