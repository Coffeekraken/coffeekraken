"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           sugar
 * @as              @sugar.reset.sugar
 * @namespace      node.mixin.reset
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin print the sugar css reset that makes:
 *
 * @feature     Handle body height for IOS devices using the "fill-available" and "min-height: -webkit-fill-available;" technique
 * @feature     Ensure template are not displayed
 * @feature     Ensure hidden things are not displayed
 * @feature     Set the box-sizing to border box for all HTMLElement
 * @feature     Set the webkit highlight color to transparent color
 * @feature     Remote outline on every elements
 * @feature     Set the max-width to 100% for images
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.reset.sugar
 *
 * @example        css
 * \@sugar.reset.sugar;
 *
 * @see       https://github.com/nicolas-cusan/destyle.css
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginResetDestyleInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginResetDestyleInterface;
function default_1({ params, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `/**
        * @name          Sugar reset
        * @namespace          sugar.style.resets
        * @type               Styleguide
        * @menu           Styleguide / Resets        /styleguide/resets/sugar
        * @platform       css
        * @status       beta
        * 
        * This mixin allows you to apply the \`sugar\` reset easily.
        * 
        * @feature     Handle body height for IOS devices using the \`fill-available\` and \`min-height: -webkit-fill-available;\` technique
        * @feature     Ensure template are not displayed
        * @feature     Ensure hidden things are not displayed
        * @feature     Set the \`box-sizing\` to \`border-box\` for all HTMLElement
        * @feature     Set the webkit highlight color to transparent color
        * @feature     Remove outline on every elements
        * @feature     Set the \`max-width\` to \`100%\` for images
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @example        css       Simple usage
        * \@sugar.reset.sugar;
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`


    /* purgecss start ignore */

    /**
     * Body height
     */
    html {
        height: fill-available;
    }
    body {
        min-height: 100vh;
        min-height: -webkit-fill-available;
    }

    /**
     * Add the correct display in IE 10+.
     */
    template {
        display: none;
    }

    /**
     * Add the correct display in IE 10.
     */
    [hidden] {
        display: none;
    }

    /**
     * Set box sizing to berder box
     * Set the webkit highlight color to transparent color
     * Remote outline on every elements
     */
    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        outline: none;
    }

    /**
     * Max width 100% for images
     */
    img {
        max-width: 100%;
    }

    /* purgecss end ignore */


  `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUVILE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJbUQsNERBQVM7QUFFN0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBNEJILENBQ04sQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1EUixDQUFDLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBbkdELDRCQW1HQyJ9