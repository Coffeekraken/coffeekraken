import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginRatioClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginRatioClassesParams {
  ratio: number;
}

export { postcssSugarPluginRatioClassesInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginRatioClassesParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginRatioClassesParams = {
    ratio: 1,
    ...params
  };

  const ratioObj = __theme().config('ratio');

  const vars: string[] = [];

  Object.keys(ratioObj).forEach((ratioName) => {
    const ratioValue = ratioObj[ratioName];
    const ratioCss = `/**
  * @name          s-ratio-${ratioName.replace('/', '-')}
  * @namespace          sugar.css.ratio
  * @type               CssClass
  * 
  * This class allows you to apply a "<yellow>${ratioName}</yellow>" ratio style to any HTMLElement
  * 
  * @example        html
  * <div class="s-ratio-${ratioName.replace('/', '-')} s-bg-primary">
  *     <div class="s-center-abs">I'm a cool ratio container</div>
  * </div>
  */
.s-ratio-${ratioName.replace('/', '-')} {
    @sugar.ratio(${ratioValue});
}`;
    vars.push(ratioCss);
  });

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
