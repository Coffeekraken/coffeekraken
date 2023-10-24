import __SInterface from '@coffeekraken/s-interface';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSxrQ0FBbUMsU0FBUSxZQUFZO0lBQ3pELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLGtDQUFrQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzNELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsT0FBTyxFQUFFLFNBQVMsRUFDbEIsS0FBSyxFQUFFLFNBQVMsRUFDaEIsS0FBSyxFQUFFLEtBQUssSUFDVCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDNUIsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO1FBQ3hCLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTztLQUMvQixDQUFDLENBQUM7SUFFSCxNQUFNLFNBQVMsR0FBYSxFQUFFLENBQUM7SUFDL0IsSUFBSSxXQUFXLENBQUMsS0FBSztRQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxXQUFXLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUN6RSxJQUFJLFdBQVcsQ0FBQyxPQUFPO1FBQ25CLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxXQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztJQUV4RCxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtTQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO1NBQU07UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQzdCO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9