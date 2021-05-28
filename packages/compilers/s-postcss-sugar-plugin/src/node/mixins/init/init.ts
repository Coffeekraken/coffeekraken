import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';

class postcssSugarPluginMediaMixinInterface extends __SInterface {
  static definition = {
    theme: {
      type: 'String'
    }
  };
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
export default function ({
  params,
  atRule,
  processNested
}: {
  params: any;
  atRule: any;
  processNested: Function;
}) {
  const themeConfig = __sugarConfig('theme');

  const cssArray = [
    `@sugar.theme(${params.theme ?? themeConfig.theme});`,
    '@sugar.reset;',
    '@sugar.font.faces;',
    '@sugar.font.classes;',
    '@sugar.lnf.base;',
    '@sugar.color.docblocks;',
    '@sugar.layout.classes;',
    '@sugar.color.classes;',
    '@sugar.align.classes;',
    '@sugar.space.classes;',
    '@sugar.size.classes;',
    '@sugar.depth.classes;',
    '@sugar.util.classes;',
    '@sugar.style.classes;'
  ];

  const AST = processNested(cssArray.join('\n'));
  atRule.replaceWith(AST);
}
