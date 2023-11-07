"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          background
 * @as          s.wireframe.background
 * @namespace     node.function.wireframe
 * @type          PostcssFunction
 * @platform      postcss
 * @interface    ./background
 * @status        alpha
 *
 * This function allows you to get a background value for your wireframe depending on your theme config
 *
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.wireframe.background
 *
 * @example       css
 * .my-element {
 *    background: s.wireframe.background();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginWireframeBackgroundFunctionInterface extends s_interface_1.default {
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
exports.interface = SSugarcssPluginWireframeBackgroundFunctionInterface;
function default_1({ params, }) {
    const finalParams = Object.assign({ variant: 'light' }, params);
    return s_theme_1.default.get(`wireframe.${finalParams.variant}.background`);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLG1EQUFvRCxTQUFRLHFCQUFZO0lBQzFFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztnQkFDekIsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQytELHdFQUFTO0FBTXpFLG1CQUF5QixFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsT0FBTyxFQUFFLE9BQU8sSUFDYixNQUFNLENBQ1osQ0FBQztJQUNGLE9BQU8saUJBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxXQUFXLENBQUMsT0FBTyxhQUFhLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBVkQsNEJBVUMifQ==