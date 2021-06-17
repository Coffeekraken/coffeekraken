import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginDepthClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginDepthClassesParams {}

export { postcssSugarPluginDepthClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginDepthClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginDepthClassesParams = {
    ...params
  };

  const depthsObj = __theme().config('depth');

  const vars: string[] = [];

  Object.keys(depthsObj).forEach((depthName) => {
    const depthCss = `/**
  * @name          s-depth--${depthName}
  * @namespace          sugar.css.depth
  * @type               CssClass
  * 
  * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any HTMLElement
  * 
  * @example        html
  * <a class="s-btn s-btn--primary s-depth-${depthName}">I'm a cool depth button</a>
  */
.s-depth--${depthName} {
    @sugar.depth(${depthName});
}`;
    vars.push(depthCss);
  });

  replaceWith(vars);
}
