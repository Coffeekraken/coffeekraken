import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SStdioSettingsInterface
 * @namespace           shared.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @platform             js
 * @status              beta
 *
 * This class represent the interface that describe SStdio settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SStdioSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            filter: {
                description: 'Specify a function that will be used to filter the logs. It will take the log object as parameter and MUST return a boolean.',
                type: 'Function',
            },
            processor: {
                description: 'Specify a function that will be used to process the logs. It will take the log object and MUST return it, updated or not...',
                type: 'Function',
            },
            defaultLogObj: {
                description: 'Specify a default log object that will be used as base for each received logs',
                type: 'Object',
                default: {},
            },
            defaultAskObj: {
                description: 'Specify a default ask object that will be used as base for each received questions (ask)',
                type: 'Object',
                default: {},
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sdUJBQXdCLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCw4SEFBOEg7Z0JBQ2xJLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCw2SEFBNkg7Z0JBQ2pJLElBQUksRUFBRSxVQUFVO2FBQ25CO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCwrRUFBK0U7Z0JBQ25GLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLDBGQUEwRjtnQkFDOUYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==