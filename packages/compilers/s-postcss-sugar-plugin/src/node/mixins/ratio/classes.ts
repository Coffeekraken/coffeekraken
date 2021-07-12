import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

/**
 * @name           classes
 * @namespace      node.mixins.ratio
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the ratio helper classes like s-ratio:16-9, s-ratio:1-1, etc.
 * The generated ratios are specified in the config.theme.ratio configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.ratio.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

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
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginRatioClassesParams>;
  atRule: any;
  replaceWith: Function;
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
  * @name          s-ratio:${ratioName.replace('/', '-')}
  * @namespace          sugar.css.ratio
  * @type               CssClass
  * @platform             css
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${ratioName}</yellow>" ratio style to any HTMLElement
  * 
  * @example        html
  * <div class="s-ratio\:${ratioName.replace('/', '-')} s-bg\:primary">
  *     <div class="s-center-abs">I'm a cool ratio container</div>
  * </div>
  */
.s-ratio--${ratioName.replace('/', '-')} {
    @sugar.ratio(${ratioValue});
}`;
    vars.push(ratioCss);
  });

  replaceWith(vars);
}
