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
export default {
    id: 'imagesFigure',
    name: 'Images inside figure',
    description: 'It\'s recommanded to have your "img" tags wrapped inside a "figure" one with a "figcaption" to desctibe it.',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILGVBQWU7SUFDWCxFQUFFLEVBQUUsY0FBYztJQUNsQixJQUFJLEVBQUUsc0JBQXNCO0lBQzVCLFdBQVcsRUFDUCw2R0FBNkc7SUFDakgsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7UUFDZCxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQzdDLHVCQUF1QixDQUMxQixDQUFDO1FBRUYsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFO1lBQ3hCLE9BQU87Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFDSCwySEFBMkg7Z0JBQy9ILFFBQVEsRUFBRSxnREFBZ0Q7Z0JBQzFELE1BQU0sRUFBRTtvQkFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxlQUFlLENBQUMsTUFBTSxHQUFHO29CQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7aUJBQzlDO2FBQ0osQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9