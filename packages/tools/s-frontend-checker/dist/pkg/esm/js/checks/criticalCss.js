/**
 * @name            criticalCss
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the critical css has been injected in the page.
 * Note that this test checks if a `script` tag with the id "critical" exists...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'criticalCss',
        name: 'Critical Css',
        description: 'Check if a `style` with the id "critical" exists',
        category: __SFrontendChecker.CATEGORY_PERFORMANCE,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        check({ $context }) {
            // canonical
            const $criticalCss = $context.querySelector('style#critical');
            if (!$criticalCss) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'Your page does not have any critical css inlined',
                    example: `<style id="critical">...</style>`,
                    moreLink: 'https://web.dev/extract-critical-css/'
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFFSCxNQUFNLENBQUMsT0FBTyxXQUFXLGtCQUFxQztJQUMxRCxPQUFPO1FBQ0gsRUFBRSxFQUFFLGFBQWE7UUFDakIsSUFBSSxFQUFFLGNBQWM7UUFDcEIsV0FBVyxFQUNQLGtEQUFrRDtRQUN0RCxRQUFRLEVBQUUsa0JBQWtCLENBQUMsb0JBQW9CO1FBQ2pELEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO1FBQ3RDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLFlBQVk7WUFDWixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN2QyxnQkFBZ0IsQ0FDbkIsQ0FBQztZQUNGLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2YsT0FBTztvQkFDSCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtvQkFDdkMsT0FBTyxFQUFFLGtEQUFrRDtvQkFDM0QsT0FBTyxFQUFFLGtDQUFrQztvQkFDM0MsUUFBUSxFQUFFLHVDQUF1QztpQkFDcEQsQ0FBQzthQUNMO1lBRUQsT0FBTztnQkFDSCxNQUFNLEVBQUUsU0FBUzthQUNwQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=