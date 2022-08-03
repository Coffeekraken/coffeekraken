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
export default {
    id: 'printStylesheet',
    name: 'Print Stylesheet',
    description: "It's a good practice to provide a print stylesheet for youor document",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILGVBQWU7SUFDWCxFQUFFLEVBQUUsaUJBQWlCO0lBQ3JCLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsV0FBVyxFQUNQLHVFQUF1RTtJQUMzRSxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLHVDQUF1QyxDQUFDLEVBQUU7WUFDbEUsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUztnQkFDakIsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsT0FBTyxFQUNILDBEQUEwRDtnQkFDOUQsUUFBUSxFQUNKLHVEQUF1RDthQUM5RCxDQUFDO1NBQ0w7UUFDRCxPQUFPO1lBQ0gsTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFDIn0=