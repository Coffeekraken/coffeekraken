import __SInterface from '@coffeekraken/s-interface';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __STheme from '@coffeekraken/s-theme';
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
class SSugarcssPluginThemeinInterface extends __SInterface {
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
export { SSugarcssPluginThemeinInterface as interface };
export default function ({ params, atRule, replaceWith, frontData, }) {
    var _a, _b, _c;
    const finalParams = Object.assign({ variant: undefined, theme: undefined, scope: false }, params);
    // setting theme from sugar.json
    const sugarJsonInstance = new __SSugarJson();
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
    const vars = __STheme.toCssVars({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSwrQkFBZ0MsU0FBUSxZQUFZO0lBQ3RELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE9BQU87YUFDbkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFNBQVM7YUFDckI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLCtCQUErQixJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQ3hELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxHQU1aOztJQUNHLE1BQU0sV0FBVyxtQkFDYixPQUFPLEVBQUUsU0FBUyxFQUNsQixLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsS0FBSyxJQUNULE1BQU0sQ0FDWixDQUFDO0lBRUYsZ0NBQWdDO0lBQ2hDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUM3QyxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSSxNQUFBLFNBQVMsQ0FBQyxLQUFLLDBDQUFFLEtBQUssQ0FBQSxFQUFFO1FBQzlD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