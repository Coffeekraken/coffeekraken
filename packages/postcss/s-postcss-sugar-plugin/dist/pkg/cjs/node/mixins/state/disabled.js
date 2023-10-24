"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const astNodesToString_js_1 = __importDefault(require("../../utils/astNodesToString.js"));
class postcssSugarPluginStateDisabledMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginStateDisabledMixinInterface;
/**
 * @name           disabled
 * @as              @s.state.disabled
 * @namespace      node.mixin.state
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to target some disabled items to apply some styling.
 * Here's the generated selector:
 * - &:disabled
 *
 * @snippet         @s.state.disabled
 * @s.state.disabled {
 *      $1
 * }
 *
 * @example        css
 * .myCoolItem {
 *  @s.state.disabled {
 *      // ...
 *  }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ className: '' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    vars.push(`&:disabled, &[disabled] {`);
    vars.push((0, astNodesToString_js_1.default)(atRule.nodes));
    vars.push(`}`);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCwwRkFBaUU7QUFFakUsTUFBTSw2Q0FBOEMsU0FBUSxxQkFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUN5RCxrRUFBUztBQUluRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsU0FBUyxFQUFFLEVBQUUsSUFDVixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsNkJBQWtCLEVBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFyQkQsNEJBcUJDIn0=