import { ISFrontendCheckerCheckResult } from '../SFrontendChecker';

/**
 * @name            description
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the description is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default async function description(
    $context: HTMLElement,
): Promise<ISFrontendCheckerCheckResult> {
    const resultObj = {
        name: 'Description',
        description: 'The document must have a description specified',
    };
    if (!$context.querySelector('head meta[name="description"]')) {
        return {
            ...resultObj,
            status: 'error',
            message: 'The document is missing the description',
            example:
                '<meta name="description" content="My awesome description">',
            moreLink: 'https://www.w3schools.com/tags/tag_meta.asp',
        };
    }
    return {
        ...resultObj,
        status: 'success',
    };
}
