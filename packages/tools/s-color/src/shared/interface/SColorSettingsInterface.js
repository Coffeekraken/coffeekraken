import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SColorSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 * @platform        js
 *
 * This interface represent the settings of an SColor instance.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SColorSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            returnNewInstance: {
                description: 'Specify if the methods returns by default a new SColor instance or the same',
                type: 'boolean',
                default: false
            },
            defaultFormat: {
                description: 'Specify the default format of the color',
                type: 'String',
                values: ['hex', 'rgb', 'rgba', 'hsl', 'hsla'],
                default: 'hex'
            }
        };
    }
}
export default SColorSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yU2V0dGluZ3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29sb3JTZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSx1QkFBd0IsU0FBUSxZQUFZO0lBQzlDLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxpQkFBaUIsRUFBRTtnQkFDZixXQUFXLEVBQUUsNkVBQTZFO2dCQUMxRixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQUUseUNBQXlDO2dCQUN0RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxDQUFDO2dCQUN6QyxPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxlQUFlLHVCQUF1QixDQUFDIn0=