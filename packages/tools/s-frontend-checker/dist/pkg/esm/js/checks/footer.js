/**
 * @name            footer
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if a "headfooterer" tag exists in the page or not...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'footer',
    name: 'Footer tag',
    description: 'It\'s recommanded to wrap your footer (menu, etc...) inside a "footer" tag.',
    level: 1,
    check({ $context }) {
        const $footer = $context.querySelector('footer:not(article footer)');
        if (!$footer) {
            return {
                status: 'warning',
                message: null,
                example: '<footer>...</footer>',
                moreLink: 'https://www.w3schools.com/tags/tag_footer.asp',
                action: null,
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILGVBQWU7SUFDWCxFQUFFLEVBQUUsUUFBUTtJQUNaLElBQUksRUFBRSxZQUFZO0lBQ2xCLFdBQVcsRUFDUCw2RUFBNkU7SUFDakYsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7UUFDZCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFBRSxzQkFBc0I7Z0JBQy9CLFFBQVEsRUFBRSwrQ0FBK0M7Z0JBQ3pELE1BQU0sRUFBRSxJQUFJO2FBQ2YsQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9