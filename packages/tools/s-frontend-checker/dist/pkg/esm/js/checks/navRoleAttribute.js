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
export default function (__SFrontendChecker) {
    return {
        id: 'navRoleAttribute',
        name: 'Nav role attribute',
        description: 'All the <nav> elements should have the "role" attribute.',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQWtCO0lBQ3ZDLE9BQU87UUFDSCxFQUFFLEVBQUUsa0JBQWtCO1FBQ3RCLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsV0FBVyxFQUFFLDBEQUEwRDtRQUN2RSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsc0JBQXNCO1FBQ25ELEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFMUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNiLE9BQU87b0JBQ0gsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLE9BQU8sRUFBRSxJQUFJO29CQUNiLE9BQU8sRUFBRSxrQ0FBa0M7b0JBQzNDLFFBQVEsRUFBRSw0Q0FBNEM7b0JBQ3RELE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxJQUFJLENBQUMsTUFBTSxHQUFHO3dCQUN4QyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7cUJBQ25DO2lCQUNKLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7YUFDcEIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9