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
        @sugar.lod.wireframe {
            &::-webkit-scrollbar-track {
                background-color: rgba(0, 0, 0, .03);
            }
            &::-webkit-scrollbar-thumb {
                background-color: rgba(0, 0, 0, .1);
            }
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILE1BQU0sb0NBQXFDLFNBQVEscUJBQVk7SUFDM0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDOUM7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQzlDO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUM3QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRZ0QseURBQVM7QUFDMUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkOztJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsS0FBSyxFQUNYLEtBQUssRUFBRSxRQUFRLEVBQ2YsVUFBVSxFQUFFLE1BQU0sSUFDZixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7eUJBS1csV0FBVyxDQUFDLElBQUk7MEJBQ2YsV0FBVyxDQUFDLElBQUk7OztzQkFJbEIsQ0FBQSxNQUFBLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxtQ0FDN0MsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7UUFDaEQsQ0FBQyxDQUFDOzRDQUNjLFdBQVcsQ0FBQyxVQUFVO3FCQUM3QztRQUNPLENBQUMsQ0FBQzt3REFDMEIsV0FBVyxDQUFDLFVBQVU7cUJBRTFEOzs7O2tCQUtBLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztRQUN4QyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztRQUMzQyxDQUFDLENBQUM7NENBQ2tCLFdBQVcsQ0FBQyxLQUFLO2lCQUM1QztRQUNPLENBQUMsQ0FBQztvREFDMEIsV0FBVyxDQUFDLEtBQUs7aUJBRXJEOzs7R0FHYixDQUFDLENBQUM7SUFFRCxZQUFZO0lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O0tBU1QsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXBFRCw0QkFvRUMifQ==