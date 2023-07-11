import type { ISFrontendChecker } from '../types.js';

/**
 * @name            twitterCard
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the twitterCard metas are well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'twitterCard',
        name: 'Twitter Card Metas',
        description: 'Specifying the twitter card metas is recommanded',
        category: __SFrontendChecker.CATEGORY_SOCIAL,
        level: __SFrontendChecker.LEVEL_MEDIUM,
        check({ $context }) {
            const $twitter = $context.querySelectorAll(
                'meta[property^="twitter:"]',
            );
            // @ts-ignore
            if (!$twitter) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing the twitterCard metas',
                    example:
                        '<meta name="twitter:card" content="summary" />\n<meta name="twitter:site" content="@nytimesbits" />',
                    moreLink:
                        'https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $twitter,
            };
        },
    };
}
