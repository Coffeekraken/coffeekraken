import type { ISFrontendChecker } from '../types';

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
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'webpImages',
        name: 'Webp for images',
        description:
            "Consider using the 'webp' extension for images to improve the performances of your website",
        category: __SFrontendChecker.CATEGORY_NICE_TO_HAVE,
        level: 2,
        check({ $context }) {
            const $nonWebpImages = Array.from(
                $context.querySelectorAll('img:not([src*=".webp"])') ?? [],
            );

            if ($nonWebpImages.length) {
                return {
                    status: 'warning',
                    message: null,
                    example: '<img src="something.webp" alt="...">',
                    moreLink: 'https://developers.google.com/speed/webp',
                    elements: $nonWebpImages,
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
