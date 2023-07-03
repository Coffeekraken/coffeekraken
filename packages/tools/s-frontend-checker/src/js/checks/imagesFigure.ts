import type { ISFrontendChecker } from '../types';

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
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'imagesFigure',
        name: 'Images inside figure',
        description:
            'It\'s recommanded to have your "img" tags wrapped inside a "figure" one with a "figcaption" to desctibe it.',
        category: __SFrontendChecker.CATEGORY_BEST_SEO,
        level: 1,
        check({ $context }) {
            const $noneFigureImgs = Array.from(
                $context.querySelectorAll('img:not(figure > img)') ?? [],
            );

            if ($noneFigureImgs.length) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message:
                        "It's recommanded to wrap your `<img />` tags into a `<figure>` one",
                    example:
                        '<figure>\n<img src="something.webp" alt="something">\n<figcaption>This is my image description...</figcaption>\n</figure>',
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
