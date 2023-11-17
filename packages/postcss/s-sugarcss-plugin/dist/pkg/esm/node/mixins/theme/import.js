import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
class SSugarcssPluginThemeinInterface extends __SInterface {
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
export { SSugarcssPluginThemeinInterface as interface };
export default function ({ params, atRule, replaceWith, frontData, }) {
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
    const vars = __STheme
        .getTheme(finalParams.theme, finalParams.variant)
        .toCssVars({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSwrQkFBZ0MsU0FBUSxZQUFZO0lBQ3RELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLCtCQUErQixJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQ3hELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxHQU1aOztJQUNHLE1BQU0sV0FBVyxtQkFDYixPQUFPLEVBQUUsU0FBUyxFQUNsQixLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsSUFBSSxJQUNSLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDcEIsV0FBVyxDQUFDLEtBQUssR0FBRyxNQUFBLE1BQUEsU0FBUyxDQUFDLEtBQUssMENBQUUsS0FBSyxtQ0FBSSxTQUFTLENBQUM7S0FDM0Q7SUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtRQUN0QixXQUFXLENBQUMsT0FBTyxHQUFHLE1BQUEsTUFBQSxTQUFTLENBQUMsS0FBSywwQ0FBRSxPQUFPLG1DQUFJLE9BQU8sQ0FBQztLQUM3RDtJQUVELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFO1FBQ2xCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQ3hCO0lBQ0QsSUFBSSxDQUFDLENBQUEsTUFBQSxTQUFTLENBQUMsS0FBSywwQ0FBRSxNQUFNLENBQUEsRUFBRTtRQUMxQixTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7S0FDL0I7SUFDRCxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNuRCxPQUFPLENBQ0gsQ0FBQyxDQUFDLEtBQUssS0FBSyxXQUFXLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssV0FBVyxDQUFDLE9BQU8sQ0FDckUsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNmLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUN4QixLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUs7WUFDeEIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO1NBQy9CLENBQUMsQ0FBQztLQUNOO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDUCxnRUFBZ0UsV0FBVyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsT0FBTyxZQUFZLENBQ3ZILENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxRQUFRO1NBQ2hCLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUM7U0FDaEQsU0FBUyxDQUFDO1FBQ1AsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO1FBQ3hCLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTztLQUMvQixDQUFDLENBQUM7SUFFUCxNQUFNLFNBQVMsR0FBYSxFQUFFLENBQUM7SUFDL0IsSUFBSSxXQUFXLENBQUMsS0FBSztRQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxXQUFXLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUN6RSxJQUFJLFdBQVcsQ0FBQyxPQUFPO1FBQ25CLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxXQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztJQUV4RCxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtTQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO1NBQU07UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQzdCO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9