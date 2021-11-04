import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name           classes
 * @namespace      node.mixins.truncate
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the truncate classes like s-truncate, s-truncate:2, etc...
 * The number of truncate classes generated is defined in the theme.helpers.truncate.count settings
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.truncate.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginRatioClassesInterface extends __SInterface {
    static definition = {
        count: {
            type: 'Number',
            default: __STheme.config('helpers.truncate.count'),
        },
    };
}

export interface IPostcssSugarPluginRatioClassesParams {
    count: number;
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
        count: 10,
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Truncate
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/truncate
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to **truncate texts to a number of lines** on any HTMLElement
        * 
        * @support      chromium        14+
        * @support      firefox         68+    
        * @support      safari          5+
        * @support      edge            17+
        * 
        ${[...Array(finalParams.count).keys()].map((i) => {
            return ` * @cssClass        s-truncate:${
                i + 1
            }         Truncate the container to ${i + 1} line(s)`;
        })}
        *
        * @example        html
        ${[...Array(finalParams.count).keys()]
            .map((i) => {
                return ` * <!-- truncate ${i + 1} -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Truncate to ${
                i + 1
            } line(s)</h3>
            *   <p class="s-typo:p s-truncate:${i + 1}">${__faker.lorem
                    .lines(finalParams.count + 5)
                    .split('\n')
                    .join('<br />')}</p>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    [...Array(finalParams.count).keys()].forEach((i) => {
        vars.push(`/**
  * @name          s-truncate:${i}
  * @namespace          sugar.css.truncate
  * @type               CssClass
  * @platform             css
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${
      i + 1
  }</yellow>" line(s) truncate style to any HTMLElement
  * 
  * @example        html
  * <p class="s-typo:p s-truncate:${i}">${__faker.lorem
            .lines(finalParams.count + 5)
            .split('\n')
            .join('<br />')}</p>
  */
.s-truncate--${i + 1} {
    @sugar.truncate(${i + 1});
}`);
    });

    replaceWith(vars);
}
