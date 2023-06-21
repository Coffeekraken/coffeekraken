/**
 * @name            printStylesheet
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if a print stylesheet is defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'printStylesheet',
        name: 'Print Stylesheet',
        description: "It's a good practice to provide a print stylesheet for youor document",
        category: __SFrontendChecker.CATEGORY_NICE_TO_HAVE,
        level: 2,
        check({ $context }) {
            if (!$context.querySelector('link[rel="stylesheet"][media="print"]')) {
                return {
                    status: 'warning',
                    message: null,
                    example: '<link rel="stylesheet" media="print" href="print.css" />',
                    moreLink: 'https://www.sitepoint.com/css-printer-friendly-pages/',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQWtCO0lBQ3ZDLE9BQU87UUFDSCxFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsV0FBVyxFQUNQLHVFQUF1RTtRQUMzRSxRQUFRLEVBQUUsa0JBQWtCLENBQUMscUJBQXFCO1FBQ2xELEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFO1lBQ2QsSUFDSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUNBQXVDLENBQUMsRUFDbEU7Z0JBQ0UsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsT0FBTyxFQUNILDBEQUEwRDtvQkFDOUQsUUFBUSxFQUNKLHVEQUF1RDtpQkFDOUQsQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUzthQUNwQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=