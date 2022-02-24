import __SInterface from '@coffeekraken/s-interface';
import __SLog from '@coffeekraken/s-log';
/**
 * @name                SEventEmitterSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SEventEmitter settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SEventEmitterSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            asyncStart: {
                description: 'Specify if you want to start the event emitting process by yourself using the `start()` method',
                type: 'Boolean',
                default: false
            },
            bufferTimeout: {
                description: 'Specify how many ms to wait when the emitter is started to emit the buffered events',
                type: 'Number',
                default: 1000
            },
            defaults: {
                description: 'Specify some default object values for events. The property define the event name (of minimatch pattern) and the value is the default that will be applied at each emit',
                type: 'Object',
                default: {}
            },
            castByEvent: {
                description: 'Specify a class by event name in which the value will be casted automatically. For example, the "log" event value is casted into an SLog instance',
                type: 'Object',
                default: {
                    log: __SLog
                }
            },
            bind: {
                description: 'Specify another object that will be used as the event emitter in the events metas. This do the same as using the `emitter.bind(...)` method',
                type: 'Object'
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlclNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0V2ZW50RW1pdHRlclNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSxnR0FBZ0c7Z0JBQzdHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFBRSxxRkFBcUY7Z0JBQ2xHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSx5S0FBeUs7Z0JBQ3RMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLG1KQUFtSjtnQkFDaEssSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFO29CQUNMLEdBQUcsRUFBRSxNQUFNO2lCQUNkO2FBQ0o7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLDZJQUE2STtnQkFDMUosSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=