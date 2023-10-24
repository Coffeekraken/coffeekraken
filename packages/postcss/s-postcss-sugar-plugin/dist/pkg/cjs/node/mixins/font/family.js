"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name           family
 * @as              @s.font.family
 * @namespace      node.mixin.font
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate the css needed to apply a particular font in your css.
 * The font parameter accept any defined font family from the
 * config.theme.font.family stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.font.family($1)
 *
 * @example        css
 * .my-cool-element {
 *    @s.font.family(title);
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
        const dashProp = (0, string_1.__dashCase)(prop);
        switch (prop) {
            case 'fontFamily':
            case 'fontWeight':
            case 'fontStyle':
                vars.code(`${dashProp}: var(${`--s-font-family-${finalParams.font}-${dashProp}`}, ${fontFamilyObj[prop]});`);
                break;
            default:
                break;
        }
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MsdURBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDaEQsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTWlELDBEQUFTO0FBRTNELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLFNBQVMsSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxhQUFhLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUV0RSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLElBQUEsbUJBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUVsQyxRQUFRLElBQUksRUFBRTtZQUNWLEtBQUssWUFBWSxDQUFDO1lBQ2xCLEtBQUssWUFBWSxDQUFDO1lBQ2xCLEtBQUssV0FBVztnQkFDWixJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsUUFBUSxTQUFTLG1CQUFtQixXQUFXLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRSxLQUNqRSxhQUFhLENBQUMsSUFBSSxDQUN0QixJQUFJLENBQ1AsQ0FBQztnQkFDRixNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBdkNELDRCQXVDQyJ9