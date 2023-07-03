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
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'Your `<table>` tags should have a proper `<legend>` into it',
                    example: '<table\n<caption>My cool table</caption>\n</table>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                    elements: $tables,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $tables,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsa0JBQWtCO1FBQ3RCLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1Asa0VBQWtFO1FBQ3RFLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3RCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDRCQUE0QixDQUFDLG1DQUFJLEVBQUUsQ0FDaEUsQ0FBQztZQUNGLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsT0FBTztvQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYztvQkFDekMsT0FBTyxFQUNILDZEQUE2RDtvQkFDakUsT0FBTyxFQUNILG9EQUFvRDtvQkFDeEQsUUFBUSxFQUNKLG1FQUFtRTtvQkFDdkUsUUFBUSxFQUFFLE9BQU87aUJBQ3BCLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLGNBQWM7Z0JBQ3pDLFFBQVEsRUFBRSxPQUFPO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==