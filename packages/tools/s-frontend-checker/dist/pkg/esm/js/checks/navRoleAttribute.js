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
            var _a;
            const $nav = Array.from((_a = $context.querySelectorAll('nav:not([role])')) !== null && _a !== void 0 ? _a : []);
            if ($nav.length) {
                return {
                    status: 'warning',
                    message: null,
                    example: '<nav role="navigation">...</nav>',
                    moreLink: 'https://www.w3schools.com/tags/tag_nav.asp',
                    elements: $nav,
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsa0JBQWtCO1FBQ3RCLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsV0FBVyxFQUFFLDBEQUEwRDtRQUN2RSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsc0JBQXNCO1FBQ25ELEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ25CLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLG1DQUFJLEVBQUUsQ0FDckQsQ0FBQztZQUVGLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDYixPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixPQUFPLEVBQUUsSUFBSTtvQkFDYixPQUFPLEVBQUUsa0NBQWtDO29CQUMzQyxRQUFRLEVBQUUsNENBQTRDO29CQUN0RCxRQUFRLEVBQUUsSUFBSTtpQkFDakIsQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUzthQUNwQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=