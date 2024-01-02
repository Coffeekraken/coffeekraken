"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          input
 * @as          @s.ui.input
 * @namespace     node.mixin.ui.input
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        stable
 *
 * Apply the input style to any element
 *
 * @param       {'solid'|'underline'}                           [style='theme.ui.form.defaultLnf']         The lnf you want to generate
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.input
 *
 * @example     css
 * .my-input {
 *    @s.ui.input;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiFormInputInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid', 'underline'],
                default: s_theme_1.default.current.get('ui.form.defaultLnf'),
            },
            outline: {
                type: 'Boolean',
                default: s_theme_1.default.current.get('ui.form.outline'),
            },
        };
    }
}
exports.interface = SSugarcssPluginUiFormInputInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid', outline: true }, params);
    const vars = [];
    vars.push(`@s.scope 'lnf' {`);
    if (finalParams.outline) {
        vars.push(`
                &:focus:not(:hover) {
                    @s.outline;
                }
            `);
    }
    vars.push(`
            @s.ui.base(input);
            @s.shape();
  `);
    vars.push('}');
    vars.push(`
        @s.scope 'bare' {
            width: 100%;
        }
    `);
    vars.push(`@s.scope 'lnf' {`);
    switch (finalParams.lnf) {
        case 'underline':
            vars.push(`
                background-color: s.color(current, --alpha 0);
                border-top: none !important;
                border-left: none !important;
                border-right: none !important;
                border-bottom: s.color(current, --alpha 0.3) solid s.border.width(ui.form.borderWidth) !important;
                padding-inline: 1ch !important;

                &:hover, &:focus {
                    border-bottom: s.color(current, --alpha 1) solid s.border.width(ui.form.borderWidth) !important;
                    background-color: s.color(current, --alpha 0.1);
                }
                `);
            break;
        default:
            break;
    }
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxxQkFBWTtJQUMxRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7Z0JBQzlCLE9BQU8sRUFBRSxpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDdEQ7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzthQUNuRDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPK0Msd0RBQVM7QUFFekQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxPQUFPLEVBQ1osT0FBTyxFQUFFLElBQUksSUFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFOUIsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJTCxDQUFDLENBQUM7S0FDVjtJQUVELElBQUksQ0FBQyxJQUFJLENBQUM7OztHQUdYLENBQUMsQ0FBQztJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O0tBSVQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNyQixLQUFLLFdBQVc7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7aUJBWUwsQ0FBQyxDQUFDO1lBQ1AsTUFBTTtRQUNWO1lBQ0ksTUFBTTtLQUNiO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUEvREQsNEJBK0RDIn0=