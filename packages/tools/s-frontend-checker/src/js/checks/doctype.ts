import type { ISFrontendChecker } from '../types.js';

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
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'doctype',
        name: 'Doctype',
        description: 'The document must contain a valid doctype declaration',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 0,
        check({ $context }) {
            // @ts-ignore
            if (!$context.doctype) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'The document is missing a doctype',
                    example: '<!DOCTYPE html>',
                    moreLink: 'https://www.w3schools.com/tags/tag_doctype.asp',
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
