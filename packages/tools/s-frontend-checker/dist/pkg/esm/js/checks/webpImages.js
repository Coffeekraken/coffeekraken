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
        category: __SFrontendChecker.CATEGORY_NICE_TO_HAVE,
        level: 2,
        check({ $context }) {
            var _a;
            const $nonWebpImages = Array.from((_a = $context.querySelectorAll('img:not([src*=".webp"])')) !== null && _a !== void 0 ? _a : []);
            if ($nonWebpImages.length) {
                return {
                    status: 'warning',
                    message: null,
                    example: '<img src="something.webp" alt="...">',
                    moreLink: 'https://developers.google.com/speed/webp',
                    action: {
                        label: () => `Log them (${$nonWebpImages.length})`,
                        handler: () => {
                            $nonWebpImages.forEach(($elm) => {
                                console.log($elm);
                            });
                        },
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsWUFBWTtRQUNoQixJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLFdBQVcsRUFDUCw0RkFBNEY7UUFDaEcsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHFCQUFxQjtRQUNsRCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTs7WUFDZCxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUM3QixNQUFBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxtQ0FBSSxFQUFFLENBQzdELENBQUM7WUFFRixJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLE9BQU8sRUFBRSxJQUFJO29CQUNiLE9BQU8sRUFBRSxzQ0FBc0M7b0JBQy9DLFFBQVEsRUFBRSwwQ0FBMEM7b0JBQ3BELE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxjQUFjLENBQUMsTUFBTSxHQUFHO3dCQUNsRCxPQUFPLEVBQUUsR0FBRyxFQUFFOzRCQUNWLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQ0FDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDdEIsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQztxQkFDSjtpQkFDSixDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==