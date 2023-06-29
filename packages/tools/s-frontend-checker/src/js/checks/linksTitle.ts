import type { ISFrontendChecker } from '../types';

/**
 * @name            linksTitle
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * All the "<a>" tags must have a "title" attribute
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'linksTitle',
        name: 'Links title',
        description: 'All the links <a> tags must have a "title" attribute.',
        category: __SFrontendChecker.CATEGORY_SEO,
        level: 1,
        check({ $context }) {
            const $a = Array.from(
                $context.querySelectorAll('a:not([title])') ?? [],
            );

            if ($a.length) {
                return {
                    status: 'warning',
                    message:
                        'Some links does not have a proper `title` attribute',
                    example:
                        '<a href="https://coffeekraken.io" title="Coffeekraken website">...</a>',
                    moreLink: 'https://www.w3schools.com/tags/tag_a.asp',
                    elements: $a,
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
