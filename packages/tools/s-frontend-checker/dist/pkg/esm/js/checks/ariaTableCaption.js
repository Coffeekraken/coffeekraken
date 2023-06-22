/**
 * @name            ariaTableCaption
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that each <table> tags have a proper <legend> into it
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaTableCaption',
        name: 'Aria table caption',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Each `<table>` elements should have a proper `<caption>` into it',
        level: 1,
        check({ $context }) {
            var _a;
            const $tables = Array.from((_a = $context.querySelectorAll('table:not(:has(> caption))')) !== null && _a !== void 0 ? _a : []);
            if ($tables.length) {
                return {
                    status: 'warning',
                    message: 'Your `<table>` tags should have a proper `<legend>` into it',
                    example: '<table\n<caption>My cool table</caption>\n</table>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                    action: {
                        label: () => `Log them (${$tables.length})`,
                        handler: () => console.log($tables),
                    },
                };
            }
            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$tables.length})`,
                    handler: () => console.log($tables),
                },
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsa0JBQWtCO1FBQ3RCLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1Asa0VBQWtFO1FBQ3RFLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3RCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDRCQUE0QixDQUFDLG1DQUFJLEVBQUUsQ0FDaEUsQ0FBQztZQUNGLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUNILDZEQUE2RDtvQkFDakUsT0FBTyxFQUNILG9EQUFvRDtvQkFDeEQsUUFBUSxFQUNKLG1FQUFtRTtvQkFDdkUsTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLE9BQU8sQ0FBQyxNQUFNLEdBQUc7d0JBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztxQkFDdEM7aUJBQ0osQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUztnQkFDakIsTUFBTSxFQUFFO29CQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLE9BQU8sQ0FBQyxNQUFNLEdBQUc7b0JBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztpQkFDdEM7YUFDSixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=