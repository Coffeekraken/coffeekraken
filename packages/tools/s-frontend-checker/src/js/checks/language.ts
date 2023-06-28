import type { ISFrontendChecker } from '../types';

/**
 * @name            language
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the language is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'language',
        name: 'Language',
        description: 'The document must contain a valid langage declaration',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 0,
        check({ $context }) {
            const $html = $context.querySelector('html');
            // @ts-ignore
            if (!$html?.hasAttribute('lang')) {
                return {
                    status: 'error',
                    message: 'The document is missing the language',
                    example: '<html lang="en">',
                    moreLink:
                        'https://www.w3.org/International/questions/qa-html-language-declarations',
                };
            }
            return {
                status: 'success',
                elements: $html,
            };
        },
    };
}
