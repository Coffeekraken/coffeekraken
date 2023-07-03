import type { ISFrontendChecker } from '../types';

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
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'imagesAlt',
        name: 'Images alt attribute',
        description:
            "It's highly recommended to add an 'alt' attribute to all images to improve the accessibility of your website",
        category: __SFrontendChecker.CATEGORY_SEO,
        level: 0,
        check({ $context }) {
            const $nonAltImages = Array.from(
                $context.querySelectorAll('img:not([alt])') ?? [],
            );

            if ($nonAltImages.length) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: 'Some images are missing the `alt` attribute',
                    example:
                        '<img src="something.webp" alt="Descriptive alternative text">',
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
