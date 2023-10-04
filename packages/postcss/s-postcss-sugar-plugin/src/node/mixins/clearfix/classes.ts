import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @as              @s.clearfix.classes
 * @namespace      node.mixin.clearfix
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to generate all the clearfix helper classes like s-clearfix:micro, etc...
 *
 * @return        {Css}        The generated css
 *
 * @snippet         @s.clearfix.classes
 *
 * @example        css
 * \@s.clearfix.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginClearfixClassesInterface extends __SInterface {
    static get _definition() {
        return {
            defaultClearfix: {
                type: 'String',
                default: __STheme.get('helpers.clearfix.default'),
            },
        };
    }
}

export interface IPostcssSugarPluginClearfixClassesParams {
    defaultClearfix;
}

export { postcssSugarPluginClearfixClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginClearfixClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginClearfixClassesParams = {
        defaultClearfix: 'overflow',
        ...params,
    };

    const vars = new CssVars();

    const clearfixes = ['overflow', 'facebook', 'micro', 'after'];
    const notStr = clearfixes
        .filter((c) => c !== finalParams.defaultClearfix)
        .map((c) => `:not(.s-clearfix-${c})`)
        .join('');

    vars.comment(
        () => `
      /**
        * @name          Clearfix
        * @namespace          sugar.style.helpers.clearfix
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/clearfix
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply a clearfix on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.clearfix.classes;
        * 
        * .my-element {
        *   \\@s.clearfix;
        * }         
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
        ${clearfixes
            .map((clearfixName) => {
                return ` * @example        html         ${clearfixName}
            *   <div class="s-clearfix${
                clearfixName === finalParams.defaultClearfix
                    ? ``
                    : `:${clearfixName}`
            } s-bc:ui">
            *       <img src="https://picsum.photos/200/200" style="float: right" />
            *   </div>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    clearfixes.forEach((clearfixName) => {
        vars.comment(
            () => `/**
                * @name          s-clearfix${
                    clearfixName === finalParams.defaultClearfix
                        ? ''
                        : `:${clearfixName}`
                }
                * @namespace          sugar.style.clearfix
                * @type               CssClass
                * @platform         css
                * @status           stable
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
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `,
        ).code(
            `
                .s-clearfix${
                    clearfixName === finalParams.defaultClearfix
                        ? `${notStr}`
                        : `-${clearfixName}`
                } {
                    @s.clearfix(${clearfixName});
                }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
