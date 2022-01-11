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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
            lines: {
                description: 'Specify how many lines to display at max',
                type: 'Number',
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
                type: 'String',
                default: 'toggle',
            },
            more: {
                description: 'Specify if you want to expand the more feature at start or not',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxzRUFBc0U7Z0JBQzFFLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCwwRUFBMEU7Z0JBQzlFLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQzthQUNwQjtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO2dCQUMxQixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQ1Asd05BQXdOO2dCQUM1TixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSwwQ0FBMEM7Z0JBQ3ZELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFBRSxzQ0FBc0M7Z0JBQ25ELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxXQUFXO2FBQ3ZCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFBRSxzQ0FBc0M7Z0JBQ25ELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxXQUFXO2FBQ3ZCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxRQUFRO2FBQ3BCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxnRUFBZ0U7Z0JBQ3BFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9