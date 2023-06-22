/**
 * @name            ariaFigureFigcaption
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that each <figure> tags have a proper <figcaption> into it
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaFigureFigcaption',
        name: 'Aria figure figcaption',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Each `<figure>` elements should have a proper `<figcaption>` into it',
        level: 1,
        check({ $context }) {
            var _a;
            const $figures = Array.from((_a = $context.querySelectorAll('figure:not(:has(> figcaption))')) !== null && _a !== void 0 ? _a : []);
            if ($figures.length) {
                return {
                    status: 'warning',
                    message: 'Your `<figure>` tags should have a proper `<figcaption>` into it',
                    example: '<figure>\n...\n<figcaption>My cool form</figcaption>\n</figure>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                    action: {
                        label: () => `Log them (${$figures.length})`,
                        handler: () => console.log($figures),
                    },
                };
            }
            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$figures.length})`,
                    handler: () => console.log($figures),
                },
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsc0JBQXNCO1FBQzFCLElBQUksRUFBRSx3QkFBd0I7UUFDOUIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1Asc0VBQXNFO1FBQzFFLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3ZCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGdDQUFnQyxDQUFDLG1DQUN2RCxFQUFFLENBQ1QsQ0FBQztZQUNGLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDakIsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUNILGtFQUFrRTtvQkFDdEUsT0FBTyxFQUNILGlFQUFpRTtvQkFDckUsUUFBUSxFQUNKLG1FQUFtRTtvQkFDdkUsTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLFFBQVEsQ0FBQyxNQUFNLEdBQUc7d0JBQzVDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztxQkFDdkM7aUJBQ0osQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUztnQkFDakIsTUFBTSxFQUFFO29CQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLFFBQVEsQ0FBQyxNQUFNLEdBQUc7b0JBQzVDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztpQkFDdkM7YUFDSixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=