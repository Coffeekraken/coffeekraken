import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SDocblockSettingsInterface
 * @namespace           shared.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SDocblock settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDocblockSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            filePath: {
                description: 'Specify the file path of the parsed file',
                type: 'String',
            },
            filter: {
                description: 'Specify a filter function that will be called on each docblock. If return false, the docblock will be ignored',
                type: 'Function',
            },
            filterByTag: {
                description: 'Specify a filter function by tag. This mean that this object must have as property the tagname you want to filter by, and a filter function as value',
                type: 'Object',
                default: {},
            },
            renderMarkdown: {
                description: 'Specify if you want to render the markdown inside the tag contents or not',
                type: 'Boolean',
                default: true,
            },
            markedOptions: {
                description: 'Specify some options for the marked library',
                type: 'Object',
                default: {},
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sMEJBQTJCLFNBQVEsWUFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSwwQ0FBMEM7Z0JBQ3ZELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCwrR0FBK0c7Z0JBQ25ILElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFDUCxzSkFBc0o7Z0JBQzFKLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUNQLDJFQUEyRTtnQkFDL0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLDZDQUE2QztnQkFDMUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==