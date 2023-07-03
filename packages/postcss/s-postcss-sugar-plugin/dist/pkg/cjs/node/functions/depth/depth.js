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
 * @as            sugar.depth
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
 * @snippet         sugar.depth($1)
 *
 * @example       css
 * .my-element {
 *    box-shadow: sugar.depth(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginDepthFunctionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            depth: {
                type: 'Number|String',
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginDepthFunctionInterface;
function depth({ params, }) {
    const finalParams = Object.assign({}, params);
    // try to get the padding with the pased
    const val = s_theme_1.default.getSafe(`depth.${finalParams.depth}`);
    if (val !== undefined) {
        finalParams.depth = val;
    }
    // 0 - 20 - 100 - ...
    if (`${finalParams.depth}`.match(/^[0-9]+$/)) {
        return s_theme_1.default.cssVar(`depth.${finalParams.depth}`);
    }
    // dotPath
    if (typeof finalParams.depth === 'string' &&
        finalParams.depth.match(/^[a-zA-Z0-9\.]+$/)) {
        return s_theme_1.default.cssVar(`depth.${s_theme_1.default.get(finalParams.depth)}`);
    }
    // passed string
    return finalParams.depth;
}
exports.default = depth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0VBQTZDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sd0NBQXlDLFNBQVEscUJBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ29ELDZEQUFTO0FBTTlELFNBQXdCLEtBQUssQ0FBQyxFQUMxQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRix3Q0FBd0M7SUFDeEMsTUFBTSxHQUFHLEdBQUcsaUJBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMzRCxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7UUFDbkIsV0FBVyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7S0FDM0I7SUFFRCxxQkFBcUI7SUFDckIsSUFBSSxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDMUMsT0FBTyxpQkFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ3hEO0lBRUQsVUFBVTtJQUNWLElBQ0ksT0FBTyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVE7UUFDckMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFDN0M7UUFDRSxPQUFPLGlCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsaUJBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN0RTtJQUVELGdCQUFnQjtJQUNoQixPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDN0IsQ0FBQztBQTlCRCx3QkE4QkMifQ==