"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          scalable
 * @as            sugar.scalable
 * @namespace     node.function.scalable
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./scalable
 * @status        beta
 *
 * This function allows you to get value that will be scaled using the "--s-scale" variable.
 * This allows you to make your components aware of classes like "s-scale-10", etc...
 * The resulting value of this will be affected by the --s-scale-global variable that you can change
 * using the `@sugar.scale.global(0.9)` mixin...
 *
 * @param       {Number}        value      The value you want to be scalable
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.scalable($1)
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
    return `calc(${finalParams.value} * var(--s-scale, 1) * var(--s-scale-global, 1))`;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFFSCxNQUFNLDJDQUE0QyxTQUFRLHFCQUFZO0lBQ2xFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUN1RCxnRUFBUztBQU1qRSxtQkFBeUIsRUFDckIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixPQUFPLFFBQVEsV0FBVyxDQUFDLEtBQUssa0RBQWtELENBQUM7QUFDdkYsQ0FBQztBQVhELDRCQVdDIn0=