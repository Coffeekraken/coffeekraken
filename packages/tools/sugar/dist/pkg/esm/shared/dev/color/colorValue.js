import __SugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name            colorValue
 * @namespace            shared.dev.colors
 * @type            Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Return the list of color names you can access using the ```getColor``` function.
 * These colors are specified in the config.terminal configuration file under the "colors" property.
 *
 * @example         js
 * import colorValue from '@coffeekraken/sugar/shared/dev/color/colorValue';
 * colorValue('black'); => #000000
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function colorValue(color) {
    if (!__SugarConfig.get('dev.colors')[color]) {
        throw new Error(`[sugar.shared.dev.colors.colorValue] Sorry but the color "<yellow>${color}</yellow>" you want to get the value from does not exists... Here's the list of available colors at this time: ${Object.keys(__SugarConfig.get('dev.colors')).join(',')}`);
    }
    return __SugarConfig.get('dev.colors')[color];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUFDLEtBQUs7SUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDekMsTUFBTSxJQUFJLEtBQUssQ0FDWCxxRUFBcUUsS0FBSyxrSEFBa0gsTUFBTSxDQUFDLElBQUksQ0FDbk0sYUFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FDbEMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDaEIsQ0FBQztLQUNMO0lBQ0QsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xELENBQUMifQ==