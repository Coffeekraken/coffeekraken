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
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginRatioClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginRatioClassesParams = {
        ratio: 1,
        ...params,
    };

    const ratioObj = __theme().config('ratio');

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Clearfix
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/clearfix
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a clearfix on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(ratioObj)
            .map((ratioName) => {
                return ` * @cssClass     s-ratio:${ratioName.replace('/', '-')}
                }            Apply the ${ratioName} ratio`;
            })
            .join('\n')}
        * 
        * @example        html
        ${Object.keys(ratioObj)
            .map((ratioName) => {
                return ` * <!-- ${ratioName} ratio -->
            * <div class="s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">${ratioName} ratio</h3>
            *   <div class="s-ratio\:${ratioName.replace('/', '-')}">
            *       <img class="s-fit\:cover" src="https://picsum.photos/500/500" />
            *   </div>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

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
