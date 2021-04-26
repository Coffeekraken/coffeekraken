"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeDefinition = void 0;
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name        themeInstance
 * @namespace      node.utils
 * @type          STheme
 *
 * Gives you access to the current theme STheme instance in order to access
 * utilities methods like loopOnColors, etc...
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const themeDefinition = {
    type: 'String',
    values: s_theme_1.default.themes,
    default: s_theme_1.default.baseTheme
};
exports.themeDefinition = themeDefinition;
function theme(theme) {
    if (global._postcssSugarPluginThemeScopeMixinTheme &&
        global._postcssSugarPluginThemeScopeMixinTheme.length >= 1) {
        theme = global._postcssSugarPluginThemeScopeMixinTheme.pop();
    }
    else {
        theme = s_theme_1.default.baseTheme;
    }
    return s_theme_1.default.theme(theme);
}
exports.default = theme;
// // @ts-ignore
// if (!global._sTheme) global._sTheme = new __STheme();
// // @ts-ignore
// export default global._sTheme;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7O0FBRWQsb0VBQTZDO0FBRTdDOzs7Ozs7Ozs7O0dBVUc7QUFFSCxNQUFNLGVBQWUsR0FBRztJQUN0QixJQUFJLEVBQUUsUUFBUTtJQUNkLE1BQU0sRUFBRSxpQkFBUSxDQUFDLE1BQU07SUFDdkIsT0FBTyxFQUFFLGlCQUFRLENBQUMsU0FBUztDQUM1QixDQUFDO0FBRU8sMENBQWU7QUFDeEIsU0FBd0IsS0FBSyxDQUFDLEtBQWM7SUFDMUMsSUFDRSxNQUFNLENBQUMsdUNBQXVDO1FBQzlDLE1BQU0sQ0FBQyx1Q0FBdUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUMxRDtRQUNBLEtBQUssR0FBRyxNQUFNLENBQUMsdUNBQXVDLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDOUQ7U0FBTTtRQUNMLEtBQUssR0FBRyxpQkFBUSxDQUFDLFNBQVMsQ0FBQztLQUM1QjtJQUNELE9BQU8saUJBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQVZELHdCQVVDO0FBRUQsZ0JBQWdCO0FBQ2hCLHdEQUF3RDtBQUN4RCxnQkFBZ0I7QUFDaEIsaUNBQWlDIn0=