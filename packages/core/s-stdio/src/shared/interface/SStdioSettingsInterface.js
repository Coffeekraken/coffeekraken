import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SStdioSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SStdio settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SStdioSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            filter: {
                description: 'Specify a function that will be used to filter the logs. It will take the log object as parameter and MUST return a boolean.',
                type: 'Function'
            },
            processor: {
                description: 'Specify a function that will be used to process the logs. It will take the log object and MUST return it, updated or not...',
                type: 'Function'
            },
            defaultLogObj: {
                description: 'Specify a default log object that will be used as base for each received logs',
                type: 'Object',
                default: {}
            },
            defaultAskObj: {
                description: 'Specify a default ask object that will be used as base for each received questions (ask)',
                type: 'Object',
                default: {}
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0ZGlvU2V0dGluZ3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3RkaW9TZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLHVCQUF3QixTQUFRLFlBQVk7SUFDN0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsOEhBQThIO2dCQUMzSSxJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQUUsNkhBQTZIO2dCQUMxSSxJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQUUsK0VBQStFO2dCQUM1RixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFBRSwwRkFBMEY7Z0JBQ3ZHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=