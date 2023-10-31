"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class postcssSugarPluginThemeinInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginThemeinInterface;
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
    if (!currentTheme) {
        frontData.theme.themes.push({
            theme: finalParams.theme,
            variant: finalParams.variant,
        });
        if (atRule.parent.type === 'root') {
            frontData.theme.themes.at(-1).default = true;
        }
    }
    const vars = s_theme_1.default.toCssVars({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhFQUFzRDtBQUN0RCw0RUFBcUQ7QUFDckQsb0VBQTZDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSxrQ0FBbUMsU0FBUSxxQkFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxTQUFTO2FBQ3JCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVE4Qyx1REFBUztBQUN4RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxHQU1aOztJQUNHLE1BQU0sV0FBVyxtQkFDYixPQUFPLEVBQUUsU0FBUyxFQUNsQixLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsS0FBSyxJQUNULE1BQU0sQ0FDWixDQUFDO0lBRUYsZ0NBQWdDO0lBQ2hDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxzQkFBWSxFQUFFLENBQUM7SUFDN0MsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUksTUFBQSxTQUFTLENBQUMsS0FBSywwQ0FBRSxLQUFLLENBQUEsRUFBRTtRQUM5QyxXQUFXLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQ1AscURBQXFELFNBQVMsQ0FBQyxL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