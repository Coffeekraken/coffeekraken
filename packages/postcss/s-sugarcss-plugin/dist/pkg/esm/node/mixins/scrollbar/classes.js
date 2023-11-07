import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name           classes
 * @as              @s.scrollbar.classes
 * @namespace      node.mixin.scale
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the scale helper classes like s-scale:01, s-scale:12, etc.
 * The generated scales are specified in the config.theme.scale configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.scrollbar.classes
 *
 * @example        css
 * @s.scale.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginScaleClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginScaleClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const scaleObj = __STheme.get('ui.scrollbar');
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Scrollbar
        * @namespace          sugar.style.helpers.scrollbar
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/scrollbar
        * @platform       css
        * @status       stable
        * 
        * These classes allows to apply a custom scrollbar that follows your theme settings.
        * It is based on the \`theme.ui.scrollbar\` settings.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.scrollbar.classes;
        * 
        * .my-element {
        *   @s.scrollbar.hide;
        *   @s.scrollbar;
        * } 
        * 
        * @cssClass     s-scrollbar         Apply the custom scrollbar
        * 
        * @example        html          Vertical scrollbar
        * <!-- scrollbar vertical -->
        *   <div class="s-scrollbar" style="height:100px; overflow-y: auto;">
        *       ${__faker.lorem.paragraphs(10)}
        *   </div>
        * 
        * @example        html          Horizontal scrollbar
        *   <div class="s-scrollbar" style="white-space:nowrap; width: 200px; height: 2em; overflow-x: auto; overflow-y: hidden;">
        *       ${__faker.lorem.paragraphs(1)}
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
            * @name          s-scrollbar
            * @namespace          sugar.style.helpers.scrollbar
            * @type               CssClass
            * @platform             css
            * @status             stable
            * 
            * This class allows to apply the custom scrollbar on any HTMLElement.
            * This scrollbar is defined in the \`theme.ui.scrollbar\` settings.
            * 
            * @example        html
            * <div class="s-scrollbar" style="height:50px">
            *    ${__faker.lorem.paragraphs(3)}
            * </div>
            * 
            * since           2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-scrollbar {
                @s.scrollbar();
            }`, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLG9DQUFxQyxTQUFRLFlBQVk7SUFDM0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsb0NBQW9DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFN0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRTlDLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQThCSSxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Ozs7O2tCQUs1QixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7OztLQU14QyxDQUNBLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7bUJBWUssT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7Ozs7U0FNckMsQ0FDSixDQUFDLElBQUksQ0FDRjs7O2NBR00sRUFDTixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==