/**
 * @name            header
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if a "header" tag exists in the page or not...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'header',
    name: 'Header tag',
    description: 'It\'s recommanded to wrap your header (menu, etc...) inside a "header" tag.',
    level: 1,
    check({ $context }) {
        const $header = $context.querySelector('header:not(article header)');
        if (!$header) {
            return {
                status: 'warning',
                message: null,
                example: '<header>...</header>',
                moreLink: 'https://www.w3schools.com/tags/tag_header.asp',
                action: null,
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILGVBQWU7SUFDWCxFQUFFLEVBQUUsUUFBUTtJQUNaLElBQUksRUFBRSxZQUFZO0lBQ2xCLFdBQVcsRUFDUCw2RUFBNkU7SUFDakYsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7UUFDZCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFBRSxzQkFBc0I7Z0JBQy9CLFFBQVEsRUFBRSwrQ0FBK0M7Z0JBQ3pELE1BQU0sRUFBRSxJQUFJO2FBQ2YsQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9