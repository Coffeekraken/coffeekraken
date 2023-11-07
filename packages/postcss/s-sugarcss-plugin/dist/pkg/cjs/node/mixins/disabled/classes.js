"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           classes
 * @as          @s.disabled.classes
 * @namespace      node.mixin.disabled
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to generate all the disabled helper classes like s-disabled
 *
 * @return        {Css}        The generated css
 *
 * @snippet         @s.disabled.classes
 *
 * @example        css
 * @s.disabled.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginFixClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginFixClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Disabled
        * @namespace          sugar.style.helpers.disabled
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/disabled
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply the disabled style on any HTMLElement.
        * This make sure **no pointer events** stays active as well as displaying the **not-allowed cursor**.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.disabled.classes;
        * 
        * .my-element {
        *   @s.disabled;
        * }  
        * 
        * @cssClass                 s-disabled              Apply the disabled styling on any HTMLElement
        * 
        * @example        html      Disabled
        * <input type="text" class="s-input s-disabled" placeholder="I'm disabled" />
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
            * @name          s-disabled,[disabled]
            * @namespace          sugar.style.helpers.disabled
            * @type               CssClass
            * @platform         css
            * @status           stable
            * 
            * This class allows you to apply the disabled styling to any HTMLElement.
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <input type="text" class="s-input s-disabled" placeholder="I'm disabled" />
            *   <input type="text" class="s-input" disabled placeholder="I'm disabled" />
            * </div>
            * 
            * @since        2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-disabled,
            [disabled] {
                @s.disabled;
            }`, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sa0NBQW1DLFNBQVEscUJBQVk7SUFDekQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJOEMsdURBQVM7QUFFeEQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQ1QsQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBa0JMLENBQ0osQ0FBQyxJQUFJLENBQ0Y7Ozs7Y0FJTSxFQUNOLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQW5GRCw0QkFtRkMifQ==