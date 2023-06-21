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
                };
            }
            const $navsNotLabelled = $context.querySelectorAll('main:not([aria-label],[aria-labelledby])');
            if ($navsNotLabelled) {
                return {
                    status: 'warning',
                    message: 'Some <nav> tags are not labelled',
                    example: '<nav aria-label="Why Elon Musk is such a nice/bad guy">...</nav>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html',
                    action: {
                        label: () => `Log them (${$navsNotLabelled.length})`,
                        handler: () => console.log($navsNotLabelled),
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQWtCO0lBQ3ZDLE9BQU87UUFDSCxFQUFFLEVBQUUsU0FBUztRQUNiLElBQUksRUFBRSxVQUFVO1FBQ2hCLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxzQkFBc0I7UUFDbkQsV0FBVyxFQUNQLGtHQUFrRztRQUN0RyxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVoRCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNuQixPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO2lCQUNwQixDQUFDO2FBQ0w7WUFFRCxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDOUMsMENBQTBDLENBQzdDLENBQUM7WUFFRixJQUFJLGdCQUFnQixFQUFFO2dCQUNsQixPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixPQUFPLEVBQUUsa0NBQWtDO29CQUMzQyxPQUFPLEVBQ0gsa0VBQWtFO29CQUN0RSxRQUFRLEVBQ0osNkVBQTZFO29CQUNqRixNQUFNLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsZ0JBQWdCLENBQUMsTUFBTSxHQUFHO3dCQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztxQkFDL0M7aUJBQ0osQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUzthQUNwQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=