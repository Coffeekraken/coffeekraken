import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SEventEmitterPipeSettingsInterface
 * @namespace           shared.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SEventEmitter.pipe settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SEventEmitterPipeSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            events: {
                description: 'Specify some events to pipe. Default it pipe everything using `*`',
                type: 'String',
                default: '*',
            },
            overrideEmitter: {
                description: 'Specify if the emitter of the event that will be piped has to be overrided by the instance that pipe the event',
                type: 'Boolean',
                default: false,
            },
            processor: {
                description: 'Specify a function that will be called before piping the event value. If you return only 1 value, it will set the value only, otherwise you can return an object with `value` and `metas` property to update also the metas',
                type: 'Function',
            },
            exclude: {
                description: 'Specify some event(s) to not pipe at all like `resolve`, `reject`, etc...',
                type: 'Array<String>',
                default: ['finally', 'resolve', 'reject', 'cancel', 'catch'],
            },
            filter: {
                description: 'Specify a function that will receive the value and the metas object and MUST return `true` or `false` to tell if you want to pipe this current event',
                type: 'Function',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0NBQW1DLFNBQVEsWUFBWTtJQUN4RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxtRUFBbUU7Z0JBQ3ZFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxHQUFHO2FBQ2Y7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsV0FBVyxFQUNQLGdIQUFnSDtnQkFDcEgsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLDZOQUE2TjtnQkFDak8sSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLDJFQUEyRTtnQkFDL0UsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUM7YUFDL0Q7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHNKQUFzSjtnQkFDMUosSUFBSSxFQUFFLFVBQVU7YUFDbkI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=