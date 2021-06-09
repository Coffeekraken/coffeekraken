import __SInterface from '@coffeekraken/s-interface';
import __SugarConfig from '@coffeekraken/s-sugar-config';

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
  replaceWith
}: {
  params: any;
  atRule: any;
  replaceWith: Function;
}) {
  const themeConfig = __SugarConfig.get('theme');

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
    '@sugar.text.classes;',
    '@sugar.depth.classes;',
    '@sugar.util.classes;',
    '@sugar.flex.classes;',
    '@sugar.style.classes;',
    '@sugar.typo.classes;',
    '@sugar.icon.classes;'
  ];

  replaceWith(cssArray);
}
