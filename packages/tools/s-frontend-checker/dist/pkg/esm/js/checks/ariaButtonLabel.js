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
            var _a, _b, _c, _d;
            const $buttons = Array.from((_a = $context.querySelectorAll('button, input[type="submit"], input[type="button"]')) !== null && _a !== void 0 ? _a : []);
            if ($buttons.length) {
                // @ts-ignore
                for (let [idx, $button] of $buttons.entries()) {
                    if (!$button.hasAttribute('aria-label')) {
                        const label = (_d = (_b = $button.getAttribute('value')) !== null && _b !== void 0 ? _b : (_c = $button.getAttribute('label')) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : '';
                        if (label === '' ||
                            (label.split(' ') === 1 && label.length < 3)) {
                            return {
                                status: __SFrontendChecker.STATUS_WARNING,
                                message: `Your \`${$button.outerHTML}\` button does not have a proper descriptive label or content`,
                                example: '<button>Send my info</button>',
                                moreLink: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                            };
                        }
                    }
                }
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLElBQUksRUFBRSxtQkFBbUI7UUFDekIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1AsbUhBQW1IO1FBQ3ZILEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3ZCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUNyQixvREFBb0QsQ0FDdkQsbUNBQUksRUFBRSxDQUNWLENBQUM7WUFDRixJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pCLGFBQWE7Z0JBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUU7d0JBQ3JDLE1BQU0sS0FBSyxHQUNQLE1BQUEsTUFBQSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxtQ0FDN0IsTUFBQSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQywwQ0FBRSxJQUFJLEVBQUUsbUNBQ3JDLEVBQUUsQ0FBQzt3QkFDUCxJQUNJLEtBQUssS0FBSyxFQUFFOzRCQUNaLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDOUM7NEJBQ0UsT0FBTztnQ0FDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsY0FBYztnQ0FDekMsT0FBTyxFQUFFLFVBQVUsT0FBTyxDQUFDLFNBQVMsK0RBQStEO2dDQUNuRyxPQUFPLEVBQUUsK0JBQStCO2dDQUN4QyxRQUFRLEVBQ0osbUVBQW1FOzZCQUMxRSxDQUFDO3lCQUNMO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO2FBQzVDLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==