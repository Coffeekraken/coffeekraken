/**
 * @name            ariaSearch
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that the search input is inside a role="search" container
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaSearch',
        name: 'Aria search',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'The search form should be marked with the `role="search"` attribute',
        level: 1,
        check({ $context }) {
            const $search = $context.querySelectorAll('input[type="search"]:not([role="search"] input[type="search"])');
            if (!$search) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'Search input is not inside a `role="search"` container',
                    example: '<form role="search">\n&nbsp;&nbsp;<input type="search" />\n</form>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/search.html',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $search,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsWUFBWTtRQUNoQixJQUFJLEVBQUUsYUFBYTtRQUNuQixRQUFRLEVBQUUsa0JBQWtCLENBQUMsc0JBQXNCO1FBQ25ELFdBQVcsRUFDUCxxRUFBcUU7UUFDekUsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7WUFDZCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQ3JDLGdFQUFnRSxDQUNuRSxDQUFDO1lBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDVixPQUFPO29CQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO29CQUN6QyxPQUFPLEVBQ0gsd0RBQXdEO29CQUM1RCxPQUFPLEVBQ0gsb0VBQW9FO29CQUN4RSxRQUFRLEVBQ0oseUVBQXlFO2lCQUNoRixDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO2dCQUN6QyxRQUFRLEVBQUUsT0FBTzthQUNwQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=