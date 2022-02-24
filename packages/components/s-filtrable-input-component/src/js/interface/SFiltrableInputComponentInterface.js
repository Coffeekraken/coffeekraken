import __SInterface from '@coffeekraken/s-interface';
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
export default class SFiltrableInputComponentInterface extends __SInterface {
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
            filterItems: {
                description: 'Specify a function to use to filter the items. Must return the filtered list of items',
                type: 'Function'
            },
            filtrable: {
                description: 'Specify all the properties of your "item" to use as source for the filtrable process',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                default: [],
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
                default: false
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
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8saUNBQWtDLFNBQVEsWUFBWTtJQUN2RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxrTEFBa0w7Z0JBQ3RMLElBQUksRUFBRSxpQkFBaUI7YUFDMUI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLG1NQUFtTTtnQkFDdk0sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE9BQU87YUFDbkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLG1NQUFtTTtnQkFDdk0sSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsT0FBTyxFQUFFLE9BQU87YUFDbkI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLG1FQUFtRTtnQkFDdkUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLG9CQUFvQjthQUNoQztZQUNELHFCQUFxQixFQUFFO2dCQUNuQixXQUFXLEVBQUUsa0dBQWtHO2dCQUMvRyxJQUFJLEVBQUUsVUFBVTthQUNuQjtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQXdCO2FBQ3BDO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFBRSx1RkFBdUY7Z0JBQ3BHLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxzRkFBc0Y7Z0JBQzFGLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxrS0FBa0s7Z0JBQ3RLLElBQUksRUFBRSxpQkFBaUI7YUFDMUI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLDJFQUEyRTtnQkFDL0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEdBQUc7YUFDZjtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AsdUdBQXVHO2dCQUMzRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQUUsK0RBQStEO2dCQUM1RSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQ1Asb0RBQW9EO2dCQUN4RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQ1AscUVBQXFFO2dCQUN6RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9