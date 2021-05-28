// @ts-nocheck
import __STheme from '@coffeekraken/s-theme';
/**
 * @name        themeInstance
 * @namespace      node.utils
 * @type          STheme
 *
 * Gives you access to the current theme STheme instance in order to access
 * utilities methods like loopOnColors, etc...
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const themeDefinition = {
    type: 'String',
    values: __STheme.themes,
    default: __STheme.theme
};
export { themeDefinition };
export default function theme(theme) {
    if (global._postcssSugarPluginThemeScopeMixinTheme &&
        global._postcssSugarPluginThemeScopeMixinTheme.length >= 1) {
        theme = global._postcssSugarPluginThemeScopeMixinTheme.pop();
    }
    else {
        theme = __STheme.theme;
    }
    return __STheme.getTheme(theme);
}
// // @ts-ignore
// if (!global._sTheme) global._sTheme = new __STheme();
// // @ts-ignore
// export default global._sTheme;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7R0FVRztBQUVILE1BQU0sZUFBZSxHQUFHO0lBQ3RCLElBQUksRUFBRSxRQUFRO0lBQ2QsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO0lBQ3ZCLE9BQU8sRUFBRSxRQUFRLENBQUMsS0FBSztDQUN4QixDQUFDO0FBRUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUFDLEtBQWM7SUFDMUMsSUFDRSxNQUFNLENBQUMsdUNBQXVDO1FBQzlDLE1BQU0sQ0FBQyx1Q0FBdUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUMxRDtRQUNBLEtBQUssR0FBRyxNQUFNLENBQUMsdUNBQXVDLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDOUQ7U0FBTTtRQUNMLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFFRCxnQkFBZ0I7QUFDaEIsd0RBQXdEO0FBQ3hELGdCQUFnQjtBQUNoQixpQ0FBaUMifQ==