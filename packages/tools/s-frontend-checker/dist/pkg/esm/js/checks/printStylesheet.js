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
            const $printStyle = $context.querySelector('link[rel="stylesheet"][media="print"]');
            if (!$printStyle) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'Your page does not provide any `print` stylesheet',
                    example: '<link rel="stylesheet" media="print" href="print.css" />',
                    moreLink: 'https://www.sitepoint.com/css-printer-friendly-pages/',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $printStyle,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsV0FBVyxFQUNQLHVFQUF1RTtRQUMzRSxRQUFRLEVBQUUsa0JBQWtCLENBQUMscUJBQXFCO1FBQ2xELEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFO1lBQ2QsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdEMsdUNBQXVDLENBQzFDLENBQUM7WUFFRixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNkLE9BQU87b0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLGNBQWM7b0JBQ3pDLE9BQU8sRUFDSCxtREFBbUQ7b0JBQ3ZELE9BQU8sRUFDSCwwREFBMEQ7b0JBQzlELFFBQVEsRUFDSix1REFBdUQ7aUJBQzlELENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLGNBQWM7Z0JBQ3pDLFFBQVEsRUFBRSxXQUFXO2FBQ3hCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==