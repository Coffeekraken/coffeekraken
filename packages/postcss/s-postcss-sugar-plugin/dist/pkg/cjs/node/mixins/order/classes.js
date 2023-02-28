"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           classes
 * @namespace      node.mixin.order
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the order helper classes like s-order:1, s-order:2, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.order.classes
 *
 * @example        css
 * \@sugar.order.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginOrderClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginOrderClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const count = s_theme_1.default.get('helpers.order.count');
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Order
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/order
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some order attributes on any HTMLElement.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.order.classes;
        * 
        ${Array.from(Array(count))
        .map((v, i) => `
            * @cssClass             s-order-${i}        Apply the order ${i}
        `)
        .join('\n')}
        * 
        * @example        html          Simple order
        * <div class="s-flex s-gap:40">
        *   <div class="s-order:3 s-p:30 s-ratio:16-9 s-flex-item:grow s-bg:main-surface s-radius">1</div>
        *   <div class="s-order:1 s-p:30 s-ratio:16-9 s-flex-item:grow s-bg:main-surface s-radius">2</div>
        *   <div class="s-order:2 s-p:30 s-ratio:16-9 s-flex-item:grow s-bg:main-surface s-radius">3</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Array.from(Array(count)).forEach((v, i) => {
        vars.comment(() => `/**
                * @name          s-order:${i}
                * @namespace          sugar.style.order
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the order ${i} styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex">
                *   <div class="s-order:${i} s-p:20 s-bg:accent s-radius">World</div>
                *   <div class="s-p:20 s-bg:main s-radius">World</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
            .s-order--${i} {
                order: ${i};
            }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJbUQsNERBQVM7QUFFN0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDbEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBbUJKLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JCLEdBQUcsQ0FDQSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzhDQUNvQixDQUFDLDJCQUEyQixDQUFDO1NBQ2xFLENBQ0k7U0FDQSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7S0FZbEIsQ0FDQSxDQUFDO0lBRUYsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzsyQ0FDeUIsQ0FBQzs7Ozs7OzZEQU1pQixDQUFDOzs7OzBDQUlwQixDQUFDOzs7Ozs7O2FBTzlCLENBQ0osQ0FBQyxJQUFJLENBQ0Y7d0JBQ1ksQ0FBQzt5QkFDQSxDQUFDO2NBQ1osRUFDRixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTFGRCw0QkEwRkMifQ==