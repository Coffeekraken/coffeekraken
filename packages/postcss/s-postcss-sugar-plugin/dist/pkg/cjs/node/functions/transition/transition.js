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
 * @snippet         sugar.transition($1)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLDZDQUE4QyxTQUFRLHFCQUFZO0lBQ3BFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDeUQsa0VBQVM7QUFNbkUsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixlQUFlLEdBSWxCO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxTQUFTLElBQ1osTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQ3BDLElBQUksR0FBRyxDQUFDO0lBRVIsY0FBYztJQUNkLEdBQUcsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFbEMsMkNBQTJDO0lBQzNDLE1BQU0sTUFBTSxHQUFHLGlCQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNyRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDdEIsR0FBRyxHQUFHLE1BQU0sQ0FBQztLQUNoQjtJQUVELGtDQUFrQztJQUNsQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDcEIsQ0FBQztBQTFCRCw0QkEwQkMifQ==