"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SFiltrableInputComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SFiltrableInputComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SFiltrableInputComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            items: {
                description: 'Specify an array of items to use in your filtrable list. Can be a JSON string, a function that take an object with the "value" property and must return an array of items to use',
                type: 'String|Function',
            },
            value: {
                description: 'Specify the attribute in your items to use as a value. Can be also a function that will be called with an object containing the selected item and must return the string you want to use as value',
                type: 'String',
                default: 'value',
            },
            label: {
                description: 'Specify the attribute in your items to use as a label. Can be also a function that will be called with an object containing the selected item and must return the string you want to use as label',
                type: 'String|Function',
                default: 'value',
            },
            emptyText: {
                description: 'Specify the text to use for the default "empty" (no result) state',
                type: 'String',
                default: 'No item to display',
            },
            searchValuePreprocess: {
                description: 'Specify a function used to preprocess the value just before actually searching through the items',
                type: 'Function',
            },
            loadingText: {
                description: 'Specify the text to use for the default "loading" state',
                type: 'String',
                default: 'Loading please wait...',
            },
            filter: {
                description: 'Specify a function to use to filter the items. Must return the filtered list of items',
                type: 'Function',
            },
            filtrable: {
                description: 'Specify all the properties of your "item" to use as source for the filtrable process',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                default: [],
            },
            showKeywords: {
                description: 'Specify if you want to display the "keywords" section on top of the list results',
                type: 'Boolean',
                default: false,
            },
            templates: {
                description: 'Specify either an object with properties like "item", "empty" and "loading", or a function returning the good template depending on tne "type" argument property',
                type: 'Object|Function',
            },
            closeTimeout: {
                description: 'Specify the duration before closing the list when having selected an item',
                type: 'Number',
                default: 100,
            },
            interactive: {
                description: 'Specify if your items in the list are interactive or not to let the user click and interact with them',
                type: 'Boolean',
                default: false,
            },
            closeOnSelect: {
                description: 'Specify if you wantr to close the list when selecting an item',
                type: 'Boolean',
                default: false,
            },
            resetOnSelect: {
                description: 'Specify if you want your filtrable input to be reseted on select',
                type: 'Boolean',
                default: true,
            },
            notSelectable: {
                description: 'Specify if you want the items to be not selectable',
                type: 'Boolean',
                default: false,
            },
            maxItems: {
                description: 'Specify the maximum number of items to display at first in the list',
                type: 'Number',
                default: 25,
            },
            classes: {
                description: 'Specify some additional classes to add to the component elements',
                type: 'Object',
                default: {},
            },
            inline: {
                description: 'Specify if you want the filterable input list to be always displayed and inline in the html',
                type: 'Boolean',
                default: false,
                physical: true,
            },
        };
    }
}
exports.default = SFiltrableInputComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLGlDQUFrQyxTQUFRLHFCQUFZO0lBQ3ZFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLGtMQUFrTDtnQkFDdEwsSUFBSSxFQUFFLGlCQUFpQjthQUMxQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsbU1BQW1NO2dCQUN2TSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsT0FBTzthQUNuQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsbU1BQW1NO2dCQUN2TSxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixPQUFPLEVBQUUsT0FBTzthQUNuQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQ1AsbUVBQW1FO2dCQUN2RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsb0JBQW9CO2FBQ2hDO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ25CLFdBQVcsRUFDUCxrR0FBa0c7Z0JBQ3RHLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBd0I7YUFDcEM7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHVGQUF1RjtnQkFDM0YsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLHNGQUFzRjtnQkFDMUYsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLGtGQUFrRjtnQkFDdEYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLGtLQUFrSztnQkFDdEssSUFBSSxFQUFFLGlCQUFpQjthQUMxQjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1AsMkVBQTJFO2dCQUMvRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsR0FBRzthQUNmO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFDUCx1R0FBdUc7Z0JBQzNHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCwrREFBK0Q7Z0JBQ25FLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCxrRUFBa0U7Z0JBQ3RFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCxvREFBb0Q7Z0JBQ3hELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCxxRUFBcUU7Z0JBQ3pFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLGtFQUFrRTtnQkFDdEUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsNkZBQTZGO2dCQUNqRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFqSEQsb0RBaUhDIn0=