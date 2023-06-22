import type { ISFrontendChecker } from '../types';

/**
 * @name            viewport
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the viewport is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'viewport',
        name: 'Viewport',
        description: 'The document must contain a valid viewport declaration',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 0,
        check({ $context }) {
            // @ts-ignore
            if (!$context.querySelector('meta[name="viewport"]')) {
                return {
                    status: 'error',
                    message: 'The document is missing a viewport',
                    example:
                        '<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">',
                    moreLink:
                        'https://www.w3schools.com/css/css_rwd_viewport.asp',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
