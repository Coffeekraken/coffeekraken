"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          depth
 * @as            s.depth
 * @namespace     node.function.depth
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./depth
 * @status        beta
 *
 * This function allows you to get a depth (box-shadow) value depending on your theme config
 *
 * @param       {String}        depth      The depth to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.depth($1)
 *
 * @example       css
 * .my-element {
 *    box-shadow: s.depth(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginDepthFunctionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            depth: {
                type: 'Number|String',
                required: true,
            },
        };
    }
}
exports.interface = SSugarcssPluginDepthFunctionInterface;
function depth({ params, }) {
    const finalParams = Object.assign({}, params);
    // try to get the padding with the pased
    const val = s_theme_1.default.current.getSafe(`depth.${finalParams.depth}`);
    if (val !== undefined) {
        finalParams.depth = val;
    }
    // 0 - 20 - 100 - ...
    if (`${finalParams.depth}`.match(/^[0-9]+$/)) {
        return s_theme_1.default.current.cssVar(`depth.${finalParams.depth}`);
    }
    // dotPath
    if (typeof finalParams.depth === 'string' &&
        finalParams.depth.match(/^[a-zA-Z0-9\.]+$/)) {
        return s_theme_1.default.current.cssVar(`depth.${s_theme_1.default.current.get(finalParams.depth)}`);
    }
    // passed string
    return finalParams.depth;
}
exports.default = depth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0VBQTZDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ2lELDBEQUFTO0FBTTNELFNBQXdCLEtBQUssQ0FBQyxFQUMxQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRix3Q0FBd0M7SUFDeEMsTUFBTSxHQUFHLEdBQUcsaUJBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbkUsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1FBQ25CLFdBQVcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0tBQzNCO0lBRUQscUJBQXFCO0lBQ3JCLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzFDLE9BQU8saUJBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDaEU7SUFFRCxVQUFVO0lBQ1YsSUFDSSxPQUFPLFdBQVcsQ0FBQyxLQUFLLEtBQUssUUFBUTtRQUNyQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUM3QztRQUNFLE9BQU8saUJBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUMxQixTQUFTLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FDckQsQ0FBQztLQUNMO0lBRUQsZ0JBQWdCO0lBQ2hCLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQztBQUM3QixDQUFDO0FBaENELHdCQWdDQyJ9