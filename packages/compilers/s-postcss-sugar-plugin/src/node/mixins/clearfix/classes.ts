import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @namespace      node.mixins.clearfix
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to generate all the clearfix helper classes like s-clearfix:micro, etc...
 *
 * @return        {Css}        The generated css
 *
 * @example         postcss
 * \@sugar.clearfix.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginClearfixClassesInterface extends __SInterface {
    static definition = {
        defaultClearfix: {
            type: 'String',
            default: __STheme.config('helpers.clearfix.default'),
        },
    };
}

export interface IPostcssSugarPluginClearfixClassesParams {
    defaultClearfix;
}

export { postcssSugarPluginClearfixClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginClearfixClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginClearfixClassesParams = {
        defaultClearfix: 'overflow',
        ...params,
    };

    const vars: string[] = [];
    const clearfixes = ['overflow', 'facebook', 'micro', 'after'];
    const notStr = clearfixes
        .filter((c) => c !== finalParams.defaultClearfix)
        .map((c) => `:not(.s-clearfix--${c})`)
        .join('');

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
        ${clearfixes
            .map((clearfixName) => {
                return ` * @cssClass     s-clearfixs-clearfix${
                    clearfixName === finalParams.defaultClearfix
                        ? ``
                        : `:${clearfixName}`
                }            Apply the ${clearfixName} clearfix`;
            })
            .join('\n')}
        * 
        * @example        html
        ${clearfixes
            .map((clearfixName) => {
                return ` * <!-- ${clearfixName} style -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${clearfixName}clearfix</h3>
            *   <div class="s-clearfix${
                clearfixName === finalParams.defaultClearfix
                    ? ``
                    : `:${clearfixName}`
            } s-bg:ui">
            *       <img src="https://picsum.photos/200/200" style="float: right" />
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

    clearfixes.forEach((clearfixName) => {
        vars.push(`/**
                * @name          s-clearfix${
                    clearfixName === finalParams.defaultClearfix
                        ? ''
                        : `:${clearfixName}`
                }
                * @namespace          sugar.css.clearfix
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${clearfixName}</yellow>" clearfix to any HTMLElement
                * 
                * @example        html
                * <div class="s-clearfix${
                    clearfixName === finalParams.defaultClearfix
                        ? ''
                        : `:${clearfixName}`
                }">I'm a cool clearfix element</div>
                * 
                * @since        2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                */
                .s-clearfix${
                    clearfixName === finalParams.defaultClearfix
                        ? `${notStr}`
                        : `--${clearfixName}`
                } {
                    @sugar.clearfix(${clearfixName});
                }`);
    });

    replaceWith(vars);
}
