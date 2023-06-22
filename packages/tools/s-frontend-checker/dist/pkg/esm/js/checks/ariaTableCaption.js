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
                        handler: () => {
                            $tables.forEach(($elm) => {
                                console.log($elm);
                            });
                        },
                    },
                };
            }
            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$tables.length})`,
                    handler: () => {
                        $tables.forEach(($elm) => {
                            console.log($elm);
                        });
                    },
                },
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsa0JBQWtCO1FBQ3RCLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1Asa0VBQWtFO1FBQ3RFLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3RCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDRCQUE0QixDQUFDLG1DQUFJLEVBQUUsQ0FDaEUsQ0FBQztZQUNGLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUNILDZEQUE2RDtvQkFDakUsT0FBTyxFQUNILG9EQUFvRDtvQkFDeEQsUUFBUSxFQUNKLG1FQUFtRTtvQkFDdkUsTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLE9BQU8sQ0FBQyxNQUFNLEdBQUc7d0JBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQUU7NEJBQ1YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUN0QixDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO3FCQUNKO2lCQUNKLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE1BQU0sRUFBRTtvQkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxPQUFPLENBQUMsTUFBTSxHQUFHO29CQUMzQyxPQUFPLEVBQUUsR0FBRyxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEIsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQztpQkFDSjthQUNKLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==