import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

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
  * @name          s-font-${fontName}
  * @namespace          sugar.css.font
  * @type               CssClass
  * 
  * This class allows you to apply the font "<yellow>${fontName}</yellow>" to any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font-${fontName}">Hello world</h1>
  */
.s-font-${fontName} {
    @sugar.font.family(${fontName});
}`);
  });

  const fontsSizesObj = __theme().config('font.size');
  Object.keys(fontsSizesObj).forEach((sizeName) => {
    vars.push(`/**
  * @name          s-font-size-${sizeName}
  * @namespace          sugar.css.mixins.font
  * @type               CssClass
  * 
  * This class allows you to apply the font size "<yellow>${sizeName}</yellow>" to any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font-size-${sizeName}">Hello world</h1>
  */
.s-font-size-${sizeName} {
    @sugar.font.size(${sizeName});
}`);
  });

  replaceWith(vars);
}
