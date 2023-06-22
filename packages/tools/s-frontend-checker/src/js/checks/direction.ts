import type { ISFrontendChecker } from '../types';

/**
 * @name            direction
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the direction is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'direction',
        name: 'Direction',
        description: 'The document must contain a valid dir declaration',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 0,
        check({ $context }) {
            // @ts-ignore
            if (!$context.querySelector('html')?.hasAttribute('dir')) {
                return {
                    status: 'error',
                    message: 'The document is missing the direction',
                    example: '<html dir="ltr">',
                    moreLink:
                        'https://www.w3schools.com/tags/att_global_dir.asp',
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
