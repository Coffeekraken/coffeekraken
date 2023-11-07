"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
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
class SSugarcssPluginScaleClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginScaleClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const scaleObj = s_theme_1.default.get('ui.scrollbar');
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
        *       ${faker_1.default.lorem.paragraphs(10)}
        *   </div>
        * 
        * @example        html          Horizontal scrollbar
        *   <div class="s-scrollbar" style="white-space:nowrap; width: 200px; height: 2em; overflow-x: auto; overflow-y: hidden;">
        *       ${faker_1.default.lorem.paragraphs(1)}
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
            *    ${faker_1.default.lorem.paragraphs(3)}
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sb0NBQXFDLFNBQVEscUJBQVk7SUFDM0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJZ0QseURBQVM7QUFFMUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRTlDLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQThCSSxlQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Ozs7O2tCQUs1QixlQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7OztLQU14QyxDQUNBLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7bUJBWUssZUFBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7Ozs7U0FNckMsQ0FDSixDQUFDLElBQUksQ0FDRjs7O2NBR00sRUFDTixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE3RkQsNEJBNkZDIn0=