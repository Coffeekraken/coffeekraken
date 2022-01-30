import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SComponentUtilsSettingsInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SComponentUtils settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SComponentUtilsSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            interface: {
                description: 'Specify an SInterface class to use as our properties definition',
                type: 'SInterface',
            },
            style: {
                description: 'Specify a style string to use as style to inject for our component',
                type: 'String'
            },
            defaultProps: {
                description: 'Pass an object that act as the default properties value for our component',
                type: 'Object'
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzU2V0dGluZ3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29tcG9uZW50VXRpbHNTZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLGdDQUFpQyxTQUFRLFlBQVk7SUFDdEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQUUsaUVBQWlFO2dCQUM5RSxJQUFJLEVBQUUsWUFBWTthQUNyQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsb0VBQW9FO2dCQUNqRixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQUUsMkVBQTJFO2dCQUN4RixJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==