"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           fit
 * @as              @s.fit
 * @namespace      node.mixin.fit
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a certain object-fit on your element
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.fit($1)
 *
 * @example        css
 * .my-element {
 *    @s.fit(cover);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginFitInterface extends s_interface_1.default {
    static get _definition() {
        return {
            size: {
                type: 'String',
                values: ['fill', 'contain', 'cover', 'none', 'abs'],
                default: 'fill',
            },
        };
    }
}
exports.interface = SSugarcssPluginFitInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ size: 'fill' }, params);
    const vars = [];
    switch (finalParams.size) {
        case 'cover':
            vars.push(`
                & {
                    object-fit: cover;
                }
            `);
            break;
        case 'contain':
            vars.push(`
                & {
                    object-fit: contain;
                }
            `);
            break;
        case 'none':
            vars.push(`
                & {
                    object-fit: none;
                }
            `);
            break;
        case 'abs':
            vars.push(`
                & {
                    position: absolute;
                    top: 0; left: 0;
                }
            `);
            break;
        case 'fill':
        default:
            vars.push(`
                & {
                    object-fit: fill;
                }
            `);
            break;
    }
    vars.push(`
        & {
            width: 100%; height: 100%;
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSwyQkFBNEIsU0FBUSxxQkFBWTtJQUNsRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ25ELE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU11QyxnREFBUztBQUVqRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxNQUFNLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsUUFBUSxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQ3RCLEtBQUssT0FBTztZQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzthQUlULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLE1BQU07WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2FBSVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssS0FBSztZQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O2FBS1QsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssTUFBTSxDQUFDO1FBQ1o7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2FBSVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtLQUNiO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFqRUQsNEJBaUVDIn0=