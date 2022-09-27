"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
    id: 'charset',
    name: 'Charset',
    description: 'The document must contain a valid charset declaration',
    level: 0,
    check({ $context }) {
        // @ts-ignore
        if (!$context.characterSet) {
            return {
                status: 'error',
                message: 'The document is missing a charset',
                example: '<meta charset="utf-8">',
                moreLink: 'https://www.w3schools.com/html/html_charset.asp',
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsa0JBQWU7SUFDWCxFQUFFLEVBQUUsU0FBUztJQUNiLElBQUksRUFBRSxTQUFTO0lBQ2YsV0FBVyxFQUFFLHVEQUF1RDtJQUNwRSxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTtRQUNkLGFBQWE7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTtZQUN4QixPQUFPO2dCQUNILE1BQU0sRUFBRSxPQUFPO2dCQUNmLE9BQU8sRUFBRSxtQ0FBbUM7Z0JBQzVDLE9BQU8sRUFBRSx3QkFBd0I7Z0JBQ2pDLFFBQVEsRUFBRSxpREFBaUQ7YUFDOUQsQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9