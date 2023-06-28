/**
 * @name            viewport
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the viewport is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'viewport',
        name: 'Viewport',
        description: 'The document must contain a valid viewport declaration',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        check({ $context }) {
            const $viewport = $context.querySelector('meta[name="viewport"]');
            // @ts-ignore
            if (!$viewport) {
                return {
                    status: 'error',
                    message: 'The document is missing a viewport',
                    example: '<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">',
                    moreLink: 'https://www.w3schools.com/css/css_rwd_viewport.asp',
                };
            }
            return {
                status: 'success',
                elements: $context,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSxVQUFVO1FBQ2hCLFdBQVcsRUFBRSx3REFBd0Q7UUFDckUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtRQUN0QyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7WUFDZCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDbEUsYUFBYTtZQUNiLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ1osT0FBTztvQkFDSCxNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQUUsb0NBQW9DO29CQUM3QyxPQUFPLEVBQ0gsdUZBQXVGO29CQUMzRixRQUFRLEVBQ0osb0RBQW9EO2lCQUMzRCxDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixRQUFRLEVBQUUsUUFBUTthQUNyQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=