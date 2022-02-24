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