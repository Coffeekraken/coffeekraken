/**
 * @name            imagesAlt
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if all images have an "alt" attribute
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'imagesAlt',
        name: 'Images alt attribute',
        description: "It's highly recommended to add an 'alt' attribute to all images to improve the accessibility of your website",
        category: __SFrontendChecker.CATEGORY_SEO,
        level: 0,
        check({ $context }) {
            var _a;
            const $nonAltImages = Array.from((_a = $context.querySelectorAll('img:not([alt])')) !== null && _a !== void 0 ? _a : []);
            if ($nonAltImages.length) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'Some images are missing the `alt` attribute',
                    example: '<img src="something.webp" alt="Descriptive alternative text">',
                    moreLink: 'https://www.w3schools.com/tags/att_img_alt.asp',
                    elements: $nonAltImages,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsV0FBVztRQUNmLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsV0FBVyxFQUNQLDhHQUE4RztRQUNsSCxRQUFRLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtRQUN6QyxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTs7WUFDZCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUM1QixNQUFBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxtQ0FBSSxFQUFFLENBQ3BELENBQUM7WUFFRixJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLGNBQWM7b0JBQ3pDLE9BQU8sRUFBRSw2Q0FBNkM7b0JBQ3RELE9BQU8sRUFDSCwrREFBK0Q7b0JBQ25FLFFBQVEsRUFBRSxnREFBZ0Q7b0JBQzFELFFBQVEsRUFBRSxhQUFhO2lCQUMxQixDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO2FBQzVDLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==