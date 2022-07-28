import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SPromiseSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SPromise settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SPromiseSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            treatCancelAs: {
                description:
                    'Specify if a "cancel" event/call has to be treated like a "resolve", or like a "reject" a promise level',
                type: 'String',
                values: ['resolve', 'reject'],
                default: 'resolve',
            },
            destroyTimeout: {
                description:
                    'Specify after how many milliseconds the promise will be destroyed after a "finally" event',
                type: 'Number',
                default: 1,
            },
            preventRejectOnThrow: {
                description:
                    'Specify if you prefer your promise to be "resolved" when an underlying error is catched, or if is has to be rejected normally',
                type: 'Boolean',
                default: false,
            },
            emitLogErrorEventOnThrow: {
                description:
                    'Specify if you want a "log" of type "error" to be emitted when an underlying error is catched',
                type: 'Boolean',
                default: true,
            },
            resolveAtResolveEvent: {
                description:
                    'Specify if youw promise has to be resolved when catching a "resolve" event from deeper emitter',
                type: 'Boolean',
                default: false,
            },
            rejectAtRejectEvent: {
                description:
                    'Specify if youw promise has to be rejected when catching a "reject" event from deeper emitter',
                type: 'Boolean',
                default: false,
            },
            resolveProxies: {
                description:
                    'Specify some functions to be called just before resolving the promise. This function will take the current promise resolve value and must return the updated value',
                type: 'Array<Function>',
                default: [],
            },
            rejectProxies: {
                description:
                    'Specify some functions to be called just before rejecting the promise. This function will take the current promise resolve value and must return the updated value',
                type: 'Array<Function>',
                default: [],
            },
        };
    }
}
