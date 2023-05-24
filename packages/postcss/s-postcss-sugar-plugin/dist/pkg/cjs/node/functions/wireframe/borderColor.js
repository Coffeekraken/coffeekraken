"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          borderColor
 * @as              sugar.wireframe.borderColor
 * @namespace     node.function.wireframe
 * @type          PostcssFunction
 * @platform      postcss
 * @interface    ./borderColor
 * @status        beta
 *
 * This function allows you to get a borderColor value for your wireframe depending on your theme config
 *
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.wireframe.borderColor
 *
 * @example       css
 * .my-element {
 *    border: sugar.wireframe.borderColor();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginWireframeBorderFunctionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            variant: {
                type: 'String',
                values: ['light', 'dark'],
                default: 'light',
            },
        };
    }
}
exports.interface = postcssSugarPluginWireframeBorderFunctionInterface;
function default_1({ params, }) {
    const finalParams = Object.assign({ variant: 'light' }, params);
    return s_theme_1.default.get(`wireframe.${finalParams.variant}.borderColor`);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLGtEQUFtRCxTQUFRLHFCQUFZO0lBQ3pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztnQkFDekIsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQzhELHVFQUFTO0FBTXhFLG1CQUF5QixFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsT0FBTyxFQUFFLE9BQU8sSUFDYixNQUFNLENBQ1osQ0FBQztJQUNGLE9BQU8saUJBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxXQUFXLENBQUMsT0FBTyxjQUFjLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBVkQsNEJBVUMifQ==