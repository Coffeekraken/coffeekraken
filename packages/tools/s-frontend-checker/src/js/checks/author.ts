import { ISFrontendCheckerCheckResult } from '../SFrontendChecker';

/**
 * @name            author
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the author is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default async function author(
    $context: HTMLElement,
): Promise<ISFrontendCheckerCheckResult> {
    const resultObj = {
        name: 'Author',
        description: 'The document does not have any author specified',
    };
    if (!$context.querySelector('head meta[name="author"]')) {
        return {
            ...resultObj,
            status: 'warning',
            message: 'The document is missing an author',
            example: '<meta name="author" content="Olivier Bossel">',
            moreLink: 'https://www.w3schools.com/tags/tag_meta.asp',
        };
    }
    return {
        ...resultObj,
        status: 'success',
    };
}
