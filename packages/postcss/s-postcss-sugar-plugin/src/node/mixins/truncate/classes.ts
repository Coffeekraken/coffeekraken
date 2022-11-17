import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name           classes
 * @namespace      node.mixin.truncate
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the truncate classes like s-truncate, s-truncate:2, etc...
 * The number of truncate classes generated is defined in the theme.helpers.truncate.count settings
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.truncate.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginRatioClassesInterface extends __SInterface {
    static get _definition() {
        return {
            count: {
                type: 'Number',
                default: __STheme.get('helpers.truncate.count'),
            },
        };
    }
}

export interface IPostcssSugarPluginRatioClassesParams {
    count: number;
}

export { postcssSugarPluginRatioClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginRatioClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginRatioClassesParams = {
        count: 10,
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Truncate
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/truncate
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to **truncate texts to a number of lines** on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.truncate.classes;
        * 
        ${[...Array(finalParams.count).keys()].map((i) => {
            return ` * @cssClass        s-truncate:${
                i + 1
            }         Truncate the container to ${i + 1} line(s)`;
        })}
        *
        ${[...Array(finalParams.count).keys()]
            .map((i) => {
                return ` * @example          html        ${i + 1} ${
                    i <= 1 ? 'line' : 'lines'
                }
            *   <p class="s-typo:p s-truncate:${i + 1}">${__faker.lorem
                    .lines(finalParams.count + 5)
                    .split('\n')
                    .join('<br />')}</p>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    [...Array(finalParams.count).keys()].forEach((i) => {
        vars.comment(
            () => `/**
  * @name          s-truncate:${i}
  * @namespace          sugar.style.truncate
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
 `,
        ).code(
            `
.s-truncate--${i + 1} {
    @sugar.truncate(${i + 1});
}`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
