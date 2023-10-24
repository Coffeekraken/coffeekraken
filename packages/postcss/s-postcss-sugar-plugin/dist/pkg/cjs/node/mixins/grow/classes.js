"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           classes
 * @as              @s.grow.classes
 * @namespace      node.mixin.grow
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all grow helpers like s-grow, s-grow:1...10, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.grow.classes
 *
 * @example        css
 * @s.grow.classes;
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
        * @namespace          sugar.style.helpers.grow
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/grow
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some grow attributes on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.grow.classes;
        * 
        * @cssClass                 s-grow             Apply the default grow to any HTMLElement
        * ${Array.from(Array(10)).map((i) => `
            * @cssClass                s-grow:${i}          Apply the ${i} grow to any HTMLElement
        `)}
        * 
        * @example        html          Simple flex grid
        * <div class="s-flex">
        *   <div>I'm not growing</div>
        *   <div class="s-grow">I'm growing</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
            * @name          s-grow
            * @namespace          sugar.style.helpers.grow
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows you to apply the grow styling to any HTMLElement
            * 
            * @example        html
            * <div class="s-flex">
            *   <div>I'm not growing</div>
            *   <div class="s-grow">I'm growing</div>
            * </div>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-grow {
                flex-grow: 1;
            }`, { type: 'CssClass' });
    Array.from(Array(10)).forEach((i) => {
        vars.comment(() => `/**
                * @name          s-grow${i}
                * @namespace          sugar.style.helpers.grow
                * @type               CssClass
                * @platform           css
                * @status               stable
                * 
                * This class allows you to apply the grow "${i}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex">
                *   <div>I'm not growing</div>
                *   <div class="s-grow:${i}">I'm growing</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-grow-${i} {
                    flex-grow: ${i};
                }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJaUQsMERBQVM7QUFFM0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFvQkYsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQ3pCLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnREFDNkIsQ0FBQyx1QkFBdUIsQ0FBQztTQUNoRSxDQUNBOzs7Ozs7Ozs7OztLQVdKLENBQ0EsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQWtCTCxDQUNKLENBQUMsSUFBSSxDQUNGOzs7Y0FHTSxFQUNOLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO3lDQUN1QixDQUFDOzs7Ozs7NkRBTW1CLENBQUM7Ozs7O3lDQUtyQixDQUFDOzs7Ozs7YUFNN0IsQ0FDSixDQUFDLElBQUksQ0FDRjswQkFDYyxDQUFDO2lDQUNNLENBQUM7a0JBQ2hCLEVBQ04sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFuSEQsNEJBbUhDIn0=