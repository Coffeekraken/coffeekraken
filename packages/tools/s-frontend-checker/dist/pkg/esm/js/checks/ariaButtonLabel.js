/**
 * @name            ariaButtonLabel
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that the buttons (input[type="submit"]) have a proper descriptive value or at least an aria-label attribute
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaButtonLabel',
        name: 'Aria button label',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Check that the buttons (input[type="submit"]) have a proper descriptive value or at least an aria-label attribute',
        level: 1,
        check({ $context }) {
            var _a;
            const $buttons = Array.from((_a = $context.querySelectorAll('button, input[type="submit"], input[type="button"]')) !== null && _a !== void 0 ? _a : []);
            if ($buttons.length) {
                // @ts-ignore
                for (let [idx, $button] of $buttons.entries()) {
                    if (!$button.hasAttribute('aria-label')) {
                        const innerText = $button.innerText.trim();
                        if (innerText === '' ||
                            (innerText.split(' ') === 1 && innerText.length < 3)) {
                            return {
                                status: 'warning',
                                message: `Your \`${$button.outerHTML}\` button does not have a proper descriptive label or content`,
                                example: '<button>Send my info</button>',
                                moreLink: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                                action: {
                                    label: () => `Log them (${$buttons.length})`,
                                    handler: () => {
                                        $buttons.forEach(($button) => {
                                            console.log($button);
                                        });
                                    },
                                },
                            };
                        }
                    }
                }
            }
            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$buttons.length})`,
                    handler: () => {
                        $buttons.forEach(($button) => {
                            console.log($button);
                        });
                    },
                },
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLElBQUksRUFBRSxtQkFBbUI7UUFDekIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1AsbUhBQW1IO1FBQ3ZILEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3ZCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUNyQixvREFBb0QsQ0FDdkQsbUNBQUksRUFBRSxDQUNWLENBQUM7WUFDRixJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pCLGFBQWE7Z0JBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUU7d0JBQ3JDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQzNDLElBQ0ksU0FBUyxLQUFLLEVBQUU7NEJBQ2hCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDdEQ7NEJBQ0UsT0FBTztnQ0FDSCxNQUFNLEVBQUUsU0FBUztnQ0FDakIsT0FBTyxFQUFFLFVBQVUsT0FBTyxDQUFDLFNBQVMsK0RBQStEO2dDQUNuRyxPQUFPLEVBQUUsK0JBQStCO2dDQUN4QyxRQUFRLEVBQ0osbUVBQW1FO2dDQUN2RSxNQUFNLEVBQUU7b0NBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUNSLGFBQWEsUUFBUSxDQUFDLE1BQU0sR0FBRztvQ0FDbkMsT0FBTyxFQUFFLEdBQUcsRUFBRTt3Q0FDVixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7NENBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0NBQ3pCLENBQUMsQ0FBQyxDQUFDO29DQUNQLENBQUM7aUNBQ0o7NkJBQ0osQ0FBQzt5QkFDTDtxQkFDSjtpQkFDSjthQUNKO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUztnQkFDakIsTUFBTSxFQUFFO29CQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLFFBQVEsQ0FBQyxNQUFNLEdBQUc7b0JBQzVDLE9BQU8sRUFBRSxHQUFHLEVBQUU7d0JBQ1YsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOzRCQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN6QixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDO2lCQUNKO2FBQ0osQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9