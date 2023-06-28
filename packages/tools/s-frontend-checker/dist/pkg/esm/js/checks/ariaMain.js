/**
 * @name            ariaMain
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
        id: 'ariaMain',
        name: 'Aria main',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description: 'When multiple <main> tags are used, they must have a `aria-label` or `arian-labelledby` attribute',
        level: 1,
        check({ $context }) {
            const $mains = $context.querySelectorAll('main');
            if ($mains.length <= 1) {
                return {
                    status: 'success',
                    elements: $mains,
                };
            }
            const $mainsNotLabelled = $context.querySelectorAll('main:not([aria-label],[aria-labelledby])');
            if ($mainsNotLabelled) {
                return {
                    status: 'warning',
                    message: 'Some <main> tags are not labelled',
                    example: '<main aria-label="Why Elon Musk is such a nice/bad guy">...</main>',
                    moreLink: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/main.html',
                    elements: $mainsNotLabelled,
                };
            }
            return {
                status: 'success',
                elements: $mainsNotLabelled,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSxXQUFXO1FBQ2pCLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxzQkFBc0I7UUFDbkQsV0FBVyxFQUNQLG1HQUFtRztRQUN2RyxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVqRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNwQixPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO29CQUNqQixRQUFRLEVBQUUsTUFBTTtpQkFDbkIsQ0FBQzthQUNMO1lBRUQsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQy9DLDBDQUEwQyxDQUM3QyxDQUFDO1lBRUYsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkIsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUFFLG1DQUFtQztvQkFDNUMsT0FBTyxFQUNILG9FQUFvRTtvQkFDeEUsUUFBUSxFQUNKLHVFQUF1RTtvQkFDM0UsUUFBUSxFQUFFLGlCQUFpQjtpQkFDOUIsQ0FBQzthQUNMO1lBQ0QsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUztnQkFDakIsUUFBUSxFQUFFLGlCQUFpQjthQUM5QixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=