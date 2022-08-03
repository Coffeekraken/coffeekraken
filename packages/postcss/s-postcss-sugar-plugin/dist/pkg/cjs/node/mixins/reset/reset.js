"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependencies = exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
/**
 * @name           reset
 * @namespace      node.mixin.reset
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the reset css needed to standardize display
 * on all browsers.
 *
 * @ƒeature       Reset from https://github.com/nicolas-cusan/destyle.css
 * @feature      Body height on desktop and IOS using "fill-available" technique
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.reset;
 *
 * @see       https://github.com/nicolas-cusan/destyle.css
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginResetInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginResetInterface;
function dependencies() {
    return {
        files: [`${(0, dirname_1.default)()}/destyle.js`, `${(0, dirname_1.default)()}/sugar.js`],
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
        * \@sugar.reset;
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
        `).code(`
      @sugar.reset.destyle;
      @sugar.reset.sugar;
  `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxrRkFBNEQ7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILE1BQU0sZ0NBQWlDLFNBQVEscUJBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJNEMscURBQVM7QUFFdEQsU0FBZ0IsWUFBWTtJQUN4QixPQUFPO1FBQ0gsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFBLGlCQUFTLEdBQUUsYUFBYSxFQUFFLEdBQUcsSUFBQSxpQkFBUyxHQUFFLFdBQVcsQ0FBQztLQUNsRSxDQUFDO0FBQ04sQ0FBQztBQUpELG9DQUlDO0FBRUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxFQUNOLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBMkJMLENBQ0osQ0FBQyxJQUFJLENBQUM7OztHQUdSLENBQUMsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFwREQsNEJBb0RDIn0=