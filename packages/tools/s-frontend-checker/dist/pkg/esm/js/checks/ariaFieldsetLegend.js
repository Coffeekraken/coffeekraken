/**
 * @name            ariaFieldsetLegend
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that each <fieldset> tags have a proper <legend> into it
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaFieldsetLegend',
        name: 'Aria fieldset legend',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Each `<fieldset>` elements should have a proper `<legend>` into it',
        level: 1,
        check({ $context }) {
            var _a;
            const $fieldsets = Array.from((_a = $context.querySelectorAll('fieldset:not(:has(> legend))')) !== null && _a !== void 0 ? _a : []);
            if ($fieldsets.length) {
                return {
                    status: 'warning',
                    message: 'Your `<fieldset>` tags should have a proper `<legend>` into it',
                    example: '<fieldset\n<legend>My cool form</legend>\n</fieldset>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                    elements: $fieldsets,
                };
            }
            return {
                status: 'success',
                elements: $fieldsets,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsb0JBQW9CO1FBQ3hCLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1Asb0VBQW9FO1FBQ3hFLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3pCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDhCQUE4QixDQUFDLG1DQUFJLEVBQUUsQ0FDbEUsQ0FBQztZQUNGLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUNILGdFQUFnRTtvQkFDcEUsT0FBTyxFQUNILHVEQUF1RDtvQkFDM0QsUUFBUSxFQUNKLG1FQUFtRTtvQkFDdkUsUUFBUSxFQUFFLFVBQVU7aUJBQ3ZCLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLFFBQVEsRUFBRSxVQUFVO2FBQ3ZCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==