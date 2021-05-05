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
  processNested
}: {
  params: Partial<IPostcssSugarPluginFontClassesParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginFontClassesParams = {
    ...params
  };

  const vars: string[] = [];

  const fontsFamiliesObj = __theme().config('font.family');
  Object.keys(fontsFamiliesObj).forEach((fontName) => {
    vars.push(`/**
  * @name          .s-font-${fontName}
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

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
