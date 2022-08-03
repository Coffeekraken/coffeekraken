"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SEventEmitterPipeSettingsInterface extends s_interface_1.default {
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
exports.default = SEventEmitterPipeSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBR3JEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQXFCLGtDQUFtQyxTQUFRLHFCQUFZO0lBQ3hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLG1FQUFtRTtnQkFDaEYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEdBQUc7YUFDZjtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQUUsZ0hBQWdIO2dCQUM3SCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQUUsNk5BQTZOO2dCQUMxTyxJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQUUsMkVBQTJFO2dCQUN4RixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQzthQUMvRDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsc0pBQXNKO2dCQUNuSyxJQUFJLEVBQUUsVUFBVTthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE1QkQscURBNEJDIn0=