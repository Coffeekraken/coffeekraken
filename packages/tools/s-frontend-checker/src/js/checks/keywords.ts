import type { ISFrontendChecker } from '../types';

/**
 * @name            keywords
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the keywords is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'keywords',
        name: 'Keywords',
        description: 'The document must contain a valid keywords declaration',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 1,
        check({ $context }) {
            // @ts-ignore
            if (!$context.querySelector('head meta[name="keywords"]')) {
                return {
                    status: 'warning',
                    message: 'The document is missing Some keywords',
                    example:
                        '<meta name="keywords" content="Frontend, Web, Development">',
                    moreLink: 'https://www.w3schools.com/tags/tag_meta.asp',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
