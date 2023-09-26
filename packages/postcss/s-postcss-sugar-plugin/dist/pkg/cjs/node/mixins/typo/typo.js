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
 * @as              @s.typo
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
 * @snippet         @s.link.stretch
 *
 * @example         css
 * .my-cool-element {
 *      @s.typo(h1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLCtCQUFnQyxTQUFRLHFCQUFZO0lBQ3RELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLDRFQUE0RTtnQkFDaEYsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTTJDLG9EQUFTO0FBRXJELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7O0lBQ0csYUFBYTtJQUNiLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsSUFBSSxJQUNQLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLFFBQVEsR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFDakMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQ3BDLEdBQUcsR0FBRyxpQkFBUSxDQUFDLHVCQUF1QixDQUFDLE1BQUEsT0FBTyxDQUFDLEtBQUssbUNBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXBFLElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxFQUFFLENBQUM7VUFDSixHQUFHO0tBQ1IsQ0FDQSxDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTlCRCw0QkE4QkMifQ==