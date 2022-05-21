import { ISFrontendCheckerCheckResult } from '../SFrontendChecker';

/**
 * @name            doctype
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the doctype is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default async function doctype(
    $context: HTMLElement,
): Promise<ISFrontendCheckerCheckResult> {
    const resultObj = {
        name: 'Doctype',
        description: 'The document must contain a valid doctype declaration',
    };
    // @ts-ignore
    if (!$context.doctype) {
        return {
            ...resultObj,
            status: 'error',
            message: 'The document is missing a doctype',
            example: '<!DOCTYPE html>',
            moreLink: 'https://www.w3schools.com/tags/tag_doctype.asp',
        };
    }
    return {
        ...resultObj,
        status: 'success',
    };
}
