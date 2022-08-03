"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          transition
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./transition
 * @status        beta
 *
 * This function allows you to get a transition value depending on your theme config
 *
 * @param       {String}        transition      The transition to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      transition: sugar.transition(fast);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginTransitionFunctionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                type: 'String',
                values: Object.keys(s_theme_1.default.get('transition')),
                default: 'default',
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginTransitionFunctionInterface;
function default_1({ params, themeValueProxy, }) {
    const finalParams = Object.assign({ name: 'default' }, params);
    const transition = finalParams.name;
    let val;
    // theme value
    val = themeValueProxy(transition);
    // try to get the transition with the pased
    const newVal = s_theme_1.default.getSafe(`transition.${val}`);
    if (newVal !== undefined) {
        val = newVal;
    }
    // default return simply his value
    return `${val}`;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSw2Q0FBOEMsU0FBUSxxQkFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMvQyxPQUFPLEVBQUUsU0FBUztnQkFDbEIsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ3lELGtFQUFTO0FBTW5FLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sZUFBZSxHQUlsQjtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsU0FBUyxJQUNaLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNwQyxJQUFJLEdBQUcsQ0FBQztJQUVSLGNBQWM7SUFDZCxHQUFHLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWxDLDJDQUEyQztJQUMzQyxNQUFNLE1BQU0sR0FBRyxpQkFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDckQsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ3RCLEdBQUcsR0FBRyxNQUFNLENBQUM7S0FDaEI7SUFFRCxrQ0FBa0M7SUFDbEMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLENBQUM7QUExQkQsNEJBMEJDIn0=