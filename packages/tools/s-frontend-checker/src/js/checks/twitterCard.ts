import type { ISFrontendChecker } from '../types';

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
        level: 1,
        check({ $context }) {
            // @ts-ignore
            if (!$context.querySelector('meta[property^="twitter:"]')) {
                return {
                    status: 'error',
                    message: 'The document is missing the twitterCard metas',
                    example:
                        '<meta name="twitter:card" content="summary" />\n<meta name="twitter:site" content="@nytimesbits" />',
                    moreLink:
                        'https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
