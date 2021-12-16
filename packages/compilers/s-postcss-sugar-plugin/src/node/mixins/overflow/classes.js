import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.overflow
 * @type           PostcssMixin
 * @platform      postcss
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
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginOverflowClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `/**
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
    `).code(`
    .s-overflow--auto {
        overflow: auto;
    }`);
    vars.comment(() => `/**
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
    `).code(`
    .s-overflow--hidden {
        overflow: hidden;
    }`);
    vars.comment(() => `/**
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
    `).code(`
    .s-overflow--inherit {
        overflow: inherit;
    }`);
    vars.comment(() => `/**
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
    `).code(`
    .s-overflow--initial {
        overflow: initial;
    }`);
    vars.comment(() => `/**
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
    `).code(`
    .s-overflow--overlay {
        overflow: overlay;
    }`);
    vars.comment(() => `/**
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
    `).code(`
    .s-overflow--revert {
        overflow: revert;
    }`);
    vars.comment(() => `/**
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
    `).code(`
    .s-overflow--scroll {
        overflow: scroll;
    }`);
    vars.comment(() => `/**
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
    `).code(`
    .s-overflow--visible {
        overflow: visible;
    }`);
    vars.comment(() => `/**
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
    `).code(`
    .s-overflow--unset {
        overflow: unset;
    }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7SUFDakUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7O0tBY1QsQ0FDQSxDQUFDLElBQUksQ0FBQzs7O01BR0wsQ0FBQyxDQUFDO0lBRUosSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUFDOzs7TUFHTCxDQUFDLENBQUM7SUFFSixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQUM7OztNQUdMLENBQUMsQ0FBQztJQUVKLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7O0tBY1QsQ0FDQSxDQUFDLElBQUksQ0FBQzs7O01BR0wsQ0FBQyxDQUFDO0lBRUosSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUFDOzs7TUFHTCxDQUFDLENBQUM7SUFFSixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQUM7OztNQUdMLENBQUMsQ0FBQztJQUVKLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7O0tBY1QsQ0FDQSxDQUFDLElBQUksQ0FBQzs7O01BR0wsQ0FBQyxDQUFDO0lBRUosSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUFDOzs7TUFHTCxDQUFDLENBQUM7SUFFSixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQUM7OztNQUdMLENBQUMsQ0FBQztJQUVKLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==