"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           family
 * @namespace      node.mixin.font
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate the css needed to apply a particular font in your css.
 * The font parameter accept any defined font family from the
 * config.theme.font.family stack
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .my-cool-element {
 *    \@sugar.font.family(title);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFontFamilyInterface extends s_interface_1.default {
    static get _definition() {
        return {
            font: {
                type: 'String',
                values: Object.keys(s_theme_1.default.get('font.family')),
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginFontFamilyInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ font: 'default' }, params);
    const vars = new CssVars();
    const fontFamilyObj = s_theme_1.default.get(`font.family.${finalParams.font}`);
    Object.keys(fontFamilyObj).forEach((prop) => {
        switch (prop) {
            case 'font-family':
            case 'font-weight':
            case 'font-style':
                vars.code(`${prop}: var(${`--s-theme-font-family-${finalParams.font}-${prop}`}, ${fontFamilyObj[prop]});`);
                break;
            default:
                break;
        }
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSxxQ0FBc0MsU0FBUSxxQkFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNoRCxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNaUQsMERBQVM7QUFFM0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsU0FBUyxJQUNaLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLGFBQWEsR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRXRFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDeEMsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLFlBQVk7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FDTCxHQUFHLElBQUksU0FBUyx5QkFBeUIsV0FBVyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsS0FDL0QsYUFBYSxDQUFDLElBQUksQ0FDdEIsSUFBSSxDQUNQLENBQUM7Z0JBQ0YsTUFBTTtZQUNWO2dCQUNJLE1BQU07U0FDYjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXJDRCw0QkFxQ0MifQ==