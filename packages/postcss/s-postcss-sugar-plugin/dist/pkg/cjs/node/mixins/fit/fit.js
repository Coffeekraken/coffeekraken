"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           depth
 * @namespace      node.mixin.fit
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a certain depth that are defined
 * in the config.theme.depth stack like 10, 20, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .my-element {
 *    \@sugar.depth(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFitInterface extends s_interface_1.default {
    static get _definition() {
        return {
            size: {
                type: 'String',
                values: ['fill', 'contain', 'cover', 'none'],
                default: 'fill',
            },
        };
    }
}
exports.interface = postcssSugarPluginFitInterface;
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
        &:not(img,video) {
                    object-fit: none;
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sOEJBQStCLFNBQVEscUJBQVk7SUFDckQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU0wQyxtREFBUztBQUVwRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxNQUFNLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsUUFBUSxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQ3RCLEtBQUssT0FBTztZQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzthQUlULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixLQUFLLE1BQU07WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2FBSVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssTUFBTSxDQUFDO1FBQ1o7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2FBSVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtLQUNiO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztLQVVULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUEvREQsNEJBK0RDIn0=