/**
 * @name            ariaDescribeBy
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
        description: 'Check that all the element that uses the `aria-describeby` attributes points to an existing element',
        level: 1,
        check({ $context }) {
            var _a;
            const $elements = Array.from((_a = $context.querySelectorAll('[aria-describedby]]')) !== null && _a !== void 0 ? _a : []);
            const $asidesNotLabelled = $context.querySelectorAll('aside:not([role])');
            if ($asidesNotLabelled) {
                return {
                    status: 'warning',
                    message: 'Some <aside> tags are not labelled',
                    example: '<aside aria-label="Why Elon Musk is such a nice/bad guy">...</aside>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/complementary.html',
                    action: {
                        label: () => `Log them (${$asidesNotLabelled.length})`,
                        handler: () => console.log($asidesNotLabelled),
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQWtCO0lBQ3ZDLE9BQU87UUFDSCxFQUFFLEVBQUUsaUJBQWlCO1FBQ3JCLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1AscUdBQXFHO1FBQ3pHLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFOztZQUNkLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3hCLE1BQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLG1DQUFJLEVBQUUsQ0FDekQsQ0FBQztZQUVGLE1BQU0sa0JBQWtCLEdBQ3BCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRW5ELElBQUksa0JBQWtCLEVBQUU7Z0JBQ3BCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLE9BQU8sRUFBRSxvQ0FBb0M7b0JBQzdDLE9BQU8sRUFDSCxzRUFBc0U7b0JBQzFFLFFBQVEsRUFDSixnRkFBZ0Y7b0JBQ3BGLE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxrQkFBa0IsQ0FBQyxNQUFNLEdBQUc7d0JBQ3RELE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO3FCQUNqRDtpQkFDSixDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==