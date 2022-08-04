/**
 * @name            author
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the author is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'author',
    name: 'Author',
    description: 'The document must contain a valid author declaration',
    level: 1,
    check({ $context }) {
        if (!$context.querySelector('head meta[name="author"]')) {
            return {
                status: 'error',
                message: 'The document is missing an author',
                example: '<meta name="author" content="Olivier Bossel">',
                moreLink: 'https://www.w3schools.com/tags/tag_meta.asp',
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILGVBQWU7SUFDWCxFQUFFLEVBQUUsUUFBUTtJQUNaLElBQUksRUFBRSxRQUFRO0lBQ2QsV0FBVyxFQUFFLHNEQUFzRDtJQUNuRSxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLEVBQUU7WUFDckQsT0FBTztnQkFDSCxNQUFNLEVBQUUsT0FBTztnQkFDZixPQUFPLEVBQUUsbUNBQW1DO2dCQUM1QyxPQUFPLEVBQUUsK0NBQStDO2dCQUN4RCxRQUFRLEVBQUUsNkNBQTZDO2FBQzFELENBQUM7U0FDTDtRQUNELE9BQU87WUFDSCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUMifQ==