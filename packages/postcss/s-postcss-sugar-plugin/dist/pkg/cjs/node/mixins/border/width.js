"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          width
 * @namespace     node.mixin.border
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a border width with a value coming
 * from the config.theme.border.width stack like 10, 20, etc...
 *
 * @param       {Number}      value     The border width value you want to apply like 10, 20, etc...
 * @return      {Css}                   The generated css
 *
 * @todo      Add multiple values support like @sugar.border.width(10);
 *
 * @example       css
 * .my-element {
 *    @sugar.border.width(10);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginBorderwidthMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            width: {
                type: 'Number|String',
                required: true,
                default: s_theme_1.default.get('border.width.default'),
            },
        };
    }
}
exports.interface = postcssSugarPluginBorderwidthMixinInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ width: 0 }, params);
    const vars = new CssVars();
    vars.code(`
        border-width: sugar.border.width(${finalParams.width});
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLDJDQUE0QyxTQUFRLHFCQUFZO0lBQ2xFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzthQUNoRDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNdUQsZ0VBQVM7QUFFakUsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxJQUNMLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDOzJDQUM2QixXQUFXLENBQUMsS0FBSztLQUN2RCxDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBckJELDRCQXFCQyJ9