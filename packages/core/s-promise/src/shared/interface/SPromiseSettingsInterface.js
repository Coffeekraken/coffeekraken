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
                description: 'Specify if a "cancel" event/call has to be treated like a "resolve", or like a "reject" a promise level',
                type: 'String',
                values: ['resolve', 'reject'],
                default: 'resolve'
            },
            destroyTimeout: {
                description: 'Specify after how many milliseconds the promise will be destroyed after a "finally" event',
                type: 'Number',
                default: 1
            },
            preventRejectOnThrow: {
                description: 'Specify if you prefer your promise to be "resolved" when an underlying error is catched, or if is has to be rejected normally',
                type: 'Boolean',
                default: true
            },
            emitLogErrorEventOnThrow: {
                description: 'Specify if you want a "log" of type "error" to be emitted when an underlying error is catched',
                type: 'Boolean',
                default: true
            },
            resolveAtResolveEvent: {
                description: 'Specify if youw promise has to be resolved when catching a "resolve" event from deeper emitter',
                type: 'Boolean',
                default: false
            },
            rejectAtRejectEvent: {
                description: 'Specify if youw promise has to be rejected when catching a "reject" event from deeper emitter',
                type: 'Boolean',
                default: false
            },
            resolveProxies: {
                description: 'Specify some functions to be called just before resolving the promise. This function will take the current promise resolve value and must return the updated value',
                type: 'Array<Function>',
                default: []
            },
            rejectProxies: {
                description: 'Specify some functions to be called just before rejecting the promise. This function will take the current promise resolve value and must return the updated value',
                type: 'Array<Function>',
                default: []
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb21pc2VTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9taXNlU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyx5QkFBMEIsU0FBUSxZQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSixhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLHlHQUF5RztnQkFDdEgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLFNBQVM7YUFDckI7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLDJGQUEyRjtnQkFDeEcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELG9CQUFvQixFQUFFO2dCQUNsQixXQUFXLEVBQUUsK0hBQStIO2dCQUM1SSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELHdCQUF3QixFQUFFO2dCQUN0QixXQUFXLEVBQUUsK0ZBQStGO2dCQUM1RyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELHFCQUFxQixFQUFFO2dCQUNuQixXQUFXLEVBQUUsZ0dBQWdHO2dCQUM3RyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNoQjtZQUNELG1CQUFtQixFQUFFO2dCQUNsQixXQUFXLEVBQUUsK0ZBQStGO2dCQUM1RyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNoQjtZQUNELGNBQWMsRUFBRTtnQkFDWixXQUFXLEVBQUUsb0tBQW9LO2dCQUNqTCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFBRSxvS0FBb0s7Z0JBQ2pMLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=