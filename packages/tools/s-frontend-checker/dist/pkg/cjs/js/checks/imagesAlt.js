"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
    id: 'imagesAlt',
    name: 'Images alt attribute',
    description: "It's highly recommended to add an 'alt' attribute to all images to improve the accessibility of your website",
    level: 0,
    check({ $context }) {
        const $nonAltImages = $context.querySelectorAll('img:not([alt])');
        if ($nonAltImages.length) {
            return {
                status: 'warning',
                message: null,
                example: '<img src="something.webp" alt="something">',
                moreLink: 'https://www.w3schools.com/tags/att_img_alt.asp',
                action: {
                    label: () => `Log them (${$nonAltImages.length})`,
                    handler: () => console.log($nonAltImages),
                },
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsa0JBQWU7SUFDWCxFQUFFLEVBQUUsV0FBVztJQUNmLElBQUksRUFBRSxzQkFBc0I7SUFDNUIsV0FBVyxFQUNQLDhHQUE4RztJQUNsSCxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtRQUNkLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWxFLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0QixPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQUUsNENBQTRDO2dCQUNyRCxRQUFRLEVBQUUsZ0RBQWdEO2dCQUMxRCxNQUFNLEVBQUU7b0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsYUFBYSxDQUFDLE1BQU0sR0FBRztvQkFDakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO2lCQUM1QzthQUNKLENBQUM7U0FDTDtRQUNELE9BQU87WUFDSCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUMifQ==