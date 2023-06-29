import type { ISFrontendChecker } from '../types';

/**
 * @name            canonicalLink
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the canonical link is defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'canonicalLink',
        name: 'Canonical link',
        description:
            'Check if a canonical link is present and that it is valid',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        check({ $context }) {
            // canonical
            const $canonicalLink = $context.querySelector(
                'link[rel="canonical"]',
            );
            if (!$canonicalLink) {
                return {
                    status: __SFrontendChecker.STATUS_SUCCESS,
                };
            }

            if (!$canonicalLink.hasAttribute('href')) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The `canonical` link `href` attribute is missing',
                    example: `<link rel="canonical" href="https://example.com/dresses/green-dresses" />`,
                    moreLink:
                        'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
                    elements: $canonicalLink,
                };
            }

            if (!$canonicalLink.getAttribute('href').match(/^https?\:\/\//)) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: `The \`canonical\` link "${$canonicalLink.getAttribute(
                        'href',
                    )}" is invalid`,
                    example: `<link rel="canonical" href="https://example.com/dresses/green-dresses" />`,
                    moreLink:
                        'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
                    elements: $canonicalLink,
                };
            }

            return {
                status: 'success',
                elements: $canonicalLink,
            };
        },
    };
}
