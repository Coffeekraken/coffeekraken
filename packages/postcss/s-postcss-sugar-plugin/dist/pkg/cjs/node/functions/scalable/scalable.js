"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          scalable
 * @namespace     node.function.scalable
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./scalable
 * @status        beta
 *
 * This function allows you to get value that will be scaled using the "--s-scale" variable.
 * This allows you to make your components aware of classes like "s-scale-10", etc...
 *
 * @param       {Number}        value      The value you want to be scalable
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    padding: sugar.scalable(20px);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginScalableFunctionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            value: {
                type: 'String|Number',
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginScalableFunctionInterface;
function default_1({ params, }) {
    const finalParams = Object.assign({ value: '' }, params);
    return `calc(${finalParams.value} * var(--s-scale, 1))`;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSwyQ0FBNEMsU0FBUSxxQkFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxlQUFlO2dCQUNyQixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDdUQsZ0VBQVM7QUFNakUsbUJBQXlCLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsT0FBTyxRQUFRLFdBQVcsQ0FBQyxLQUFLLHVCQUF1QixDQUFDO0FBQzVELENBQUM7QUFYRCw0QkFXQyJ9