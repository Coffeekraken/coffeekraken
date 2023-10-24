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
 * @as          @s.order.classes
 * @namespace      node.mixin.order
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the order helper classes like s-order:1, s-order:2, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.order.classes
 *
 * @example        css
 * @s.order.classes;
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
        * @namespace          sugar.style.helpers.order
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/order
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some order attributes on any HTMLElement.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.order.classes;
        * 
        ${Array.from(Array(count))
        .map((v, i) => `
            * @cssClass             s-order-${i}        Apply the order ${i}
        `)
        .join('\n')}
        * 
        * @example        html          Simple order
        * <div class="s-flex s-gap:40">
        *   <div class="s-order:3 s-p:30 s-ratio:16-9 s-grow s-bc:main s-radius">1</div>
        *   <div class="s-order:1 s-p:30 s-ratio:16-9 s-grow s-bc:main s-radius">2</div>
        *   <div class="s-order:2 s-p:30 s-ratio:16-9 s-grow s-bc:main s-radius">3</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Array.from(Array(count)).forEach((v, i) => {
        vars.comment(() => `/**
                * @name          s-order:${i}
                * @namespace          sugar.style.helpers.order
                * @type               CssClass
                * @platform           css
                * @status               stable
                * 
                * This class allows you to apply the order ${i} styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex">
                *   <div class="s-order:${i} s-p:20 s-bc:accent s-radius">World</div>
                *   <div class="s-p:20 s-bc:main s-radius">World</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
            .s-order-${i} {
                order: ${i};
            }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLHFCQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSW1ELDREQUFTO0FBRTdELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQW1CSixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQixHQUFHLENBQ0EsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs4Q0FDb0IsQ0FBQywyQkFBMkIsQ0FBQztTQUNsRSxDQUNJO1NBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O0tBWWxCLENBQ0EsQ0FBQztJQUVGLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7MkNBQ3lCLENBQUM7Ozs7Ozs2REFNaUIsQ0FBQzs7OzswQ0FJcEIsQ0FBQzs7Ozs7OzthQU85QixDQUNKLENBQUMsSUFBSSxDQUNGO3VCQUNXLENBQUM7eUJBQ0MsQ0FBQztjQUNaLEVBQ0YsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUExRkQsNEJBMEZDIn0=