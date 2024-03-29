"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependencies = exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const fs_1 = require("@coffeekraken/sugar/fs");
/**
 * @name           reset
 * @as              @s.reset
 * @namespace      node.mixin.reset
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the reset css needed to standardize display
 * on all browsers.
 *
 * @ƒeature       Reset from https://github.com/nicolas-cusan/destyle.css
 * @feature      Body height on desktop and IOS using "fill-available" technique
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.reset
 *
 * @example        css
 * @s.reset;
 *
 * @see       https://github.com/nicolas-cusan/destyle.css
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginResetInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginResetInterface;
function dependencies() {
    return {
        files: [`${(0, fs_1.__dirname)()}/destyle.js`, `${(0, fs_1.__dirname)()}/sugar.js`],
    };
}
exports.dependencies = dependencies;
function default_1({ params, CssVars, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
        /**
        * @name          Global reset
        * @namespace          sugar.style.resets
        * @type               Styleguide
        * @menu           Styleguide / Resets        /styleguide/resets/global
        * @platform       css
        * @status       beta
        * 
        * These mixins allows you to apply some resets like \`destyle\` and/or the \`sugar\` one.
        * The \`destyle\` one is well known and you can find the documentation on their website.
        * The \`sugar\` one is our own that add some resets like setting max-width to 100% for images, and some more. Check our his own documentation page.
        * 
        * @feature      Apply the \`destyle\` reset
        * @feature      Apply the \`sugar\` reset
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @example        css
        * @s.reset;
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
        `).code(`
      @s.reset.destyle;
      @s.reset.sugar;
  `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCwrQ0FBbUQ7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0sNkJBQThCLFNBQVEscUJBQVk7SUFDcEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJeUMsa0RBQVM7QUFFbkQsU0FBZ0IsWUFBWTtJQUN4QixPQUFPO1FBQ0gsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFBLGNBQVMsR0FBRSxhQUFhLEVBQUUsR0FBRyxJQUFBLGNBQVMsR0FBRSxXQUFXLENBQUM7S0FDbEUsQ0FBQztBQUNOLENBQUM7QUFKRCxvQ0FJQztBQUVELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sRUFDTixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQTJCTCxDQUNKLENBQUMsSUFBSSxDQUFDOzs7R0FHUixDQUFDLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBcERELDRCQW9EQyJ9