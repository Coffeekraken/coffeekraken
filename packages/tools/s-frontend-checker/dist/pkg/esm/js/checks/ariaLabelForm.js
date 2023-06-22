/**
 * @name            ariaLabelForm
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that all <label> tags contains a descriptive text or at least a valid aria-labelledby attribute
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaLabelForm',
        name: 'Aria label form',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'Check that the `<label>` tags contains a descriptive text or a valid `aria-labelledby` attribute',
        level: 1,
        check({ $context }) {
            var _a;
            const $labels = Array.from((_a = $context.querySelectorAll('label')) !== null && _a !== void 0 ? _a : []);
            if (!$labels.length) {
                return {
                    status: 'success',
                };
            }
            for (let [idx, $label] of $labels.entries()) {
                // @ts-ignore
                if (($label.querySelector('input,select,textarea') &&
                    $label.childNodes.length === 1) ||
                    ($label.hasAttribute('for') &&
                        !$context.querySelector(`#${$label.getAttribute('for')}`))) {
                    return {
                        status: 'warning',
                        message: 'A `<label>` tag must contain at least a descriptive text',
                        example: '<label>\n<input type="text" />\nEnter your name</label>',
                        moreLink: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
                        action: {
                            label: () => `Log it`,
                            handler: () => console.log($label),
                        },
                    };
                }
            }
            return {
                status: 'success',
                action: {
                    label: () => `Log them (${$labels.length})`,
                    handler: () => {
                        $labels.forEach(($label) => {
                            console.log($label);
                        });
                    },
                },
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsZUFBZTtRQUNuQixJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxzQkFBc0I7UUFDbkQsV0FBVyxFQUNQLGtHQUFrRztRQUN0RyxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTs7WUFDZCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUN0QixNQUFBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsbUNBQUksRUFBRSxDQUMzQyxDQUFDO1lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLFNBQVM7aUJBQ3BCLENBQUM7YUFDTDtZQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3pDLGFBQWE7Z0JBQ2IsSUFDSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUM7b0JBQzFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztvQkFDbkMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQzt3QkFDdkIsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUNuQixJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FDbkMsQ0FBQyxFQUNSO29CQUNFLE9BQU87d0JBQ0gsTUFBTSxFQUFFLFNBQVM7d0JBQ2pCLE9BQU8sRUFDSCwwREFBMEQ7d0JBQzlELE9BQU8sRUFDSCx5REFBeUQ7d0JBQzdELFFBQVEsRUFDSixtRUFBbUU7d0JBQ3ZFLE1BQU0sRUFBRTs0QkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUTs0QkFDckIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO3lCQUNyQztxQkFDSixDQUFDO2lCQUNMO2FBQ0o7WUFFRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixNQUFNLEVBQUU7b0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsT0FBTyxDQUFDLE1BQU0sR0FBRztvQkFDM0MsT0FBTyxFQUFFLEdBQUcsRUFBRTt3QkFDVixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7NEJBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUM7aUJBQ0o7YUFDSixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=