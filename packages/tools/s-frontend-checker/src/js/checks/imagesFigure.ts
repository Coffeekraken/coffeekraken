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
    description:
        'It\'s recommanded to have your "img" tags wrapped inside a "figure" one with a "figcaption" to desctibe it.',
    level: 1,
    check({ $context }) {
        const $noneFigureImgs = $context.querySelectorAll(
            'img:not(figure > img)',
        );

        if ($noneFigureImgs.length) {
            return {
                status: 'warning',
                message: null,
                example:
                    '<figure>\n<img src="something.webp" alt="something">\n<figcaption>This is my image description...</figcaption>\n</figure>',
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
