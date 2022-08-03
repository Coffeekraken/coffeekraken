/**
 * @name            title
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the title is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'title',
    name: 'Title',
    description: 'The document must contain a valid title declaration',
    level: 0,
    check({ $context }) {
        // @ts-ignore
        if (!$context.title) {
            return {
                status: 'error',
                message: 'The document is missing the title',
                example: '<title>My awesome title</title>',
                moreLink: 'https://www.w3schools.com/tags/tag_title.asp',
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILGVBQWU7SUFDWCxFQUFFLEVBQUUsT0FBTztJQUNYLElBQUksRUFBRSxPQUFPO0lBQ2IsV0FBVyxFQUFFLHFEQUFxRDtJQUNsRSxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtRQUNkLGFBQWE7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNqQixPQUFPO2dCQUNILE1BQU0sRUFBRSxPQUFPO2dCQUNmLE9BQU8sRUFBRSxtQ0FBbUM7Z0JBQzVDLE9BQU8sRUFBRSxpQ0FBaUM7Z0JBQzFDLFFBQVEsRUFBRSw4Q0FBOEM7YUFDM0QsQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9