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
export { postcssSugarPluginFloatClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
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
        * @example        html              Left
        * <div class="s-bg:accent s-clearfix  s-p:30 s-radius">
        *     <div class="s-float:left">I'm a cool float left element</div>
        * </div>
        * 
        * @example      html                Right
        * <div class="s-bg:complementary s-clearfix s-p:30 s-radius">
        *     <div class="s-float:right">I'm a cool float right element</div>
        * </div>
        * 
        * @example      html                None
        * <div class="s-bg:error s-p:30 s-radius">
        *     <div class="s-float:none">I'm a cool float none element</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.comment(() => `/**
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
    `).code(`
    .s-float--left {
        float: left;
    }`);
    vars.comment(() => `/**
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
    `).code(`
    .s-float--right {
        float: right;
    }`);
    vars.comment(() => `/**
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
    `).code(`
    .s-float--none {
        float: none;
    }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc0NULENBQ0EsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7O0tBY1QsQ0FDQSxDQUFDLElBQUksQ0FBQzs7O01BR0wsQ0FBQyxDQUFDO0lBRUosSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUFDOzs7TUFHTCxDQUFDLENBQUM7SUFFSixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQUM7OztNQUdMLENBQUMsQ0FBQztJQUVKLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==