"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          classes
 * @namespace     node.mixin.ui.toggle
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the toggle classes
 *
 * @param       {String[]}              [types=null]            The toggles type you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @sugar.ui.toggle.classes
 *
 * @example       css
 * \@sugar.ui.toggle.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiToggleClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            types: {
                type: 'String[]',
                values: ['burger'],
                default: ['burger'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiToggleClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ types: ['burger'] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Toggles
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/toggles
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a toggle.
        * Toggles are element that have at least 2 states. Active and unactive.
        * This active state respect these rules:
        * 
        * - &:active
        * - &:focus
        * - &:focus-within
        * - input:checked + &
        * - input:checked + .s-menu + &
        * - :active > &
        * - :focus > &
        * - :focus-within > &
        * - &:has(input:checked)
        * - input:checked + * > &
        * - input:checked + .s-menu + * > &
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.ui.toggle.classes;
        * 
        * .my-toggle {
        *   \@sugar.ui.toggle;
        * }
        * 
        ${finalParams.types
        .map((type) => {
        return ` * @cssClass     s-toggle:${type}           Apply the ${type} toggle style`;
    })
        .join('\n')}
        * 

        * @example        html          Toggles
        *   <div class="s-grid:5 @mobile s-grid:2">
        ${finalParams.types
        .map((type) => {
        return ` *
        *   <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *     <label class="s-font:70">
        *       <input type="checkbox" hidden />
        *       <div class="s-toggle:${type}"></div>
        *     </label>
        *     <p class="s-typo:p s-mbs:30">${type}</p>
        *   </div>`;
    })
        .join('\n')}
        *   </div>
        *
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.code(() => `
            .s-toggle-container,
            label:has(> .s-toggle) {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 1em;
                height: 1em;
            }
    `);
    finalParams.types.forEach((type) => {
        vars.comment(() => `/**
            * @name           s-toggle:${type}
            * @namespace          sugar.style.ui.toggle
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${type}</s-color>" toggle
            * 
            * @example        html
            * <label class="s-toggle:${type}"></label>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-toggle--${type} {
                @sugar.ui.toggle(${type});
            }
        `, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLDBDQUEyQyxTQUFRLHFCQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDbEIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2FBQ3RCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1zRCwrREFBUztBQUVoRSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUNkLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBcUNKLFdBQVcsQ0FBQyxLQUFLO1NBQ2QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixPQUFPLDZCQUE2QixJQUFJLHdCQUF3QixJQUFJLGVBQWUsQ0FBQztJQUN4RixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztVQUtiLFdBQVcsQ0FBQyxLQUFLO1NBQ2QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixPQUFPOzs7O3VDQUlnQixJQUFJOzs2Q0FFRSxJQUFJO21CQUM5QixDQUFDO0lBQ1IsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O0tBTWxCLENBQ0EsQ0FBQztJQUVGLElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7OztLQVNULENBQ0EsQ0FBQztJQUVGLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt5Q0FDdUIsSUFBSTs7Ozs2REFJZ0IsSUFBSTs7O3VDQUcxQixJQUFJOzs7O1dBSWhDLENBQ0YsQ0FBQyxJQUFJLENBQ0Y7eUJBQ2EsSUFBSTttQ0FDTSxJQUFJOztTQUU5QixFQUNHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBNUhELDRCQTRIQyJ9