import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @namespace      node.mixins.overflow
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the overflow helper classes like ```.s-overflow:hidden```, ```.s-overflow:auto```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.overflow.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginOverflowClassesInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginOverflowClassesParams {}

export { postcssSugarPluginOverflowClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginOverflowClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginOverflowClassesParams = {
        ...params,
    };

    const vars: string[] = [];

    vars.push(`/**
    * @name          s-overflow:auto
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>auto</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
    .s-overflow--auto {
        overflow: auto;
    }`);

    vars.push(`/**
    * @name          s-overflow:hidden
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>hidden</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow hidden container</div>
    * </div>
    */
    .s-overflow--hidden {
        overflow: hidden;
    }`);

    vars.push(`/**
    * @name          s-overflow:inherit
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>inherit</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow inherit container</div>
    * </div>
    */
    .s-overflow--inherit {
        overflow: inherit;
    }`);

    vars.push(`/**
    * @name          s-overflow:initial
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>initial</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow initial container</div>
    * </div>
    */
    .s-overflow--initial {
        overflow: initial;
    }`);

    vars.push(`/**
    * @name          s-overflow:overlay
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>overlay</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow overlay container</div>
    * </div>
    */
    .s-overflow--overlay {
        overflow: overlay;
    }`);

    vars.push(`/**
    * @name          s-overflow:revert
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>revert</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow revert container</div>
    * </div>
    */
    .s-overflow--revert {
        overflow: revert;
    }`);

    vars.push(`/**
    * @name          s-overflow:scroll
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>scroll</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow scroll container</div>
    * </div>
    */
    .s-overflow--scroll {
        overflow: scroll;
    }`);

    vars.push(`/**
    * @name          s-overflow:visible
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>visible</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow visible container</div>
    * </div>
    */
    .s-overflow--visible {
        overflow: visible;
    }`);

    vars.push(`/**
    * @name          s-overflow:unset
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>unset</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow unset container</div>
    * </div>
    */
    .s-overflow--unset {
        overflow: unset;
    }`);

    replaceWith(vars);
}
