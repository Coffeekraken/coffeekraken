import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginLayoutClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginLayoutClassesParams {}

export { postcssSugarPluginLayoutClassesInterface as interface };

export default function (
  params: Partial<IPostcssSugarPluginLayoutClassesParams> = {},
  atRule,
  processNested
) {
  const finalParams: IPostcssSugarPluginLayoutClassesParams = {
    ...params
  };

  const vars: string[] = [];

  vars.push(`/**
  * @name          .s-container
  * @namespace          sugar.css.layout
  * @type               CssClass
  * 
  * This class allows you to apply the container styling to any HTMLElement
  * 
  * @example        html
  * <div class="s-container">
  *     <h1 class="s-h1">Hello world</h1>
  * </div>
  */
.s-container {
    @sugar.layout.container;
}`);

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
