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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function colorValue(color) {
    if (!__SugarConfig.get('dev.colors')[color]) {
        throw new Error(`[sugar.shared.dev.colors.colorValue] Sorry but the color "<yellow>${color}</yellow>" you want to get the value from does not exists... Here's the list of available colors at this time: ${Object.keys(__SugarConfig.get('dev.colors')).join(',')}`);
    }
    return __SugarConfig.get('dev.colors')[color];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbG9yVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQUMsS0FBSztJQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN6QyxNQUFNLElBQUksS0FBSyxDQUNYLHFFQUFxRSxLQUFLLGtIQUFrSCxNQUFNLENBQUMsSUFBSSxDQUNuTSxhQUFhLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUNsQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNoQixDQUFDO0tBQ0w7SUFDRCxPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEQsQ0FBQyJ9