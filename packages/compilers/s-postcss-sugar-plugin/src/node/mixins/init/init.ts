import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';

class postcssSugarPluginMediaMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginMediaMixinInterface as interface };

/**
 * @name           init
 * @namespace      mixins.init
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
export default function (params = {}, atRule, processNested) {
  const themeConfig = __sugarConfig('theme');

  const cssArray = [
    `@sugar.theme(${themeConfig.baseTheme});`,
    '@sugar.reset;',
    '@sugar.layout.classes;',
    '@sugar.font.init;',
    '@sugar.font.classes;',
    '@sugar.color.docblocks;',
    '@sugar.color.classes;',
    '@sugar.size.classes;',
    '@sugar.depth.classes;',
    '@sugar.util.classes;'
  ];

  const AST = processNested(cssArray.join('\n'));
  atRule.replaceWith(AST);
}
