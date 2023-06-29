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
            var _a, _b;
            const $buttons = Array.from((_a = $context.querySelectorAll('button, input[type="submit"], input[type="button"]')) !== null && _a !== void 0 ? _a : []);
            if ($buttons.length) {
                // @ts-ignore
                for (let [idx, $button] of $buttons.entries()) {
                    if (!$button.hasAttribute('aria-label')) {
                        const label = (_b = $button.getAttribute('value')) !== null && _b !== void 0 ? _b : $button.label.trim();
                        if (label === '' ||
                            (label.split(' ') === 1 && label.length < 3)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLElBQUksRUFBRSxtQkFBbUI7UUFDekIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1AsbUhBQW1IO1FBQ3ZILEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3ZCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUNyQixvREFBb0QsQ0FDdkQsbUNBQUksRUFBRSxDQUNWLENBQUM7WUFDRixJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pCLGFBQWE7Z0JBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUU7d0JBQ3JDLE1BQU0sS0FBSyxHQUNQLE1BQUEsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsbUNBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ3pCLElBQ0ksS0FBSyxLQUFLLEVBQUU7NEJBQ1osQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUM5Qzs0QkFDRSxPQUFPO2dDQUNILE1BQU0sRUFBRSxTQUFTO2dDQUNqQixPQUFPLEVBQUUsVUFBVSxPQUFPLENBQUMsU0FBUywrREFBK0Q7Z0NBQ25HLE9BQU8sRUFBRSwrQkFBK0I7Z0NBQ3hDLFFBQVEsRUFDSixtRUFBbUU7Z0NBQ3ZFLE1BQU0sRUFBRTtvQ0FDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQ1IsYUFBYSxRQUFRLENBQUMsTUFBTSxHQUFHO29DQUNuQyxPQUFPLEVBQUUsR0FBRyxFQUFFO3dDQUNWLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs0Q0FDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3Q0FDekIsQ0FBQyxDQUFDLENBQUM7b0NBQ1AsQ0FBQztpQ0FDSjs2QkFDSixDQUFDO3lCQUNMO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixNQUFNLEVBQUU7b0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsUUFBUSxDQUFDLE1BQU0sR0FBRztvQkFDNUMsT0FBTyxFQUFFLEdBQUcsRUFBRTt3QkFDVixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7NEJBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3pCLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUM7aUJBQ0o7YUFDSixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=