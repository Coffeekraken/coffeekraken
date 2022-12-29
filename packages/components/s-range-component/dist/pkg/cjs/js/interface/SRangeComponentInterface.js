"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SRangeComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SRangeComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SRangeComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                type: 'String',
                description: 'Specify the name to assign to the internal input[type="range"]',
            },
            value: {
                type: 'Number',
                description: 'Specify the initial range value',
            },
            values: {
                type: 'Object',
                description: 'Specify some values in array like ["hello","world"] that will be used for tooltip. Your range steps MUST be integers for this to work properly',
            },
            min: {
                type: 'Number',
                description: 'Specify the minimal value or the range',
                default: 0,
            },
            max: {
                type: 'Number',
                description: 'Specify the maximal value of the range',
                default: 100,
            },
            step: {
                type: 'Number',
                description: 'Specify the steps between each values',
            },
            target: {
                type: 'String',
                description: 'Specify a css selector of any HTMLElement or HTMLInputElement in which to inject the value when the range is updated',
            },
            tooltip: {
                type: 'Boolean',
                description: 'Specify if you want to display the value inside a tooltip on top of the thumb',
                default: false,
            },
            disabled: {
                type: 'Boolean',
                description: 'Specify if this range is disabled',
                default: false,
            },
        };
    }
}
exports.default = SRangeComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHdCQUF5QixTQUFRLHFCQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLGdFQUFnRTthQUN2RTtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsaUNBQWlDO2FBQ2pEO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxnSkFBZ0o7YUFDdko7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLHdDQUF3QztnQkFDckQsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsd0NBQXdDO2dCQUNyRCxPQUFPLEVBQUUsR0FBRzthQUNmO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSx1Q0FBdUM7YUFDdkQ7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLHNIQUFzSDthQUM3SDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1AsK0VBQStFO2dCQUNuRixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsbUNBQW1DO2dCQUNoRCxPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFqREQsMkNBaURDIn0=