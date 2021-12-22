import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @namespace      node.mixins.when
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the "when" classes that allows you to apply some display
 * styles like "hide", etc... only when a certain state is reached.
 * Supported states are:
 * - mounted: Apply only when the state of a webcomponent for example has been reached
 * - active: When the element has the "active" class or the "active" attribute
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.when.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginActiveClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginActiveClassesParams {}

export { postcssSugarPluginActiveClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginActiveClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginActiveClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `/**
        * @name          s-when:mounted
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when it has reached the state "mounted".
        * 
        * @example        html
        * <s-range class="s-when:mounted" />
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    ).code(`
        .s-when.s-when--mounted:not(.s-when--sibling):not([mounted]):not(.mounted) {
            display: none;
        }
        .s-when.s-when--mounted:not(.s-when--sibling)[mounted],
        .s-when.s-when--mounted:not(.s-when--sibling).mounted {
            display: block;
        }`);

    vars.comment(
        () => `/**
        * @name          s-when:sibling:mounted
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when his previous sibling has reached the state "mounted".
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-when:sibling:mounted">
        *       Display something when the previous webcomponent has been mounted
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    ).code(`
        *:not([mounted]):not(.mounted) + .s-when.s-when--sibling.s-when--mounted {
            display: none;
        }
        *[mounted] + .s-when.s-when--sibling.s-when--mounted,
        *.mounted + .s-when.s-when--sibling.s-when--mounted {
            display: block;
        }`);

    vars.comment(
        () => `/**
        * @name          s-when:active
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when it has reached the state "active".
        * 
        * @example        html
        * <s-range class="s-when:active" />
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    ).code(`
        .s-when.s-when--active:not(.s-when--sibling):not([active]):not(.active) {
            display: none;
        }
        .s-when.s-when--active:not(.s-when--sibling)[active],
        .s-when.s-when--active:not(.s-when--sibling).active {
            display: block;
        }`);

    vars.comment(
        () => `/**
        * @name          s-when:sibling:active
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when his previous sibling has reached the state "active".
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-when:sibling:active">
        *       Display something when the previous webcomponent has been active
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    ).code(`
        *:not([active]):not(.active) + .s-when.s-when--sibling.s-when--active {
            display: none;
        }
        *[active] + .s-when.s-when--sibling.s-when--active,
        *.active + .s-when.s-when--sibling.s-when--active {
            display: block;
        }`);

    return vars;
}
