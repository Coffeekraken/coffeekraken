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
                    moreLink: 'https://web.dev/extract-critical-css/',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $criticalCss,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFFSCxNQUFNLENBQUMsT0FBTyxXQUFXLGtCQUFxQztJQUMxRCxPQUFPO1FBQ0gsRUFBRSxFQUFFLGFBQWE7UUFDakIsSUFBSSxFQUFFLGNBQWM7UUFDcEIsV0FBVyxFQUFFLGtEQUFrRDtRQUMvRCxRQUFRLEVBQUUsa0JBQWtCLENBQUMsb0JBQW9CO1FBQ2pELEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO1FBQ3RDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLFlBQVk7WUFDWixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDZixPQUFPO29CQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO29CQUN2QyxPQUFPLEVBQUUsa0RBQWtEO29CQUMzRCxPQUFPLEVBQUUsa0NBQWtDO29CQUMzQyxRQUFRLEVBQUUsdUNBQXVDO2lCQUNwRCxDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO2dCQUN6QyxRQUFRLEVBQUUsWUFBWTthQUN6QixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=