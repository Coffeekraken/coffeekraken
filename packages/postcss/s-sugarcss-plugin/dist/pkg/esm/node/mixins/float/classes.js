import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @as              @s.float.classes
 * @namespace      node.mixin.float
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the float helper classes like ```.s-float:left```, ```.s-float:right```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.float.classes
 *
 * @example        css
 * @s.float.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginFloatClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginFloatClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Float
        * @namespace          sugar.style.helpers.float
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/float
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some float styling into your html.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.float.classes;
        * 
        * @cssClass     s-float:left         Apply the left float style
        * @cssClass     s-float:right         Apply the right float style
        * @cssClass     s-float:none         Apply the none float style
        * 
        * @example        html              Left
        * <div class="s-bc:accent s-clearfix  s-p:30 s-radius">
        *     <div class="s-float:left">I'm a cool float left element</div>
        * </div>
        * 
        * @example      html                Right
        * <div class="s-bc:complementary s-clearfix s-p:30 s-radius">
        *     <div class="s-float:right">I'm a cool float right element</div>
        * </div>
        * 
        * @example      html                None
        * <div class="s-bc:error s-p:30 s-radius">
        *     <div class="s-float:none">I'm a cool float none element</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
    * @name          s-float:left
    * @namespace          sugar.style.helpers.float
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>left</yellow>" float style to any HTMLElement
    * 
    * @example        html
    * <div class="s-bc:accent">
    *     <div class="s-float:left">I'm a cool float left element</div>
    * </div>
    */
    `).code(`
    .s-float-left {
        float: left;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-float:right
    * @namespace          sugar.style.helpers.float
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>right</yellow>" float style to any HTMLElement
    * 
    * @example        html
    * <div class="s-bc:accent">
    *     <div class="s-float:right">I'm a cool float right element</div>
    * </div>
    */
    `).code(`
    .s-float-right {
        float: right;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-float:none
    * @namespace          sugar.style.helpers.float
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>none</yellow>" float style to any HTMLElement
    * 
    * @example        html
    * <div class="s-bc:accent">
    *     <div class="s-float:none">I'm a cool float none element</div>
    * </div>
    */
    `).code(`
    .s-float-none {
        float: none;
    }`, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLG9DQUFvQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTdELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXlDVCxDQUNBLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztLQWNULENBQ0EsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=