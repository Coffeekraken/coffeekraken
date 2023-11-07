"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class SSugarcssPluginFocusOutlineMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            color: {
                type: 'String',
                default: 'current',
            },
        };
    }
}
exports.interface = SSugarcssPluginFocusOutlineMixinInterface;
/**
 * @name           outline
 * @as              @s.focus.outline
 * @namespace      node.mixin.focus
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to display an outline when the element is in focus-visible state and NOT hover
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.focus.outline($1)
 *
 * @example        css
 * .myCoolItem {
 *      @s.focus.outline;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ color: 'current' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [
        `@s.outline.when(focus, $color: ${finalParams.color});`,
    ];
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLHlDQUEwQyxTQUFRLHFCQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFNBQVM7YUFDckI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ3FELDhEQUFTO0FBTS9EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsS0FBSyxFQUFFLFNBQVMsSUFDYixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDbkIsa0NBQWtDLFdBQVcsQ0FBQyxLQUFLLElBQUk7S0FDMUQsQ0FBQztJQUNGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFsQkQsNEJBa0JDIn0=