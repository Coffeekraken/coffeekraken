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
 * @as            s.transition
 * @namespace     node.function.transition
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./transition
 * @status        stable
 *
 * This function allows you to get a transition value depending on your theme config
 *
 * @param       {String}        transition      The transition to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.transition($1)
 *
 * @example       css
 * .my-element {
 *      transition: s.transition(fast);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginTransitionFunctionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                type: 'String',
                values: Object.keys(s_theme_1.default.current.get('transition')),
                default: 'default',
                required: true,
            },
        };
    }
}
exports.interface = SSugarcssPluginTransitionFunctionInterface;
function default_1({ params, themeValueProxy, }) {
    const finalParams = Object.assign({ name: 'default' }, params);
    const transition = finalParams.name;
    let val;
    // theme value
    val = themeValueProxy(transition);
    // try to get the transition with the pased
    const newVal = s_theme_1.default.current.getSafe(`transition.${val}`);
    if (newVal !== undefined) {
        val = newVal;
    }
    // default return simply his value
    return `${val}`;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxxQkFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkQsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNzRCwrREFBUztBQU1oRSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLGVBQWUsR0FJbEI7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLFNBQVMsSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDcEMsSUFBSSxHQUFHLENBQUM7SUFFUixjQUFjO0lBQ2QsR0FBRyxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVsQywyQ0FBMkM7SUFDM0MsTUFBTSxNQUFNLEdBQUcsaUJBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM3RCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDdEIsR0FBRyxHQUFHLE1BQU0sQ0FBQztLQUNoQjtJQUVELGtDQUFrQztJQUNsQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDcEIsQ0FBQztBQTFCRCw0QkEwQkMifQ==