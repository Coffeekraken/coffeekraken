import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.pointer
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the pointer helper classes like ```.s-pointer-events:none```, ```.s-pointer-events:all```, etc...
 *
 * @feature         Support these values (for now): none, all, auto and fill
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.pointer.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginPointerClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginPointerClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`/**
    * @name          s-pointer-events:none
    * @namespace          sugar.css.pointer
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
    .s-pointer-events--none {
        pointer-events: none;
    }`);
    vars.push(`/**
    * @name          s-pointer-events:all
    * @namespace          sugar.css.pointer
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
    .s-pointer-events--all {
        pointer-events: all;
    }`);
    vars.push(`/**
    * @name          s-pointer-events:auto
    * @namespace          sugar.css.pointer
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
    .s-pointer-events--auto {
        pointer-events: auto;
    }`);
    vars.push(`/**
    * @name          s-pointer-events:fill
    * @namespace          sugar.css.pointer
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
    .s-pointer-events--fill {
        pointer-events: fill;
    }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILE1BQU0seUNBQTBDLFNBQVEsWUFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVsRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7TUFnQlIsQ0FBQyxDQUFDO0lBRUosSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztNQWdCUixDQUFDLENBQUM7SUFFSixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O01BZ0JSLENBQUMsQ0FBQztJQUVKLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7TUFnQlIsQ0FBQyxDQUFDO0lBRUosT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9