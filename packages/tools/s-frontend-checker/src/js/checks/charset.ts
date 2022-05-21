import { ISFrontendCheckerCheckResult } from '../SFrontendChecker';

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
export default async function charset(
    $context: HTMLElement,
): Promise<ISFrontendCheckerCheckResult> {
    const resultObj = {
        name: 'Charset',
        description: 'The document must contain a valid charset declaration',
    };
    // @ts-ignore
    if (!$context.characterSet) {
        return {
            ...resultObj,
            status: 'error',
            message: 'The document is missing a charset',
            example: '<meta charset="utf-8">',
            moreLink: 'https://www.w3schools.com/html/html_charset.asp',
        };
    }
    return {
        ...resultObj,
        status: 'success',
    };
}
