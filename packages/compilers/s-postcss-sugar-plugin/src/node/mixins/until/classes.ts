import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @namespace      node.mixin.until
 * @type           PostcssMixin
 * @interface    ./classes
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
 * @example        css
 * \@sugar.until.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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

    const queries = __STheme.get('media.queries');
    const states = __STheme.get('helpers.states');

    const vars = new CssVars();

    states.forEach((state) => {
        vars.comment(
            () => `/**
            * @name          s-until:${state}
            * @namespace          sugar.css.until
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement until it has reached the state "${state}".
            * 
            * @example        html
            * <s-range class="s-until:${state}" />
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
        ).code(`
            .s-until.s-until--${state}:not(.s-until--sibling):not(.s-until--siblings):not(.s-until--parent):not(.s-until--grandparent):not(.s-until--ancestor)[${state}] {
                display: none;
            }`);

        vars.comment(
            () => `/**
            * @name          s-until:sibling:${state}
            * @namespace          sugar.css.until
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement until his previous sibling has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:sibling:${state}">
            *       Display something until the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
        ).code(`
            *.${state} + .s-until.s-until--sibling.s-until--${state},
            *[${state}] + .s-until.s-until--sibling.s-until--${state} {
                display: none;
            }`);

        vars.comment(
            () => `/**
            * @name          s-until:siblings:${state}
            * @namespace          sugar.css.until
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to hide any HTMLElement until one of his previous siblings has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:siblings:${state}">
            *       Display something until one of the previous siblings has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
        ).code(`
            *.${state} ~  .s-until.s-until--siblings.s-until--${state},
            *[${state}] ~ .s-until.s-until--siblings.s-until--${state} {
                display: none;
            }`);

        vars.comment(
            () => `/**
            * @name          s-until:parent:${state}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to display any HTMLElement when his direct parent has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:parent:${state}">
            *       Display something until the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
        ).code(`
            *:not([${state}]):not(.${state}) > .s-until.s-until--parent.s-until--${state} {
                display: unset;
            }
            *[${state}] > .s-until.s-until--parent.s-until--${state},
            *.${state} > .s-until.s-until--parent.s-until--${state} {
                display: none;
            }`);

        vars.comment(
            () => `/**
            * @name          s-until:grandparent:${state}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to display any HTMLElement when his direct grandparent has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:grandparent:${state}">
            *       Display something until the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
        ).code(`
            *:not([${state}]):not(.${state}) > * > .s-until.s-until--grandparent.s-until--${state} {
                display: unset;
            }
            *[${state}] > * > .s-until.s-until--grandparent.s-until--${state},
            *.${state} > * > .s-until.s-until--grandparent.s-until--${state} {
                display: none;
            }`);

        vars.comment(
            () => `/**
            * @name          s-until:ancestor:${state}
            * @namespace          sugar.css.when
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows you to display any HTMLElement when his direct ancestor has reached the state "${state}".
            * 
            * @example        html
            * <s-range name="myCoolRange" />
            * <div class="s-until:ancestor:${state}">
            *       Display something when the previous webcomponent has been ${state}
            * </div>
            * 
            * @since            2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
        ).code(`
            *:not([${state}]):not(.${state}) .s-until.s-until--ancestor.s-until--${state} {
                display: unset;
            }
            *[${state}] .s-until.s-until--ancestor.s-until--${state},
            *.${state} .s-until.s-until--ancestor.s-until--${state} {
                display: none;
            }`);
    });

    // Queries
    Object.keys(queries).forEach((query) => {
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
