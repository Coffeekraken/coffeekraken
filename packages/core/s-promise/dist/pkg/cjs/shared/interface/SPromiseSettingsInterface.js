"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class SPromiseSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            treatCancelAs: {
                description: 'Specify if a "cancel" event/call has to be treated like a "resolve", or like a "reject" a promise level',
                type: 'String',
                values: ['resolve', 'reject'],
                default: 'resolve',
            },
            destroyTimeout: {
                description: 'Specify after how many milliseconds the promise will be destroyed after a "finally" event',
                type: 'Number',
                default: 1,
            },
            preventRejectOnThrow: {
                description: 'Specify if you prefer your promise to be "resolved" when an underlying error is catched, or if is has to be rejected normally',
                type: 'Boolean',
                default: false,
            },
            emitLogErrorEventOnThrow: {
                description: 'Specify if you want a "log" of type "error" to be emitted when an underlying error is catched',
                type: 'Boolean',
                default: true,
            },
            resolveAtResolveEvent: {
                description: 'Specify if youw promise has to be resolved when catching a "resolve" event from deeper emitter',
                type: 'Boolean',
                default: false,
            },
            rejectAtRejectEvent: {
                description: 'Specify if youw promise has to be rejected when catching a "reject" event from deeper emitter',
                type: 'Boolean',
                default: false,
            },
            resolveProxies: {
                description: 'Specify some functions to be called just before resolving the promise. This function will take the current promise resolve value and must return the updated value',
                type: 'Array<Function>',
                default: [],
            },
            rejectProxies: {
                description: 'Specify some functions to be called just before rejecting the promise. This function will take the current promise resolve value and must return the updated value',
                type: 'Array<Function>',
                default: [],
            },
        };
    }
}
exports.default = SPromiseSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHlCQUEwQixTQUFRLHFCQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLHlHQUF5RztnQkFDN0csSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLFNBQVM7YUFDckI7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUNQLDJGQUEyRjtnQkFDL0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELG9CQUFvQixFQUFFO2dCQUNsQixXQUFXLEVBQ1AsK0hBQStIO2dCQUNuSSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELHdCQUF3QixFQUFFO2dCQUN0QixXQUFXLEVBQ1AsK0ZBQStGO2dCQUNuRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELHFCQUFxQixFQUFFO2dCQUNuQixXQUFXLEVBQ1AsZ0dBQWdHO2dCQUNwRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELG1CQUFtQixFQUFFO2dCQUNqQixXQUFXLEVBQ1AsK0ZBQStGO2dCQUNuRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGNBQWMsRUFBRTtnQkFDWixXQUFXLEVBQ1Asb0tBQW9LO2dCQUN4SyxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCxvS0FBb0s7Z0JBQ3hLLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBdERELDRDQXNEQyJ9