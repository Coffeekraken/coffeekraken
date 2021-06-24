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
    '@sugar.reset;',
    `@sugar.theme(${params.theme ?? themeConfig.theme});`,
    '@sugar.font.faces;'
    // '@sugar.lnf.base;', called in the "@sugar.theme" mixin
  ];

  replaceWith(cssArray);
}
