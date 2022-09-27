import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SCodeExampleComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SCodeExampleComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCodeExampleComponentInterface extends __SInterface {
    static get _definition() {
        return {
            active: {
                description: 'Specify which "tab" is active in case of multiple languages examples',
                type: 'String',
            },
            toolbar: {
                description: 'Specify what you want in the toolbar. Currently available item is "copy"',
                type: 'Array<String>',
                values: ['copy'],
                default: ['copy'],
            },
            toolbarPosition: {
                description: 'Specify the toolbar position. Can be "content" or "nav"',
                type: 'String',
                values: ['content', 'nav'],
                default: 'nav',
            },
            languages: {
                description: 'Specify some languages that you want to support. Must be "[key]: language" object syntax. See [highlight.js doc](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) for supported languages',
                type: 'Object',
                default: {},
            },
            items: {
                description: 'Specify the items to put in your code example',
                type: 'Object[]',
                default: [],
            },
            lines: {
                description: 'Specify how many lines to display at max',
                type: 'Number',
                default: 15,
                physical: true,
            },
            moreLabel: {
                description: 'Specify the "show more" button label',
                type: 'String',
                default: 'Show more',
            },
            lessLabel: {
                description: 'Specigy the "show less" button label',
                type: 'String',
                default: 'Show less',
            },
            moreAction: {
                description: 'Specify the action to execute when click on the "more" button. Currently available action is "toggle"',
                values: ['toggle'],
                type: 'String',
                default: 'toggle',
            },
            more: {
                description: 'Specify if you want to expand the more feature at start or not',
                type: 'Boolean',
                default: false,
            },
            scrollOnMore: {
                description: 'Specify if you want to scroll to the code when clicking on the "show more/less" button',
                type: 'Boolean',
                default: true,
            },
            scrollToSettings: {
                description: 'Specify some scrollTo settings',
                type: 'Object',
                default: {},
            },
            cssDeps: {
                description: 'Specify some css url(s) or link tag id(s) to inject into the shadowRoot of the component',
                type: 'String[]',
                default: [],
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxzRUFBc0U7Z0JBQzFFLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCwwRUFBMEU7Z0JBQzlFLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQzthQUNwQjtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO2dCQUMxQixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQ1Asd05BQXdOO2dCQUM1TixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSwrQ0FBK0M7Z0JBQzVELElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSwwQ0FBMEM7Z0JBQ3ZELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFBRSxzQ0FBc0M7Z0JBQ25ELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxXQUFXO2FBQ3ZCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFBRSxzQ0FBc0M7Z0JBQ25ELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxXQUFXO2FBQ3ZCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCx1R0FBdUc7Z0JBQzNHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDbEIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLGdFQUFnRTtnQkFDcEUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLHdGQUF3RjtnQkFDNUYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxXQUFXLEVBQUUsZ0NBQWdDO2dCQUM3QyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCwwRkFBMEY7Z0JBQzlGLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsRUFBRTthQUNkO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9