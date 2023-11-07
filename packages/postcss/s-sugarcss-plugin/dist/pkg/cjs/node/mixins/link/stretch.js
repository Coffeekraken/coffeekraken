"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name            stretch
 * @as              @s.link.stretch
 * @namespace       node.mixin.link
 * @type            PostcssMixin
 * @platform        css
 * @status          beta
 *
 * This mixin allows you to stretch a link clickable area without having to change the actual link css.
 * It uses the `after` pseudo class to create a new clickable area that will spend until it reach an element that as a position specified.
 *
 * @return          {Css}                                   The generated css
 *
 * @snippet         @s.link.stretch
 *
 * @example         css
 * .my-cool-element {
 *      @s.link.stretch;
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginLinkStretchInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginLinkStretchInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    // @ts-ignore
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
    `).code(() => `
        &:after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            pointer-events: auto;
            content: '';
            background-color: rgba(0, 0, 0, 0);
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFRK0Msd0RBQVM7QUFFekQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLGFBQWE7SUFDYixNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7S0FDVCxDQUNBLENBQUMsSUFBSSxDQUNGLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7S0FZVCxDQUNBLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBdENELDRCQXNDQyJ9