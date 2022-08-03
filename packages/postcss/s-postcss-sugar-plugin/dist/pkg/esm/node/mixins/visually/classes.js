import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixin.visually
 * @type           PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the overflow helper classes like ```.s-visually:hidden```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.visually.classes;
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
        * @name          Visually
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/visually
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a visually style on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-visually:hidden             Make the element hidden in the ui
        * @cssClass         s-visually:visible            Make the element visible in the ui
        * 
        * @example        html             Visually
        * <div class="s-bg:main-surface s-radius s-p:30">
        *   <div style="height: 100px" class="s-bg:accent s-radius s-p:30">I'm visible</div>
        *   <div style="height: 100px" class="s-visually:hidden s-bg:complementary s-radius s-p:30">I'm hidden</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(`/**
    * @name          s-visually:hidden
    * @namespace          sugar.style.visually
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>hidden</yellow>" visually style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visually:hidden">Hello world</div>
    */
    `).code(`
    .s-visually--hidden {
       @sugar.visually.hidden;
    }`, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sMENBQTJDLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVuRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTRCWixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSOzs7Ozs7Ozs7Ozs7S0FZSCxDQUNBLENBQUMsSUFBSSxDQUNGOzs7TUFHRixFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9