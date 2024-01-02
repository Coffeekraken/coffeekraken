"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class SSugarcssPluginScopEexcludeMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'String[]',
                    splitChars: [',', ' '],
                },
                description: "Specify the scope(s) you don't want to generate for the enclosed css",
                required: true,
            },
        };
    }
}
exports.interface = SSugarcssPluginScopEexcludeMixinInterface;
/**
 * @name           exclude
 * @as              @s.scope
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to set the "scope(s)" you don't want to all the enclosed css
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.scope.exclude ($1) { $2 }
 * @s.scope.exclude $1 {
 *      $2
 * }
 *
 * @example        css
 * @s.scope.exclude lnf {
 *      @s.ui.button;
 *      // etc...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, registerPostProcessor, replaceWith, sharedData, }) {
    const finalParams = Object.assign({ scope: [] }, (params !== null && params !== void 0 ? params : {}));
    atRule.name = 'media';
    atRule.params = `s-scope-exclude:${finalParams.scope.join(',')}`;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLHlDQUEwQyxTQUFRLHFCQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxVQUFVO29CQUNoQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxXQUFXLEVBQ1Asc0VBQXNFO2dCQUMxRSxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDcUQsOERBQVM7QUFNL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixxQkFBcUIsRUFDckIsV0FBVyxFQUNYLFVBQVUsR0FPYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsRUFBRSxJQUNOLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztJQUN0QixNQUFNLENBQUMsTUFBTSxHQUFHLG1CQUFtQixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ3JFLENBQUM7QUFwQkQsNEJBb0JDIn0=