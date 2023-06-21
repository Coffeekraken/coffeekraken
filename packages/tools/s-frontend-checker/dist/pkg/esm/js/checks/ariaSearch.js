/**
 * @name            ariaSearch
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 *
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
                    status: 'warning',
                    message: 'Search input is not inside a `role="search"` container',
                    example: '<form role="search">\n&nbsp;&nbsp;<input type="search" />\n</form>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/search.html',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQWtCO0lBQ3ZDLE9BQU87UUFDSCxFQUFFLEVBQUUsWUFBWTtRQUNoQixJQUFJLEVBQUUsYUFBYTtRQUNuQixRQUFRLEVBQUUsa0JBQWtCLENBQUMsc0JBQXNCO1FBQ25ELFdBQVcsRUFDUCxxRUFBcUU7UUFDekUsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7WUFDZCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQ3JDLGdFQUFnRSxDQUNuRSxDQUFDO1lBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDVixPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixPQUFPLEVBQ0gsd0RBQXdEO29CQUM1RCxPQUFPLEVBQ0gsb0VBQW9FO29CQUN4RSxRQUFRLEVBQ0oseUVBQXlFO2lCQUNoRixDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==