import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           apply
 * @namespace      node.mixin.theme
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin simply apply a theme in the desired scope
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.theme.apply($1)
 *
 * @example        css
 * \@sugar.theme.apply(light);
 * .my-cool-element {
 *    \@sugar.theme.apply(dark);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginThemeinInterface extends __SInterface {
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
                default: false,
            },
        };
    }
}
export { postcssSugarPluginThemeinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ variant: undefined, theme: undefined, scope: false }, params);
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
        vars.push(`@sugar.lnf.base;`);
        vars.push('}');
    }
    else if (atRule.parent.type === 'root') {
        vars.unshift('body {');
        vars.push(`@sugar.lnf.base;`);
        vars.push('}');
    }
    else {
        vars.push(`@sugar.lnf.base;`);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7SUFDekQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRRCxPQUFPLEVBQUUsa0NBQWtDLElBQUksU0FBUyxFQUFFLENBQUM7QUFDM0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixPQUFPLEVBQUUsU0FBUyxFQUNsQixLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsS0FBSyxJQUNULE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUM1QixLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUs7UUFDeEIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO0tBQy9CLENBQUMsQ0FBQztJQUVILE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztJQUMvQixJQUFJLFdBQVcsQ0FBQyxLQUFLO1FBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ3pFLElBQUksV0FBVyxDQUFDLE9BQU87UUFDbkIsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLFdBQVcsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO0lBRXhELElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7U0FBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO1NBQU07UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDakM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=