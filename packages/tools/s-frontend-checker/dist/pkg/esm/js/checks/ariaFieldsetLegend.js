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
                    action: {
                        label: () => `Log them (${$fieldsets.length})`,
                        handler: () => {
                            $fieldsets.forEach(($elm) => {
                                console.log($elm);
                            });
                        },
                    },
                };
            }
            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$fieldsets.length})`,
                    handler: () => {
                        $fieldsets.forEach(($elm) => {
                            console.log($elm);
                        });
                    },
                },
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsb0JBQW9CO1FBQ3hCLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1Asb0VBQW9FO1FBQ3hFLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3pCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDhCQUE4QixDQUFDLG1DQUFJLEVBQUUsQ0FDbEUsQ0FBQztZQUNGLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUNILGdFQUFnRTtvQkFDcEUsT0FBTyxFQUNILHVEQUF1RDtvQkFDM0QsUUFBUSxFQUNKLG1FQUFtRTtvQkFDdkUsTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLFVBQVUsQ0FBQyxNQUFNLEdBQUc7d0JBQzlDLE9BQU8sRUFBRSxHQUFHLEVBQUU7NEJBQ1YsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUN0QixDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO3FCQUNKO2lCQUNKLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE1BQU0sRUFBRTtvQkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxVQUFVLENBQUMsTUFBTSxHQUFHO29CQUM5QyxPQUFPLEVBQUUsR0FBRyxFQUFFO3dCQUNWLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEIsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQztpQkFDSjthQUNKLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==