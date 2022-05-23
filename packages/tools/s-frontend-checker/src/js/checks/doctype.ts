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
export default {
    id: 'doctype',
    name: 'Doctype',
    description: 'The document must contain a valid doctype declaration',
    level: 0,
    check({ $context }) {
        // @ts-ignore
        if (!$context.doctype) {
            return {
                status: 'error',
                message: 'The document is missing a doctype',
                example: '<!DOCTYPE html>',
                moreLink: 'https://www.w3schools.com/tags/tag_doctype.asp',
            };
        }
        return {
            status: 'success',
        };
    },
};
