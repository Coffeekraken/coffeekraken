"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           classes
 * @as              @sugar.shrink.classes
 * @namespace      node.mixin.shrink
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all shrink helpers like s-shrink, s-shrink:1...10, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.shrink.classes
 *
 * @example        css
 * \@sugar.shrink.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginGapClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginGapClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Grow
        * @namespace          sugar.style.helpers.shrink
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/shrink
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some shrink attributes on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.shrink.classes;
        * 
        * @cssClass                 s-shrink             Apply the default shrink to any HTMLElement
        * ${Array.from(Array(10)).map((i) => `
            * @cssClass                s-shrink:${i}          Apply the ${i} shrink to any HTMLElement
        `)}
        * 
        * @example        html          Simple flex grid
        * <div class="s-flex">
        *   <div>I'm not shrinking</div>
        *   <div class="s-shrink">I'm shrinking</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
            * @name          s-shrink
            * @namespace          sugar.style.helpers.shrink
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows you to apply the shrink styling to any HTMLElement
            * 
            * @example        html
            * <div class="s-flex">
            *   <div>I'm not shrinking</div>
            *   <div class="s-shrink">I'm shrinking</div>
            * </div>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-shrink {
                flex-shrink: 1;
            }`, { type: 'CssClass' });
    Array.from(Array(10)).forEach((i) => {
        vars.comment(() => `/**
                * @name          s-shrink${i}
                * @namespace          sugar.style.helpers.shrink
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the shrink "${i}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex">
                *   <div>I'm not shrinking</div>
                *   <div class="s-shrink:${i}">I'm shrinking</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-shrink-${i} {
                    flex-shrink: ${i};
                }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJaUQsMERBQVM7QUFFM0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFvQkYsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQ3pCLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztrREFDK0IsQ0FBQyx1QkFBdUIsQ0FBQztTQUNsRSxDQUNBOzs7Ozs7Ozs7OztLQVdKLENBQ0EsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQWtCTCxDQUNKLENBQUMsSUFBSSxDQUNGOzs7Y0FHTSxFQUNOLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzJDQUN5QixDQUFDOzs7Ozs7K0RBTW1CLENBQUM7Ozs7OzJDQUtyQixDQUFDOzs7Ozs7YUFNL0IsQ0FDSixDQUFDLElBQUksQ0FDRjs0QkFDZ0IsQ0FBQzttQ0FDTSxDQUFDO2tCQUNsQixFQUNOLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBbkhELDRCQW1IQyJ9