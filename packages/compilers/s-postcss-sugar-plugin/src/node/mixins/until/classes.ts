import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @namespace      node.mixins.until
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the "until" classes that allows you to apply some display
 * styles like "hide", etc... only until a certain state is reached.
 * Supported states are:
 * - mounted: Apply only until the state of a webcomponent for example has been reached
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.until.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginUntilClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginUntilClassesParams {}

export { postcssSugarPluginUntilClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUntilClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUntilClassesParams = {
        ...params,
    };

    const queries = __STheme.config('media.queries');


    const vars = new CssVars();

    vars.comment(
        () => `/**
        * @name          s-until:mounted
        * @namespace          sugar.css.until
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement until it has reached the state "mounted".
        * 
        * @example        html
        * <s-range class="s-until:mounted:hide" />
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    ).code(`
        .s-until.s-until--mounted:not(.s-until--sibling)[mounted] {
            display: none;
        }`);

    vars.comment(
        () => `/**
        * @name          s-until:sibling:mounted
        * @namespace          sugar.css.until
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement until his previous sibling has reached the state "mounted".
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-until:sibling:mounted">
        *       Display something until the previous webcomponent has been mounted
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       `,
    ).code(`
        *[mounted] + .s-until.s-until--sibling.s-until--mounted {
            display: none;
        }`);

    // Queries
    Object.keys(queries).forEach(query => {
        vars.comment(
            () => `/**
            * @name          s-until:media:${query}
            * @namespace          sugar.css.until
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to show any HTMLElement for the passed query.
            * 
            * @example        html
            * <s-range class="s-until:media:${query}" />
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        `,
        ).code(`
            @sugar.media(${query}) {
                .s-until--media.s-until--${query} {
                    display: none !important;
                }
            }`);
    });

    return vars;
}
