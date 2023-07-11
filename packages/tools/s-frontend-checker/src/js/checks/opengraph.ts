import type { ISFrontendChecker } from '../types.js';

/**
 * @name            opengraph
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the opengraph metas are well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'opengraph',
        name: 'Open Graph Metas',
        description: 'Specifying the open graph metas is recommanded',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 1,
        check({ $context }) {
            const $og = $context.querySelectorAll('meta[property^="og:"]');

            // @ts-ignore
            if (!$og.length) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing the opengraph metas',
                    example:
                        '<meta property="og:title" content="The Rock" />\n<meta property="og:type" content="video.movie" />',
                    moreLink: 'https://ogp.me/',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
                elements: $og,
            };
        },
    };
}
