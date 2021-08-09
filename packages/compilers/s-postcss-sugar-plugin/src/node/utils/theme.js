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
    return __STheme.getTheme(theme);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7R0FVRztBQUVILE1BQU0sZUFBZSxHQUFHO0lBQ3RCLElBQUksRUFBRSxRQUFRO0lBQ2QsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO0lBQ3ZCLE9BQU8sRUFBRSxRQUFRLENBQUMsS0FBSztDQUN4QixDQUFDO0FBRUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUFDLEtBQWM7SUFDMUMsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xDLENBQUMifQ==