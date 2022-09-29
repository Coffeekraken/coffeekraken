"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SRefocusFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SRefocusFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SRefocusFeatureInterface extends s_interface_1.default {
    static get _definition() {
        return {
            trigger: {
                description: 'Specify some trigger(s) on which to refocus a particular element like `event:actual`, `anchor`, `history`, etc...',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: ['event:eventName', 'anchor', 'history'],
                default: [],
            },
            timeout: {
                description: 'Specify a timeout to wait before refocus the element',
                type: 'Number',
                default: 500,
            },
            duration: {
                description: 'Specify the duration of the refocus animation',
                type: 'Number',
            },
            easing: {
                description: 'Specify the easing function of the refocus animation',
                type: 'Function',
            },
            offset: {
                description: 'Specify the offset of the refocus animation in px',
                type: 'Number',
            },
            offsetX: {
                description: 'Specify the offset x of the refocus animation in px',
                type: 'Number',
            },
            offsetY: {
                description: 'Specify the offset y of the refocus animation in px',
                type: 'Number',
            },
            align: {
                description: 'Specify the alignment of the refocus animation',
                type: 'String',
                values: ['start', 'center', 'end'],
            },
            justify: {
                description: 'Specify the justification of the refocus animation',
                type: 'String',
                values: ['start', 'center', 'end'],
            },
        };
    }
}
exports.default = SRefocusFeatureInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHdCQUF5QixTQUFRLHFCQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLG1IQUFtSDtnQkFDdkgsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7Z0JBQ2hELE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHNEQUFzRDtnQkFDMUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEdBQUc7YUFDZjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1Asc0RBQXNEO2dCQUMxRCxJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsbURBQW1EO2dCQUN2RCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AscURBQXFEO2dCQUN6RCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AscURBQXFEO2dCQUN6RCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQzthQUNyQztZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1Asb0RBQW9EO2dCQUN4RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQzthQUNyQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF4REQsMkNBd0RDIn0=