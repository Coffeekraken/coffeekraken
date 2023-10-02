import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @as          @s.link.classes
 * @namespace      node.mixin.link
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the height helper classes like s-link:stretch, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.link.classes
 *
 * @example        css
 * \@s.link.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginLinkClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginLinkClassesMixinInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
        /**
        * @name          Link
        * @namespace          sugar.style.helpers.link
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/link
        * @platform       css
        * @status       stable
        * 
        * These classes allows to apply some link styling utils to any HTMLElement.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.link.classes;
        * 
        * .my-element {
        *   \\@s.link.stretch;
        * } 
        * 
        * @cssClass             s-link:stretch                  Stretch a link clickable area without changing his actual size and style
        * 
        * @example          html            Stretch
        * <div class="s-position:relative s-bg:main s-radius s-p:50">
        *   <a href="#" class="s-link:stretch s-bg:accent s-radius s-p:20">I'm a stretched link!</a>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
        * @name            s-link:stretch
        * @namespace          sugar.style.helpers.link
        * @type             CssClass
        * @platform         css
        * @status         stable
        * 
        * This class allows you to apply the "<yellow>stretch</yellow>" link style to any HTMLElement
        * 
        * @example      html
        * <div class="s-position:relative s-bg:main s-radius s-p:50">
        *   <a href="#" class="s-link:stretch s-bg:accent s-radius s-p:20">I'm a stretched link!</a>
        * </div>
        * 
        * @since        2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `).code(() => `
        .s-link-stretch {
            @s.link.stretch;
        }
    `, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSwyQ0FBNEMsU0FBUSxZQUFZO0lBQ2xFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLDJDQUEyQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXBFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FpQ1QsQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FpQlQsQ0FDQSxDQUFDLElBQUksQ0FDRixHQUFHLEVBQUUsQ0FBQzs7OztLQUlULEVBQ0csRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=