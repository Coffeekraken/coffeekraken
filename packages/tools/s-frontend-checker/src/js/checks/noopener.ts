import type { ISFrontendChecker } from '../types';

/**
 * @name            noopener
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the noopener is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'noopener',
        name: 'External links (noopener)',
        description: 'Links with target="_blank" should have rel="noopener"',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 3,
        check({ $context }) {
            const $externalLinks = Array.from(
                $context.querySelectorAll(
                    'a[target="_blank"]:not([rel="noopener"])',
                ) ?? [],
            );

            // @ts-ignore
            if ($externalLinks.length) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message:
                        'Some of your external links does not have rel="noopener"',
                    example: '<a href="..." target="_blank" rel="noopener">',
                    moreLink:
                        'https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noopener',
                    elements: $externalLinks,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
