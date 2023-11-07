"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          theme
 * @as          s.theme
 * @namespace     node.function.theme
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./theme
 * @status        beta
 *
 * This function allows you to get a theme value using dot path like "font.family.fontFamily", etc...
 * Usually the best way to access theme config is to use dedicated functions/mixins like "sugar.margin", "sugar.font.family", etc...
 *
 * @param       {String}        dotPath      The dot path to the theme config value you want back
 * @param       {Boolean}       [scalable=false]        Specify if you want to value back to be scalable. Work only for number config as well
 * @param       {'var'|'value'}     [return='var']      Specify if you want to get back a variable or the value directly. Note that you need to make sure a variable is outputed in your css to use the 'var'.
 * @param       {Any}           [fallback=null]         Specify a fallback in case the variable does not resolve to any value
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.theme($1)
 *
 * @example       css
 * .my-element {
 *    font-family: s.theme(font.family.fontFamily);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginThemeInterface extends s_interface_1.default {
    static get _definition() {
        return {
            dotPath: {
                type: 'String',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: false,
            },
            return: {
                type: 'String',
                values: ['var', 'value'],
                default: 'var',
            },
            fallback: {
                type: 'Boolean',
                default: true,
            },
        };
    }
}
exports.interface = SSugarcssPluginThemeInterface;
function theme({ params, }) {
    const finalParams = Object.assign({}, params);
    if (finalParams.return === 'var') {
        if (finalParams.scalable) {
            return `s.scalable(${s_theme_1.default.cssVar(finalParams.dotPath, finalParams.fallback)})`;
        }
        else {
            return s_theme_1.default.cssVar(finalParams.dotPath, finalParams.fallback);
        }
    }
    else {
        if (finalParams.scalable) {
            return `s.scalable(${s_theme_1.default.get(finalParams.dotPath)})`;
        }
        else {
            return s_theme_1.default.get(finalParams.dotPath);
        }
    }
}
exports.default = theme;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0VBQTZDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxNQUFNLDZCQUE4QixTQUFRLHFCQUFZO0lBQ3BELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztnQkFDeEIsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ3lDLGtEQUFTO0FBU25ELFNBQXdCLEtBQUssQ0FBQyxFQUMxQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQzlCLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUN0QixPQUFPLGNBQWMsaUJBQVEsQ0FBQyxNQUFNLENBQ2hDLFdBQVcsQ0FBQyxPQUFPLEVBQ25CLFdBQVcsQ0FBQyxRQUFRLENBQ3ZCLEdBQUcsQ0FBQztTQUNSO2FBQU07WUFDSCxPQUFPLGlCQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JFO0tBQ0o7U0FBTTtRQUNILElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUN0QixPQUFPLGNBQWMsaUJBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7U0FDN0Q7YUFBTTtZQUNILE9BQU8saUJBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVDO0tBQ0o7QUFDTCxDQUFDO0FBekJELHdCQXlCQyJ9