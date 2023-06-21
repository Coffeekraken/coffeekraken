/**
 * @name            ariaComplementary
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * When multiple <main> tags are present, check that all are labelled
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'ariaComplementary',
        name: 'Aria complementary',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'When multiple <main> tags are used, they must have a `aria-label` or `arian-labelledby` attribute',
        level: 1,
        check({ $context }) {
            const $asides = $context.querySelectorAll('aside');
            if ($asides.length <= 1) {
                return {
                    status: 'success',
                };
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQWtCO0lBQ3ZDLE9BQU87UUFDSCxFQUFFLEVBQUUsbUJBQW1CO1FBQ3ZCLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtRQUNuRCxXQUFXLEVBQ1AsbUdBQW1HO1FBQ3ZHLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFO1lBQ2QsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRW5ELElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLFNBQVM7aUJBQ3BCLENBQUM7YUFDTDtZQUVELE1BQU0sa0JBQWtCLEdBQ3BCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRW5ELElBQUksa0JBQWtCLEVBQUU7Z0JBQ3BCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLE9BQU8sRUFBRSxvQ0FBb0M7b0JBQzdDLE9BQU8sRUFDSCxzRUFBc0U7b0JBQzFFLFFBQVEsRUFDSixnRkFBZ0Y7b0JBQ3BGLE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxrQkFBa0IsQ0FBQyxNQUFNLEdBQUc7d0JBQ3RELE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO3FCQUNqRDtpQkFDSixDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==