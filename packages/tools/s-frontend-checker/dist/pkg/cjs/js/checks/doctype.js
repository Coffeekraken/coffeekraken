"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsa0JBQWU7SUFDWCxFQUFFLEVBQUUsU0FBUztJQUNiLElBQUksRUFBRSxTQUFTO0lBQ2YsV0FBVyxFQUFFLHVEQUF1RDtJQUNwRSxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtRQUNkLGFBQWE7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNuQixPQUFPO2dCQUNILE1BQU0sRUFBRSxPQUFPO2dCQUNmLE9BQU8sRUFBRSxtQ0FBbUM7Z0JBQzVDLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFFBQVEsRUFBRSxnREFBZ0Q7YUFDN0QsQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9