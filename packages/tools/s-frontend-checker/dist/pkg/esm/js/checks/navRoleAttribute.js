/**
 * @name            navRoleAttribute
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * THe <nav> tag should have a "role" attribute
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'navRoleAttribute',
    name: 'Nav role attribute',
    description: 'All the <nav> elements should have the "role" attribute.',
    level: 1,
    check({ $context }) {
        const $nav = $context.querySelectorAll('nav:not([role])');
        if ($nav.length) {
            return {
                status: 'warning',
                message: null,
                example: '<nav role="navigation">...</nav>',
                moreLink: 'https://www.w3schools.com/tags/tag_nav.asp',
                action: {
                    label: () => `Log them (${$nav.length})`,
                    handler: () => console.log($nav),
                },
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILGVBQWU7SUFDWCxFQUFFLEVBQUUsa0JBQWtCO0lBQ3RCLElBQUksRUFBRSxvQkFBb0I7SUFDMUIsV0FBVyxFQUFFLDBEQUEwRDtJQUN2RSxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtRQUNkLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTFELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFBRSxrQ0FBa0M7Z0JBQzNDLFFBQVEsRUFBRSw0Q0FBNEM7Z0JBQ3RELE1BQU0sRUFBRTtvQkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxJQUFJLENBQUMsTUFBTSxHQUFHO29CQUN4QyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7aUJBQ25DO2FBQ0osQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9