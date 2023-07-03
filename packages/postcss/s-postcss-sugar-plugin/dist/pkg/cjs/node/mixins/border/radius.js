"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          radius
 * @as              @sugar.border.radius
 * @namespace     node.mixin.border
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a border radius with a value coming
 * from the config.theme.border.radius stack like 10, 20, etc...
 *
 * @param       {Number}      value     The border radius value you want to apply like 10, 20, etc...
 * @return      {Css}                   The generated css
 *
 * @todo      Add multiple values support like @sugar.border.radius(10 20);
 *
 * @snippet         @sugar.border.radius($1)
 *
 * @example       css
 * .my-element {
 *    @sugar.border.radius(10);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginBorderRadiusMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            radius: {
                type: 'Number|String',
                required: true,
                default: s_theme_1.default.get('border.radius.default'),
            },
        };
    }
}
exports.interface = postcssSugarPluginBorderRadiusMixinInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ radius: 0 }, params);
    const vars = new CssVars();
    vars.code(`border-radius: sugar.border.radius(${finalParams.radius});`);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFFSCxNQUFNLDRDQUE2QyxTQUFRLHFCQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQzthQUNqRDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNd0QsaUVBQVM7QUFFbEUsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixNQUFNLEVBQUUsQ0FBQyxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUN4RSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBbkJELDRCQW1CQyJ9