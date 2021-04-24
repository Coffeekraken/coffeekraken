import { themeConfig } from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginSizeClassesMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginSizeClassesMixinInterface as interface };

/**
 * @name           classes
 * @namespace      mixins.size
 * @type           Mixin
 * @status        beta
 *
 * This mixin output all the sizes classes like ```.s-size-50```, etc...
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.size.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function (params = {}, atRule, processNested) {
  const sizes = themeConfig('size');

  const cssArray: string[] = [];

  Object.keys(sizes).forEach((sizeName) => {
    const size = sizes[sizeName];

    cssArray.push(
      [
        `/**`,
        ` * @name           s-size-${sizeName}`,
        ` * @namespace      sugar.css.size.classes`,
        ` * @type           CssClass`,
        ` *`,
        ` * This class allows you to apply the "${sizeName}" size to an HTMLElement`,
        ` *`,
        ` * @example        html`,
        ` * <h1 class="s-size-${sizeName}">`,
        ` *     Something cool`,
        ` * </h1>`,
        ` */`,
        `.s-size-${sizeName} {`,
        `   font-size: ${size};`,
        `}`
      ].join('\n')
    );
  });

  const AST = processNested(cssArray.join('\n'));
  atRule.replaceWith(AST);
}
