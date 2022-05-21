import { ISFrontendCheckerCheckResult } from '../SFrontendChecker';

/**
 * @name            title
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the title is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default async function title(
    $context: HTMLElement,
): Promise<ISFrontendCheckerCheckResult> {
    const resultObj = {
        name: 'Title',
        description: 'The document must have a title specified',
    };
    if (!$context.title) {
        return {
            ...resultObj,
            status: 'error',
            message: 'The document is missing the title',
            example: '<title>My awesome title</title>',
            moreLink: 'https://www.w3schools.com/tags/tag_title.asp',
        };
    }
    return {
        ...resultObj,
        status: 'success',
    };
}
