"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
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
class SEventEmitterSettingsInterface extends s_interface_1.default {
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
                    log: s_log_1.default
                }
            },
            bind: {
                description: 'Specify another object that will be used as the event emitter in the events metas. This do the same as using the `emitter.bind(...)` method',
                type: 'Object'
            }
        };
    }
}
exports.default = SEventEmitterSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGdFQUF5QztBQUV6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFxQiw4QkFBK0IsU0FBUSxxQkFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSxnR0FBZ0c7Z0JBQzdHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFBRSxxRkFBcUY7Z0JBQ2xHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSx5S0FBeUs7Z0JBQ3RMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLG1KQUFtSjtnQkFDaEssSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFO29CQUNMLEdBQUcsRUFBRSxlQUFNO2lCQUNkO2FBQ0o7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLDZJQUE2STtnQkFDMUosSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBL0JELGlEQStCQyJ9