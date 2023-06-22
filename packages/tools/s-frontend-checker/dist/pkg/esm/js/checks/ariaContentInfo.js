/**
 * @name            ariaContentInfo
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 *
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaContentInfo',
        name: 'Aria content info',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'A <footer> tag should exist as a top level (not inside an article, aside, main, nav or section tag)',
        level: 1,
        check({ $context }) {
            const $footer = $context.querySelectorAll('footer:not(article footer, aside footer, main footer, nav footer, section footer)');
            if (!$footer) {
                return {
                    status: 'warning',
                    message: 'Missing <footer> top level tag',
                    example: '<body>\n&nbsp;&nbsp;<footer>...</footer>\n...\n</body>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLElBQUksRUFBRSxtQkFBbUI7UUFDekIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1AscUdBQXFHO1FBQ3pHLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFO1lBQ2QsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUNyQyxtRkFBbUYsQ0FDdEYsQ0FBQztZQUVGLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1YsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUFFLGdDQUFnQztvQkFDekMsT0FBTyxFQUNILHdEQUF3RDtvQkFDNUQsUUFBUSxFQUNKLDhFQUE4RTtpQkFDckYsQ0FBQzthQUNMO1lBRUQsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUzthQUNwQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=