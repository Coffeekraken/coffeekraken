/**
 * @name            ariaLabelledBy
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that all the element that uses the `aria-labelledby` attributes points to an existing element
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaLabelledBy',
        name: 'Aria labelledby',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Check that all the element that uses the `aria-labelledby` attributes points to an existing element',
        level: 1,
        check({ $context }) {
            var _a;
            const $elements = Array.from((_a = $context.querySelectorAll('[aria-labelledby]')) !== null && _a !== void 0 ? _a : []);
            if ($elements.length) {
                // @ts-ignore
                for (let [idx, $elm] of $elements.entries()) {
                    if (!$context.querySelector(`#${$elm.getAttribute('aria-labelledby')}`)) {
                        return {
                            status: 'warning',
                            message: 'Some `[aria-labelledby]` elements points to none existant element',
                            example: null,
                            moreLink: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                            action: {
                                label: () => `Log them (${$elements.length})`,
                                handler: () => console.log($elements),
                            },
                        };
                    }
                }
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsZ0JBQWdCO1FBQ3BCLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1AscUdBQXFHO1FBQ3pHLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3hCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLG1DQUFJLEVBQUUsQ0FDdkQsQ0FBQztZQUVGLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsYUFBYTtnQkFDYixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUN6QyxJQUNJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FDbkIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FDN0MsRUFDSDt3QkFDRSxPQUFPOzRCQUNILE1BQU0sRUFBRSxTQUFTOzRCQUNqQixPQUFPLEVBQ0gsbUVBQW1FOzRCQUN2RSxPQUFPLEVBQUUsSUFBSTs0QkFDYixRQUFRLEVBQ0osbUVBQW1FOzRCQUN2RSxNQUFNLEVBQUU7Z0NBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsU0FBUyxDQUFDLE1BQU0sR0FBRztnQ0FDN0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDOzZCQUN4Qzt5QkFDSixDQUFDO3FCQUNMO2lCQUNKO2FBQ0o7WUFFRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==