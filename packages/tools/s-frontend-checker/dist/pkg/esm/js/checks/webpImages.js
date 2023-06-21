/**
 * @name            webpImages
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if a print stylesheet is defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'webpImages',
        name: 'Webp for images',
        description: "Consider using the 'webp' extension for images to improve the performances of your website",
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 2,
        check({ $context }) {
            const $nonWebpImages = $context.querySelectorAll('img:not([src*=".webp"])');
            if ($nonWebpImages.length) {
                return {
                    status: 'warning',
                    message: null,
                    example: '<img src="something.webp" alt="...">',
                    moreLink: 'https://developers.google.com/speed/webp',
                    action: {
                        label: () => `Log them (${$nonWebpImages.length})`,
                        handler: () => console.log($nonWebpImages),
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQWtCO0lBQ3ZDLE9BQU87UUFDSCxFQUFFLEVBQUUsWUFBWTtRQUNoQixJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLFdBQVcsRUFDUCw0RkFBNEY7UUFDaEcsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDNUMseUJBQXlCLENBQzVCLENBQUM7WUFFRixJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLE9BQU8sRUFBRSxJQUFJO29CQUNiLE9BQU8sRUFBRSxzQ0FBc0M7b0JBQy9DLFFBQVEsRUFBRSwwQ0FBMEM7b0JBQ3BELE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxjQUFjLENBQUMsTUFBTSxHQUFHO3dCQUNsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7cUJBQzdDO2lCQUNKLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7YUFDcEIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9