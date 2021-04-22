"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = require("@coffeekraken/s-sugar-config");
/**
 * @name        themeVar
 * @namespace   node.utils
 * @type        Function
 *
 * This function take a simple theme dot path and returns the proper
 * variable string with the value fallback.
 *
 * @param       {String}        dotPath         The dot path theme variable you want
 * @return      {String}                        The proper css variable string that represent this value with his fallback just in case
 *
 * @example         js
 * import { themeVar } from '@coffeekraken/s-postcss-sugar-plugin';
 * themeVar('ui.button.padding'); // => var(--s-theme-ui-button-padding, 1em 1.2em)
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function themeVar(dotPath) {
    return `var(--s-theme-${dotPath.replace(/\./gm, '-')}, ${s_sugar_config_1.themeConfig(dotPath)})`;
}
exports.default = themeVar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVWYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVZhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlFQUEyRDtBQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxTQUF3QixRQUFRLENBQUMsT0FBZTtJQUM5QyxPQUFPLGlCQUFpQixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyw0QkFBVyxDQUNsRSxPQUFPLENBQ1IsR0FBRyxDQUFDO0FBQ1AsQ0FBQztBQUpELDJCQUlDIn0=