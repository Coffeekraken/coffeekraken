import __sugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name            colorValue
 * @namespace            shared.dev.colors
 * @type            Function
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
    if (!__sugarConfig('dev.colors')[color]) {
        throw new Error(`[sugar.shared.dev.colors.colorValue] Sorry but the color "<yellow>${color}</yellow>" you want to get the value from does not exists... Here's the list of available colors at this time: ${Object.keys(__sugarConfig('dev.colors')).join(',')}`);
    }
    return __sugarConfig('dev.colors')[color];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvZGV2L2NvbG9yL2NvbG9yVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFFekQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVUsQ0FBQyxLQUFLO0lBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FDYixxRUFBcUUsS0FBSyxrSEFBa0gsTUFBTSxDQUFDLElBQUksQ0FDck0sYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUM1QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNkLENBQUM7S0FDSDtJQUNELE9BQU8sYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVDLENBQUMifQ==