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
        level: 0,
        check({ $context }) {
            // @ts-ignore
            if (!$context.querySelector('meta[name="viewport"]')) {
                return {
                    status: 'error',
                    message: 'The document is missing a viewport',
                    example: '<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">',
                    moreLink: 'https://www.w3schools.com/css/css_rwd_viewport.asp',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQWtCO0lBQ3ZDLE9BQU87UUFDSCxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSxVQUFVO1FBQ2hCLFdBQVcsRUFBRSx3REFBd0Q7UUFDckUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLGFBQWE7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO2dCQUNsRCxPQUFPO29CQUNILE1BQU0sRUFBRSxPQUFPO29CQUNmLE9BQU8sRUFBRSxvQ0FBb0M7b0JBQzdDLE9BQU8sRUFDSCx1RkFBdUY7b0JBQzNGLFFBQVEsRUFDSixvREFBb0Q7aUJBQzNELENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7YUFDcEIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9