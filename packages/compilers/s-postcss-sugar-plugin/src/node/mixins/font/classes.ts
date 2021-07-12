import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

/**
 * @name           classes
 * @namespace      node.mixins.font
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate font helper classes like s-font:title, s-font:20, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.font.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginFontClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginFontClassesParams {}

export { postcssSugarPluginFontClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginFontClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginFontClassesParams = {
    ...params
  };

  const vars: string[] = [];

  const fontsFamiliesObj = __theme().config('font.family');
  Object.keys(fontsFamiliesObj).forEach((fontName) => {
    vars.push(`/**
  * @name          s-font:${fontName}
  * @namespace          sugar.css.font
  * @type               CssClass
  * @platform       css
  * @status       beta
  * 
  * This class allows you to apply the font "<yellow>${fontName}</yellow>" to any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font\:${fontName}">Hello world</h1>
  */
.s-font--${fontName} {
    @sugar.font.family(${fontName});
}`);
  });

  const fontsSizesObj = __theme().config('font.size');
  Object.keys(fontsSizesObj).forEach((sizeName) => {
    vars.push(`/**
  * @name          s-font:${sizeName}
  * @namespace          sugar.css.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to apply the font size "<yellow>${sizeName}</yellow>" to any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font\:${sizeName}">Hello world</h1>
  */
.s-font--${sizeName} {
    @sugar.font.size(${sizeName});
}`);
  });

  replaceWith(vars);
}
