import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @as              @sugar.visibility.classes
 * @namespace      node.mixin.visibility
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./classes
 * @status        beta
 *
 * This mixin generate all the overflow helper classes like ```.s-visibility:hidden```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.visibility.classes
 *
 * @example        css
 * \@sugar.visibility.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    vars.comment(`
      /**
        * @name          Visibility
        * @namespace          sugar.style.helpers.visibility
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/visibility
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a visibility style on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.visibility.classes;
        * 
        * .my-element {
        *   \\@sugar.visibility.hidden;
        * } 
        * 
        * @cssClass         s-visibility:hidden             Make the element hidden in the ui
        * @cssClass         s-visibility:visible            Make the element visible in the ui
        * @cssClass         s-visibility:collapse            Make the element visibly collapased in the ui
        * 
        * @example        html              Visible
        * <div class="s-bg:main-surface s-radius s-p:30">
        *   <div style="height: 100px" class="s-bg:accent s-radius s-p:30">I'm visible</div>
        *   <div style="height: 100px" class="s-visibility:hidden s-bg:complementary s-radius s-p:30">I'm hidden</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(`/**
    * @name          s-visibility:hidden
    * @namespace          sugar.style.helpers.visibility
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>hidden</yellow>" visibility style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visibility:hidden">Hello world</div>
    */
   `).code(`
    .s-visibility--hidden {
        visibility: hidden;
    }`, { type: 'CssClass' });
    vars.comment(`/**
    * @name          s-visibility:visible
    * @namespace          sugar.style.helpers.visibility
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>visible</yellow>" visibility style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visibility:visible">Hello world</div>
    */
   `).code(`
    .s-visibility--visible {
        visibility: visible;
    }`, { type: 'CssClass' });
    vars.comment(`/**
    * @name          s-visibility:collapse
    * @namespace          sugar.style.helpers.visibility
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>collapse</yellow>" visibility style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visibility:collapse">Hello world</div>
    */
   `).code(`
    .s-visibility--collapse {
        visibility: collapse;
    }`, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sMENBQTJDLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVuRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBb0NaLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7OztJQVlKLENBQ0MsQ0FBQyxJQUFJLENBQ0Y7OztNQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSOzs7Ozs7Ozs7Ozs7SUFZSixDQUNDLENBQUMsSUFBSSxDQUNGOzs7TUFHRixFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUjs7Ozs7Ozs7Ozs7O0lBWUosQ0FDQyxDQUFDLElBQUksQ0FDRjs7O01BR0YsRUFDRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==