"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           import
 * @as              @s.theme.import
 * @namespace      node.mixin.theme
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin simply generate all the css needed for a theme to be applied
 * in any scope. It will print all the theme variables like colors, etc, as well
 * as set the correct font style and some other small things...
 * It just import the theme but does not apply directly.
 *
 * @param       {String}            variant             The theme variant you want
 * @param       {String}            theme               The theme you want
 * @param       {Boolean}           [scope=true]           If you want to scope the theme or not
 * @return        {Css}         The generated css
 *
 * @snippet         @s.theme.import($1)
 *
 * @example        css
 * @s.theme.import(dark);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginThemeinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            variant: {
                type: 'String',
            },
            theme: {
                type: 'String',
            },
            scope: {
                type: 'Boolean',
                default: true,
            },
        };
    }
}
exports.interface = SSugarcssPluginThemeinInterface;
function default_1({ params, atRule, replaceWith, frontData, }) {
    var _a, _b, _c, _d, _e;
    const finalParams = Object.assign({ variant: undefined, theme: undefined, scope: true }, params);
    if (!finalParams.theme) {
        finalParams.theme = (_b = (_a = frontData.theme) === null || _a === void 0 ? void 0 : _a.theme) !== null && _b !== void 0 ? _b : 'default';
    }
    if (!finalParams.variant) {
        finalParams.variant = (_d = (_c = frontData.theme) === null || _c === void 0 ? void 0 : _c.variant) !== null && _d !== void 0 ? _d : 'light';
    }
    if (!frontData.theme) {
        frontData.theme = {};
    }
    if (!((_e = frontData.theme) === null || _e === void 0 ? void 0 : _e.themes)) {
        frontData.theme.themes = [];
    }
    const currentTheme = frontData.theme.themes.find((t) => {
        return (t.theme === finalParams.theme && t.variant === finalParams.variant);
    });
    if (!currentTheme) {
        frontData.theme.themes.push({
            theme: finalParams.theme,
            variant: finalParams.variant,
        });
    }
    console.log(`<yellow>[@s.theme.import]</yellow> Theme imported : <magenta>${finalParams.theme}-${finalParams.variant}</magenta>`);
    const vars = s_theme_1.default.current.toCssVars({
        theme: finalParams.theme,
        variant: finalParams.variant,
    });
    const selectors = [];
    if (finalParams.theme)
        selectors.push(`[theme^="${finalParams.theme}"]`);
    if (finalParams.variant)
        selectors.push(`[theme$="${finalParams.variant}"]`);
    if (finalParams.scope) {
        vars.unshift(`${selectors.join('')} body {`);
        vars.push(`@s.lnf.base;`);
        vars.push('}');
    }
    else if (atRule.parent.type === 'root') {
        vars.unshift('body {');
        vars.push(`@s.lnf.base;`);
        vars.push('}');
    }
    else {
        vars.push(`@s.lnf.base;`);
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFFSCxNQUFNLCtCQUFnQyxTQUFRLHFCQUFZO0lBQ3RELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUTJDLG9EQUFTO0FBQ3JELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEdBTVo7O0lBQ0csTUFBTSxXQUFXLG1CQUNiLE9BQU8sRUFBRSxTQUFTLEVBQ2xCLEtBQUssRUFBRSxTQUFTLEVBQ2hCLEtBQUssRUFBRSxJQUFJLElBQ1IsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUNwQixXQUFXLENBQUMsS0FBSyxHQUFHLE1BQUEsTUFBQSxTQUFTLENBQUMsS0FBSywwQ0FBRSxLQUFLLG1DQUFJLFNBQVMsQ0FBQztLQUMzRDtJQUNELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1FBQ3RCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsTUFBQSxNQUFBLFNBQVMsQ0FBQyxLQUFLLDBDQUFFLE9BQU8sbUNBQUksT0FBTyxDQUFDO0tBQzdEO0lBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7UUFDbEIsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7S0FDeEI7SUFDRCxJQUFJLENBQUMsQ0FBQSxNQUFBLFNBQVMsQ0FBQyxLQUFLLDBDQUFFLE1BQU0sQ0FBQSxFQUFFO1FBQzFCLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztLQUMvQjtJQUNELE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ25ELE9BQU8sQ0FDSCxDQUFDLENBQUMsS0FBSyxLQUFLLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxXQUFXLENBQUMsT0FBTyxDQUNyRSxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ2YsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3hCLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSztZQUN4QixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87U0FDL0IsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLENBQUMsR0FBRyxDQUNQLGdFQUFnRSxXQUFXLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxPQUFPLFlBQVksQ0FDdkgsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLGlCQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNwQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUs7UUFDeEIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO0tBQy9CLENBQUMsQ0FBQztJQUVILE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztJQUMvQixJQUFJLFdBQVcsQ0FBQyxLQUFLO1FBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ3pFLElBQUksV0FBVyxDQUFDLE9BQU87UUFDbkIsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLFdBQVcsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO0lBRXhELElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO1NBQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7U0FBTTtRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDN0I7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBdEVELDRCQXNFQyJ9