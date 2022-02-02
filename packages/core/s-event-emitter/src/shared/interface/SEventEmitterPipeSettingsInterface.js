import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SEventEmitterPipeSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SEventEmitterPipeSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            events: {
                description: 'Specify some events to pipe. Default it pipe everything using `*`',
                type: 'String',
                default: '*'
            },
            overrideEmitter: {
                description: 'Specify if the emitter of the event that will be piped has to be overrided by the instance that pipe the event',
                type: 'Boolean',
                default: false
            },
            processor: {
                description: 'Specify a function that will be called before piping the event value. If you return only 1 value, it will set the value only, otherwise you can return an object with `value` and `metas` property to update also the metas',
                type: 'Function'
            },
            exclude: {
                description: 'Specify some event(s) to not pipe at all like `resolve`, `reject`, etc...',
                type: 'Array<String>',
                default: ['finally', 'resolve', 'reject', 'cancel', 'catch']
            },
            filter: {
                description: 'Specify a function that will receive the value and the metas object and MUST return `true` or `false` to tell if you want to pipe this current event',
                type: 'Function'
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V2ZW50RW1pdHRlclBpcGVTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFdmVudEVtaXR0ZXJQaXBlU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQ0FBbUMsU0FBUSxZQUFZO0lBQ3hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLG1FQUFtRTtnQkFDaEYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEdBQUc7YUFDZjtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQUUsZ0hBQWdIO2dCQUM3SCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQUUsNk5BQTZOO2dCQUMxTyxJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQUUsMkVBQTJFO2dCQUN4RixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQzthQUMvRDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsc0pBQXNKO2dCQUNuSyxJQUFJLEVBQUUsVUFBVTthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==