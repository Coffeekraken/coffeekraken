"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          classes
 * @as          @s.ui.toggle.classes
 * @namespace     node.mixin.ui.toggle
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the toggle classes
 *
 * @param       {('burger')[]}              [types=['burger']]            The toggles type you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.ui.toggle.classes
 *
 * @example       css
 * \@s.ui.toggle.classes();
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
        * @name          Toggle
        * @namespace          sugar.style.ui.toggle
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
        * \\@s.ui.toggle.classes;
        * 
        * .my-toggle {
        *   \@s.ui.toggle;
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
            .s-toggle-${type} {
                @s.ui.toggle(${type});
            }
        `, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxxQkFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ2xCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzthQUN0QjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNc0QsK0RBQVM7QUFFaEUsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFDZCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXFDSixXQUFXLENBQUMsS0FBSztTQUNkLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1YsT0FBTyw2QkFBNkIsSUFBSSx3QkFBd0IsSUFBSSxlQUFlLENBQUM7SUFDeEYsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7VUFLYixXQUFXLENBQUMsS0FBSztTQUNkLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1YsT0FBTzs7Ozt1Q0FJZ0IsSUFBSTs7NkNBRUUsSUFBSTttQkFDOUIsQ0FBQztJQUNSLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztLQU1sQixDQUNBLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7S0FTVCxDQUNBLENBQUM7SUFFRixXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7eUNBQ3VCLElBQUk7Ozs7NkRBSWdCLElBQUk7Ozt1Q0FHMUIsSUFBSTs7OztXQUloQyxDQUNGLENBQUMsSUFBSSxDQUNGO3dCQUNZLElBQUk7K0JBQ0csSUFBSTs7U0FFMUIsRUFDRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTVIRCw0QkE0SEMifQ==