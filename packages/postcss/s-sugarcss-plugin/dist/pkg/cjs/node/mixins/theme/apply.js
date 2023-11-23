"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           apply
 * @as              @s.theme.apply
 * @namespace      node.mixin.theme
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin simply apply a theme in the desired scope
 *
 * @param       {String}            variant             The theme variant you want
 * @param       {String}            theme               The theme you want
 * @param       {Boolean}           [scope=false]           If you want to scope the theme or not
 * @return        {Css}         The generated css
 *
 * @snippet         @s.theme.apply($1)
 *
 * @example        css
 * @s.theme.apply(light);
 * .my-cool-element {
 *    @s.theme.apply(dark);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginThemeinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            variant: {
                type: 'String',
                default: 'light',
            },
            theme: {
                type: 'String',
                default: 'default',
            },
            scope: {
                type: 'Boolean',
                default: false,
            },
        };
    }
}
exports.interface = SSugarcssPluginThemeinInterface;
function default_1({ params, atRule, replaceWith, frontData, }) {
    var _a, _b, _c;
    const finalParams = Object.assign({ variant: undefined, theme: undefined, scope: false }, params);
    // setting theme from sugar.json
    const sugarJsonInstance = new s_sugar_json_1.default();
    const sugarJson = sugarJsonInstance.current();
    if (!finalParams.theme && ((_a = sugarJson.theme) === null || _a === void 0 ? void 0 : _a.theme)) {
        finalParams.theme = sugarJson.theme.theme;
        console.log(`<yellow>[@s.theme.apply]</yellow> Theme "<magenta>${sugarJson.theme.theme}</magenta>" applied from the <cyan>sugar.json</cyan> file...`);
    }
    if (!finalParams.variant && ((_b = sugarJson.theme) === null || _b === void 0 ? void 0 : _b.variant)) {
        finalParams.variant = sugarJson.theme.variant;
        console.log(`<yellow>[@s.theme.apply]</yellow> Theme variant "<magenta>${sugarJson.theme.variant}</magenta>" applied from the <cyan>sugar.json</cyan> file...`);
    }
    console.log(`<yellow>[@s.theme.apply]</yellow>  Theme applied  : <magenta>${finalParams.theme}-${finalParams.variant}</magenta>`);
    if (!frontData.theme) {
        frontData.theme = {};
    }
    if (!((_c = frontData.theme) === null || _c === void 0 ? void 0 : _c.themes)) {
        frontData.theme.themes = [];
    }
    frontData.theme.theme = finalParams.theme;
    frontData.theme.variant = finalParams.variant;
    const currentTheme = frontData.theme.themes.find((t) => {
        return (t.theme === finalParams.theme && t.variant === finalParams.variant);
    });
    const themeInstance = s_theme_1.default.getTheme(finalParams.theme, finalParams.variant), vars = themeInstance.toCssVars({
        theme: finalParams.theme,
        variant: finalParams.variant,
    });
    if (!currentTheme) {
        frontData.theme.themes.push({
            theme: finalParams.theme,
            variant: finalParams.variant,
            config: themeInstance.get('.'),
        });
        if (atRule.parent.type === 'root') {
            frontData.theme.themes.at(-1).default = true;
        }
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCw4RUFBc0Q7QUFDdEQsb0VBQTZDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSwrQkFBZ0MsU0FBUSxxQkFBWTtJQUN0RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxTQUFTO2FBQ3JCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVEyQyxvREFBUztBQUNyRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxHQU1aOztJQUNHLE1BQU0sV0FBVyxtQkFDYixPQUFPLEVBQUUsU0FBUyxFQUNsQixLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsS0FBSyxJQUNULE1BQU0sQ0FDWixDQUFDO0lBRUYsZ0NBQWdDO0lBQ2hDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxzQkFBWSxFQUFFLENBQUM7SUFDN0MsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUksTUFBQSxTQUFTLENBQUMsS0FBSywwQ0FBRSxLQUFLLENBQUEsRUFBRTtRQUM5QyxXQUFXLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQ1AscURBQXFELFNBQVMsQ0FBQyxL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