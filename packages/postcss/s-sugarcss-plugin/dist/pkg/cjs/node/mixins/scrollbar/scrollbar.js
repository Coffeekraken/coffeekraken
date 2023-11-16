"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           scrollbar
 * @as          @s.scrollbar
 * @namespace      node.mixin.scrollbar
 * @type           PostcssMixin
 * @platform        css
 * @status        stable
 *
 * This mixin allows you to skin your scrollbar easily by applying a color and
 * a width to it.
 *
 * @return        {Css}           The generated css
 *
 * @snippet         @s.scrollbar($1, $2, $3)
 *
 * @example        css
 * body {
 *    @s.scrollbar(accent, complementary, 5px);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginScrollbarInterface extends s_interface_1.default {
    static get _definition() {
        return {
            color: {
                type: 'String',
                default: s_theme_1.default.current.get('ui.scrollbar.color'),
            },
            background: {
                type: 'String',
                default: s_theme_1.default.current.get('ui.scrollbar.color'),
            },
            size: {
                type: 'String',
                default: s_theme_1.default.current.get('ui.scrollbar.size'),
            },
        };
    }
}
exports.interface = SSugarcssPluginScrollbarInterface;
function default_1({ params, atRule, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({ size: '5px', color: 'accent', background: 'main' }, params);
    const vars = [];
    // lnf
    vars.push(`

        @s.lod.prevent {

            &::-webkit-scrollbar {
                width: ${finalParams.size};
                height: ${finalParams.size};
            }
            &::-webkit-scrollbar-track {
                    ${((_a = finalParams.background.match(/^s\.color/)) !== null && _a !== void 0 ? _a : finalParams.background.match(/^(var|hsla?|rgba?)\(/))
        ? `
                        background-color: ${finalParams.background};
                    `
        : `
                        background-color: s.color(${finalParams.background}, --alpha 0.1);
                    `}

            }
            &::-webkit-scrollbar-thumb {
                ${finalParams.color.match(/^s\.color/) ||
        finalParams.color.match(/^(var|hsla?|rgba?)\(/)
        ? `
                        background-color: ${finalParams.color};
                `
        : `
                    background-color: s.color(${finalParams.color}, --alpha 0.3);
                `}
            }
        }
  `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLGlDQUFrQyxTQUFRLHFCQUFZO0lBQ3hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUN0RDtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQ3REO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDckQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUTZDLHNEQUFTO0FBQ3ZELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDs7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEtBQUssRUFDWCxLQUFLLEVBQUUsUUFBUSxFQUNmLFVBQVUsRUFBRSxNQUFNLElBQ2YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O3lCQUtXLFdBQVcsQ0FBQyxJQUFJOzBCQUNmLFdBQVcsQ0FBQyxJQUFJOzs7c0JBSWxCLENBQUEsTUFBQSxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsbUNBQ3pDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDO1FBQ2hELENBQUMsQ0FBQzs0Q0FDYyxXQUFXLENBQUMsVUFBVTtxQkFDN0M7UUFDTyxDQUFDLENBQUM7b0RBQ3NCLFdBQVcsQ0FBQyxVQUFVO3FCQUV0RDs7OztrQkFLQSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDcEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7UUFDM0MsQ0FBQyxDQUFDOzRDQUNrQixXQUFXLENBQUMsS0FBSztpQkFDNUM7UUFDTyxDQUFDLENBQUM7Z0RBQ3NCLFdBQVcsQ0FBQyxLQUFLO2lCQUVqRDs7O0dBR2IsQ0FBQyxDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXhERCw0QkF3REMifQ==