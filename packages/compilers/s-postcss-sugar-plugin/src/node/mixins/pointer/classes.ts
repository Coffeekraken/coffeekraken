import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @namespace      node.mixin.pointer
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the pointer helper classes like ```.s-pointer-events:none```, ```.s-pointer-events:all```, etc...
 *
 * @feature         Support these values (for now): none, all, auto and fill
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.pointer.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginPointerClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginPointerClassesParams {}

export { postcssSugarPluginPointerClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginPointerClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginPointerClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `/**
    * @name          s-pointer-events:none
    * @namespace          sugar.style.pointer
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>none</yellow>" pointer events style to any HTMLElement
    * 
    * @example        html
    * <div class="s-pointer-events\:none s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
   `,
    ).code(`
    .s-pointer-events--none {
        pointer-events: none;
    }`);

    vars.comment(
        () => `/**
    * @name          s-pointer-events:all
    * @namespace          sugar.style.pointer
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>all</yellow>" pointer events style to any HTMLElement
    * 
    * @example        html
    * <div class="s-pointer-events\:all s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
   `,
    ).code(`
    .s-pointer-events--all {
        pointer-events: all;
    }`);

    vars.comment(
        () => `/**
    * @name          s-pointer-events:auto
    * @namespace          sugar.style.pointer
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>auto</yellow>" pointer events style to any HTMLElement
    * 
    * @example        html
    * <div class="s-pointer-events\:auto s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
   `,
    ).code(`
    .s-pointer-events--auto {
        pointer-events: auto;
    }`);

    vars.comment(
        () => `/**
    * @name          s-pointer-events:fill
    * @namespace          sugar.style.pointer
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>fill</yellow>" pointer events style to any HTMLElement
    * 
    * @example        html
    * <div class="s-pointer-events\:fill s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
   `,
    ).code(`
    .s-pointer-events--fill {
        pointer-events: fill;
    }`);

    return vars;
}
