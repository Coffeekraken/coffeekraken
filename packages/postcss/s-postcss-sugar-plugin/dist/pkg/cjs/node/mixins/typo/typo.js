"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name            typo
 * @namespace       node.mixin.typo
 * @type            PostcssMixin
 * @platform        css
 * @status          beta
 *
 * This mixin allows you to apply a typo style to any of your element.
 *
 * @param           {String}            typo            The typo you want like "h1", "p" or all the typo defined in the themeTypo.config.ts config
 * @return          {Css}                                   The generated css
 *
 * @snippet         @sugar.link.stretch
 *
 * @example         css
 * .my-cool-element {
 *      @sugar.typo(h1);
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginTypoInterface extends s_interface_1.default {
    static get _definition() {
        return {
            typo: {
                type: 'String',
                description: 'The typo you want. Can be any of the typos defined in the themeTypo config',
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginTypoInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    var _a;
    // @ts-ignore
    const finalParams = Object.assign({ typo: 'h1' }, params);
    const vars = new CssVars();
    const typosObj = s_theme_1.default.get('typo'), typoObj = typosObj[finalParams.typo], css = s_theme_1.default.jsObjectToCssProperties((_a = typoObj.style) !== null && _a !== void 0 ? _a : {}, {});
    vars.code(() => `
        ${css}
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILE1BQU0sK0JBQWdDLFNBQVEscUJBQVk7SUFDdEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsNEVBQTRFO2dCQUNoRixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNMkMsb0RBQVM7QUFFckQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDs7SUFDRyxhQUFhO0lBQ2IsTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxJQUFJLElBQ1AsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sUUFBUSxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUNqQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFDcEMsR0FBRyxHQUFHLGlCQUFRLENBQUMsdUJBQXVCLENBQUMsTUFBQSxPQUFPLENBQUMsS0FBSyxtQ0FBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFcEUsSUFBSSxDQUFDLElBQUksQ0FDTCxHQUFHLEVBQUUsQ0FBQztVQUNKLEdBQUc7S0FDUixDQUNBLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBOUJELDRCQThCQyJ9