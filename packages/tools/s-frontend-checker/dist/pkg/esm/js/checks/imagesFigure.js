/**
 * @name            imagesFigure
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the images are wrapped inside a "figure" or not
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'imagesFigure',
        name: 'Images inside figure',
        description: 'It\'s recommanded to have your "img" tags wrapped inside a "figure" one with a "figcaption" to desctibe it.',
        category: __SFrontendChecker.CATEGORY_BEST_SEO,
        level: 1,
        check({ $context }) {
            var _a;
            const $noneFigureImgs = Array.from((_a = $context.querySelectorAll('img:not(figure > img)')) !== null && _a !== void 0 ? _a : []);
            if ($noneFigureImgs.length) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: "It's recommanded to wrap your `<img />` tags into a `<figure>` one",
                    example: '<figure>\n<img src="something.webp" alt="something">\n<figcaption>This is my image description...</figcaption>\n</figure>',
                    moreLink: 'https://www.w3schools.com/tags/att_img_alt.asp',
                    elements: $noneFigureImgs,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsY0FBYztRQUNsQixJQUFJLEVBQUUsc0JBQXNCO1FBQzVCLFdBQVcsRUFDUCw2R0FBNkc7UUFDakgsUUFBUSxFQUFFLGtCQUFrQixDQUFDLGlCQUFpQjtRQUM5QyxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTs7WUFDZCxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUM5QixNQUFBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxtQ0FBSSxFQUFFLENBQzNELENBQUM7WUFFRixJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLGNBQWM7b0JBQ3pDLE9BQU8sRUFDSCxvRUFBb0U7b0JBQ3hFLE9BQU8sRUFDSCwySEFBMkg7b0JBQy9ILFFBQVEsRUFBRSxnREFBZ0Q7b0JBQzFELFFBQVEsRUFBRSxlQUFlO2lCQUM1QixDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxjQUFjO2FBQzVDLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==