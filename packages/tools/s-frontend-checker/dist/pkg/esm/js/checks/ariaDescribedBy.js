/**
 * @name            ariaDescribedBy
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that all the element that uses the `aria-describedby` attributes points to an existing element
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaDescribedBy',
        name: 'Aria describedby',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Check that all the element that uses the `aria-describedby` attributes points to an existing element',
        level: 1,
        check({ $context }) {
            var _a;
            const $elements = Array.from((_a = $context.querySelectorAll('[aria-describedby]')) !== null && _a !== void 0 ? _a : []);
            if ($elements.length) {
                // @ts-ignore
                for (let [idx, $elm] of $elements.entries()) {
                    if (!$context.querySelector(`#${$elm.getAttribute('aria-describedby')}`)) {
                        return {
                            status: 'warning',
                            message: 'Some `[aria-describedby]` elements points to none existant element',
                            example: null,
                            moreLink: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                            action: {
                                label: () => `Log them (${$elements.length})`,
                                handler: () => {
                                    $elements.forEach(($elm) => {
                                        console.log($elm);
                                    });
                                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1Asc0dBQXNHO1FBQzFHLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3hCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLG1DQUFJLEVBQUUsQ0FDeEQsQ0FBQztZQUVGLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsYUFBYTtnQkFDYixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUN6QyxJQUNJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FDbkIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FDOUMsRUFDSDt3QkFDRSxPQUFPOzRCQUNILE1BQU0sRUFBRSxTQUFTOzRCQUNqQixPQUFPLEVBQ0gsb0VBQW9FOzRCQUN4RSxPQUFPLEVBQUUsSUFBSTs0QkFDYixRQUFRLEVBQ0osbUVBQW1FOzRCQUN2RSxNQUFNLEVBQUU7Z0NBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsU0FBUyxDQUFDLE1BQU0sR0FBRztnQ0FDN0MsT0FBTyxFQUFFLEdBQUcsRUFBRTtvQ0FDVixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7d0NBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ3RCLENBQUMsQ0FBQyxDQUFDO2dDQUNQLENBQUM7NkJBQ0o7eUJBQ0osQ0FBQztxQkFDTDtpQkFDSjthQUNKO1lBRUQsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUzthQUNwQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=