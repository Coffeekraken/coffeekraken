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
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'Your `<figure>` tags should have a proper `<figcaption>` into it',
                    example: '<figure>\n...\n<figcaption>My cool form</figcaption>\n</figure>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                    elements: $figures,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $figures,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsc0JBQXNCO1FBQzFCLElBQUksRUFBRSx3QkFBd0I7UUFDOUIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1Asc0VBQXNFO1FBQzFFLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3ZCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGdDQUFnQyxDQUFDLG1DQUN2RCxFQUFFLENBQ1QsQ0FBQztZQUNGLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDakIsT0FBTztvQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYztvQkFDekMsT0FBTyxFQUNILGtFQUFrRTtvQkFDdEUsT0FBTyxFQUNILGlFQUFpRTtvQkFDckUsUUFBUSxFQUNKLG1FQUFtRTtvQkFDdkUsUUFBUSxFQUFFLFFBQVE7aUJBQ3JCLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLGNBQWM7Z0JBQ3pDLFFBQVEsRUFBRSxRQUFRO2FBQ3JCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==