/**
 * @name            linksTitle
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * All the "<a>" tags must have a "title" attribute
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'linksTitle',
        name: 'Links title',
        description: 'All the links <a> tags must have a "title" attribute.',
        category: __SFrontendChecker.CATEGORY_SEO,
        level: 1,
        check({ $context }) {
            var _a;
            const $a = Array.from((_a = $context.querySelectorAll('a:not([title])')) !== null && _a !== void 0 ? _a : []);
            if ($a.length) {
                return {
                    status: 'warning',
                    message: null,
                    example: '<a href="https://coffeekraken.io" title="Coffeekraken website">...</a>',
                    moreLink: 'https://www.w3schools.com/tags/tag_a.asp',
                    action: {
                        label: () => `Log them (${$a.length})`,
                        handler: () => {
                            $a.forEach(($elm) => {
                                console.log($elm);
                            });
                        },
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsWUFBWTtRQUNoQixJQUFJLEVBQUUsYUFBYTtRQUNuQixXQUFXLEVBQUUsdURBQXVEO1FBQ3BFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO1FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ2pCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLG1DQUFJLEVBQUUsQ0FDcEQsQ0FBQztZQUVGLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixPQUFPLEVBQUUsSUFBSTtvQkFDYixPQUFPLEVBQ0gsd0VBQXdFO29CQUM1RSxRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxNQUFNLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sR0FBRzt3QkFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRTs0QkFDVixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0NBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3RCLENBQUMsQ0FBQyxDQUFDO3dCQUNQLENBQUM7cUJBQ0o7aUJBQ0osQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUzthQUNwQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=