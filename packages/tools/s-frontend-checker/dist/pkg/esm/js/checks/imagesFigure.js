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
            const $noneFigureImgs = $context.querySelectorAll('img:not(figure > img)');
            if ($noneFigureImgs.length) {
                return {
                    status: 'warning',
                    message: null,
                    example: '<figure>\n<img src="something.webp" alt="something">\n<figcaption>This is my image description...</figcaption>\n</figure>',
                    moreLink: 'https://www.w3schools.com/tags/att_img_alt.asp',
                    action: {
                        label: () => `Log them (${$noneFigureImgs.length})`,
                        handler: () => console.log($noneFigureImgs),
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsY0FBYztRQUNsQixJQUFJLEVBQUUsc0JBQXNCO1FBQzVCLFdBQVcsRUFDUCw2R0FBNkc7UUFDakgsUUFBUSxFQUFFLGtCQUFrQixDQUFDLGlCQUFpQjtRQUM5QyxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUNkLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDN0MsdUJBQXVCLENBQzFCLENBQUM7WUFFRixJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLE9BQU8sRUFBRSxJQUFJO29CQUNiLE9BQU8sRUFDSCwySEFBMkg7b0JBQy9ILFFBQVEsRUFBRSxnREFBZ0Q7b0JBQzFELE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxlQUFlLENBQUMsTUFBTSxHQUFHO3dCQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7cUJBQzlDO2lCQUNKLENBQUM7YUFDTDtZQUNELE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7YUFDcEIsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9