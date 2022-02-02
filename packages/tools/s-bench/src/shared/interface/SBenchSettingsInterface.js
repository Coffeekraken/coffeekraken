// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SBenchSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform            js
 * @platform             node
 *
 * This interface represent the SBench settings.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SBenchSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            title: {
                description: 'Specify a title for your bench that will be used in the log',
                type: 'String'
            },
            body: {
                description: 'Specify a body for your bench that will be used in the log',
                type: 'String'
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JlbmNoU2V0dGluZ3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmVuY2hTZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLHVCQUF3QixTQUFRLFlBQVk7SUFDN0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsNkRBQTZEO2dCQUMxRSxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQUUsNERBQTREO2dCQUN6RSxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==