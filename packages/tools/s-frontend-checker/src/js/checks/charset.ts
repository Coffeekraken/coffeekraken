import type { ISFrontendChecker } from '../types';

/**
 * @name            charset
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the charset is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'charset',
        name: 'Charset',
        description: 'The document must contain a valid charset declaration',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 0,
        check({ $context }) {
            // @ts-ignore
            if (!$context.characterSet) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing a charset',
                    example: '<meta charset="utf-8">',
                    moreLink: 'https://www.w3schools.com/html/html_charset.asp',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
