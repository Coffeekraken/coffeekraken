import type { ISFrontendChecker } from '../types.js';

/**
 * @name            emptyLinks
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * All the "<a>" tags must have an "href" attribute
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'emptyLinks',
        name: 'Empty links',
        description: 'All the links <a> tags must have an "href" attribute.',
        category: __SFrontendChecker.CATEGORY_SEO,
        level: 1,
        check({ $context }) {
            const $a = Array.from(
                $context.querySelectorAll('a:not([href]), a[href=""]') ?? [],
            );

            if ($a.length) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message:
                        'Some links does not have a proper `href` attribute',
                    example:
                        '<a href="https://coffeekraken.io" title="Coffeekraken website">...</a>',
                    moreLink: 'https://www.w3schools.com/tags/tag_a.asp',
                    elements: $a,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
