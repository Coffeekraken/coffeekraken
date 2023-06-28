/**
 * @name            ariaNav
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
        id: 'ariaNav',
        name: 'Aria nav',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'When multiple <nav> tags are used, they must have a `aria-label` or `arian-labelledby` attribute',
        level: 1,
        check({ $context }) {
            const $navs = $context.querySelectorAll('main');
            if ($navs.length <= 1) {
                return {
                    status: 'success',
                    elements: $navs,
                };
            }
            const $navsNotLabelled = $context.querySelectorAll('main:not([aria-label],[aria-labelledby])');
            if ($navsNotLabelled) {
                return {
                    status: 'warning',
                    message: 'Some <nav> tags are not labelled',
                    example: '<nav aria-label="Why Elon Musk is such a nice/bad guy">...</nav>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html',
                    elements: $navs,
                };
            }
            return {
                status: 'success',
                elements: $navs,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsU0FBUztRQUNiLElBQUksRUFBRSxVQUFVO1FBQ2hCLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxzQkFBc0I7UUFDbkQsV0FBVyxFQUNQLGtHQUFrRztRQUN0RyxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVoRCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNuQixPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixRQUFRLEVBQUUsS0FBSztpQkFDbEIsQ0FBQzthQUNMO1lBRUQsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQzlDLDBDQUEwQyxDQUM3QyxDQUFDO1lBRUYsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDbEIsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUFFLGtDQUFrQztvQkFDM0MsT0FBTyxFQUNILGtFQUFrRTtvQkFDdEUsUUFBUSxFQUNKLDZFQUE2RTtvQkFDakYsUUFBUSxFQUFFLEtBQUs7aUJBQ2xCLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2FBQ2xCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==