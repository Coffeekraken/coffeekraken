"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           noise
 * @as              @sugar.filter.noise
 * @namespace      node.mixin.filter
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a noise effect on any HTMLElement using the svg turbulence filter.
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.filter.noise
 *
 * @example        css
 * .my-element {
 *    \@sugar.filter.noise(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginDisabledInterface extends s_interface_1.default {
    static get _definition() {
        return {
            frequency: {
                type: 'Number',
                required: true,
                default: 0.65,
            },
            width: {
                type: 'String',
                required: true,
                default: '5000px',
            },
            height: {
                type: 'String',
                required: true,
                default: '5000px',
            },
        };
    }
}
exports.interface = postcssSugarPluginDisabledInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ frequency: 0.65, width: '5000px', height: '5000px' }, params);
    const vars = [];
    vars.push(`
            filter: sugar.filter.noise($frequency: ${finalParams.frequency}, $width: ${finalParams.width}, $height: ${finalParams.height})#filter;
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxxQkFBWTtJQUMxRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxRQUFRO2FBQ3BCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxRQUFRO2FBQ3BCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVErQyx3REFBUztBQUV6RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsU0FBUyxFQUFFLElBQUksRUFDZixLQUFLLEVBQUUsUUFBUSxFQUNmLE1BQU0sRUFBRSxRQUFRLElBQ2IsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQztxREFDdUMsV0FBVyxDQUFDLFNBQVMsYUFBYSxXQUFXLENBQUMsS0FBSyxjQUFjLFdBQVcsQ0FBQyxNQUFNO0tBQ25JLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF2QkQsNEJBdUJDIn0=