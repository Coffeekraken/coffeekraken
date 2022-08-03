"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
    id: 'webpImages',
    name: 'Webp for images',
    description: "Consider using the 'webp' extension for images to improve the performances of your website",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsa0JBQWU7SUFDWCxFQUFFLEVBQUUsWUFBWTtJQUNoQixJQUFJLEVBQUUsaUJBQWlCO0lBQ3ZCLFdBQVcsRUFDUCw0RkFBNEY7SUFDaEcsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7UUFDZCxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQzVDLHlCQUF5QixDQUM1QixDQUFDO1FBRUYsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFBRSxzQ0FBc0M7Z0JBQy9DLFFBQVEsRUFBRSwwQ0FBMEM7Z0JBQ3BELE1BQU0sRUFBRTtvQkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxjQUFjLENBQUMsTUFBTSxHQUFHO29CQUNsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7aUJBQzdDO2FBQ0osQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9