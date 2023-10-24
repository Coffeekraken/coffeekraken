"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginStateOutlineMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            color: {
                type: 'String',
                default: 'current',
            },
        };
    }
}
exports.interface = postcssSugarPluginStateOutlineMixinInterface;
/**
 * @name           outline
 * @as              @s.outline
 * @namespace      node.mixin.outline
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a nice outline on any HTMLElement.
 * This outline will be display on hover and focus by default but can be displayed
 * always by passing the `on` parameter to `always` like so `@s.outline(always)`
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.outline
 *
 * @example        css
 * .myCoolItem {
 *      @s.outline();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ color: 'current' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    vars.push(`

        @keyframes s-outline-in-${finalParams.color} {
            from {
                outline: 0px solid s.color(${finalParams.color}, --alpha 0);
            }
            to {
                outline: 10px solid s.color(${finalParams.color}, --alpha 0.2);
            }
        }

        animation: s-outline-in-${finalParams.color} .1s ease-out forwards;    
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLDRDQUE2QyxTQUFRLHFCQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFNBQVM7YUFDckI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ3dELGlFQUFTO0FBTWxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsU0FBUyxJQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7a0NBRW9CLFdBQVcsQ0FBQyxLQUFLOzs2Q0FFTixXQUFXLENBQUMsS0FBSzs7OzhDQUdoQixXQUFXLENBQUMsS0FBSzs7OztrQ0FJN0IsV0FBVyxDQUFDLEtBQUs7S0FDOUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQS9CRCw0QkErQkMifQ==