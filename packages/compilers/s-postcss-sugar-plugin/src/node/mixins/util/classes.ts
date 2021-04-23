import __SInterface from '@coffeekraken/s-interface';
import { themeConfig } from '@coffeekraken/s-sugar-config';

class postcssSugarPluginUtilClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginUtilClassesParams {}

export { postcssSugarPluginUtilClassesInterface as interface };

export default function (
  params: Partial<IPostcssSugarPluginUiButttilesParams> = {},
  atRule,
  processNested
) {
  const finalParams: IPostcssSugarPluginUiBtilassesParams = {
    ...params
  };

  const pilled = `/**
  * @name          .s-pilled
  * @namespace          sugar.util
  * @type               CssClass
  * 
  * This class allows you to apply a "<yellow>pill</yellow>" style to any HTMLElement
  * 
  * @example        html
  * <a class="s-btn s-btn--primary s-pilled">I'm a cool pilled button</a>
  */
.s-pilled {
    @sugar.util.pilled;
}`;

  const vars: string[] = [pilled];

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
