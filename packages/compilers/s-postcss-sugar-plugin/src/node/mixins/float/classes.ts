import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @namespace      node.mixins.float
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the float helper classes like ```.s-float:left```, ```.s-float:right```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.float.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginFloatClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginFloatClassesParams {}

export { postcssSugarPluginFloatClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginFloatClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginFloatClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Float
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/float
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some float styling into your html.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass     s-float:left         Apply the left float style
        * @cssClass     s-float:right         Apply the right float style
        * @cssClass     s-float:none         Apply the none float style
        * 
        * @example        html
        * <div class="s-bg:accent">
        *     <div class="s-float:left">I'm a cool float left element</div>
        * </div>
        * <div class="s-bg:complementary">
        *     <div class="s-float:right">I'm a cool float right element</div>
        * </div>
        * <div class="s-bg:error">
        *     <div class="s-float:none">I'm a cool float none element</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    );

    vars.comment(
        () => `/**
    * @name          s-float:left
    * @namespace          sugar.css.float
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>left</yellow>" float style to any HTMLElement
    * 
    * @example        html
    * <div class="s-bg:accent">
    *     <div class="s-float:left">I'm a cool float left element</div>
    * </div>
    */
    `,
    ).code(`
    .s-float--left {
        float: left;
    }`);

    vars.comment(
        () => `/**
    * @name          s-float:right
    * @namespace          sugar.css.float
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>right</yellow>" float style to any HTMLElement
    * 
    * @example        html
    * <div class="s-bg:accent">
    *     <div class="s-float:right">I'm a cool float right element</div>
    * </div>
    */
    `,
    ).code(`
    .s-float--right {
        float: right;
    }`);

    vars.comment(
        () => `/**
    * @name          s-float:none
    * @namespace          sugar.css.float
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>none</yellow>" float style to any HTMLElement
    * 
    * @example        html
    * <div class="s-bg:accent">
    *     <div class="s-float:none">I'm a cool float none element</div>
    * </div>
    */
    `,
    ).code(`
    .s-float--none {
        float: none;
    }`);

    return vars;
}
