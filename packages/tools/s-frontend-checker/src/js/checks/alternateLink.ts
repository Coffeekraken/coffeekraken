import type { ISFrontendChecker } from '../types';

/**
 * @name            alternateLink
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the alternate link is defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'alternateLink',
        name: 'Alternate link',
        description:
            'Check if an alternate link is present and that it is valid',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        check({ $context }) {
            // canonical
            const $alternateLink = $context.querySelector(
                'link[rel="alternate"]',
            );
            if (!$alternateLink) {
                return {
                    status: __SFrontendChecker.STATUS_SUCCESS,
                };
            }

            if (!$alternateLink.hasAttribute('href')) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The `alternate` link `href` attribute is missing',
                    example: `link rel="alternate" media="only screen and (max-width: 640px)" href="https://example.com/dresses/green-dresses" />`,
                    moreLink:
                        'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
                };
            }

            if (!$alternateLink.getAttribute('href').match(/^https?\:\/\//)) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: `The \`alternate\` link "${$alternateLink.getAttribute(
                        'href',
                    )}" is invalid`,
                    example: `link rel="alternate" media="only screen and (max-width: 640px)" href="https://example.com/dresses/green-dresses" />`,
                    moreLink:
                        'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
                };
            }

            if (
                !$alternateLink.hasAttribute('media') &&
                !$alternateLink.hasAttribute('hreflang')
            ) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message:
                        'The `alternate` link `hreflang`|`media` attribute is missing',
                    example: `link rel="alternate" media="only screen and (max-width: 640px)" href="https://example.com/dresses/green-dresses" />`,
                    moreLink:
                        'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
                };
            }

            return {
                status: 'success',
            };
        },
    };
}
