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
 * @as          @sugar.scrollbar
 * @namespace      node.mixin.scrollbar
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to skin your scrollbar easily by applying a color and
 * a width to it.
 *
 * @return        {Css}           The generated css
 *
 * @snippet         @sugar.scrollbar($1, $2, $3)
 *
 * @example        css
 * body {
 *    @sugar.scrollbar(accent, complementary, 5px);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginScrollbarInterface extends s_interface_1.default {
    static get _definition() {
        return {
            color: {
                type: 'String',
                default: s_theme_1.default.get('ui.scrollbar.color'),
            },
            background: {
                type: 'String',
                default: s_theme_1.default.get('ui.scrollbar.color'),
            },
            size: {
                type: 'String',
                default: s_theme_1.default.get('ui.scrollbar.size'),
            },
        };
    }
}
exports.interface = postcssSugarPluginScrollbarInterface;
function default_1({ params, atRule, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({ size: '5px', color: 'accent', background: 'main' }, params);
    const vars = [];
    // lnf
    vars.push(`

        @sugar.lod.prevent {

            &::-webkit-scrollbar {
                width: ${finalParams.size};
                height: ${finalParams.size};
            }
            &::-webkit-scrollbar-track {
                    ${((_a = finalParams.background.match(/^sugar\.color/)) !== null && _a !== void 0 ? _a : finalParams.background.match(/^(var|hsla?|rgba?)\(/))
        ? `
                        background-color: ${finalParams.background};
                    `
        : `
                        background-color: sugar.color(${finalParams.background}, --alpha 0.1);
                    `}

            }
            &::-webkit-scrollbar-thumb {
                ${finalParams.color.match(/^sugar\.color/) ||
        finalParams.color.match(/^(var|hsla?|rgba?)\(/)
        ? `
                        background-color: ${finalParams.color};
                `
        : `
                    background-color: sugar.color(${finalParams.color});
                `}
            }
        }
  `);
    // wireframe
    vars.push(`
        @sugar.wireframe {
            &::-webkit-scrollbar-track {
                background-color: rgba(0,0,0,0.05);
                
                @sugar.theme dark {
                    background-color: rgba(255,255,255,0.05);
                }
            }
            &::-webkit-scrollbar-thumb {
                background-color: rgba(0,0,0,0.1);
                
                @sugar.theme dark {
                    background-color: rgba(255,255,255,0.1);
                }
            }
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLG9DQUFxQyxTQUFRLHFCQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQzlDO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUM5QztZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDN0M7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUWdELHlEQUFTO0FBQzFELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDs7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEtBQUssRUFDWCxLQUFLLEVBQUUsUUFBUSxFQUNmLFVBQVUsRUFBRSxNQUFNLElBQ2YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O3lCQUtXLFdBQVcsQ0FBQyxJQUFJOzBCQUNmLFdBQVcsQ0FBQyxJQUFJOzs7c0JBSWxCLENBQUEsTUFBQSxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsbUNBQzdDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDO1FBQ2hELENBQUMsQ0FBQzs0Q0FDYyxXQUFXLENBQUMsVUFBVTtxQkFDN0M7UUFDTyxDQUFDLENBQUM7d0RBQzBCLFdBQVcsQ0FBQyxVQUFVO3FCQUUxRDs7OztrQkFLQSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7UUFDeEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7UUFDM0MsQ0FBQyxDQUFDOzRDQUNrQixXQUFXLENBQUMsS0FBSztpQkFDNUM7UUFDTyxDQUFDLENBQUM7b0RBQzBCLFdBQVcsQ0FBQyxLQUFLO2lCQUVyRDs7O0dBR2IsQ0FBQyxDQUFDO0lBRUQsWUFBWTtJQUNaLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBaUJULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE1RUQsNEJBNEVDIn0=