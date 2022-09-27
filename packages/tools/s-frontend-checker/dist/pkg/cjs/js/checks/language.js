"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
    id: 'language',
    name: 'Language',
    description: 'The document must contain a valid langage declaration',
    level: 0,
    check({ $context }) {
        var _a;
        // @ts-ignore
        if (!((_a = $context.querySelector('html')) === null || _a === void 0 ? void 0 : _a.hasAttribute('lang'))) {
            return {
                status: 'error',
                message: 'The document is missing the language',
                example: '<html lang="en">',
                moreLink: 'https://www.w3.org/International/questions/qa-html-language-declarations',
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7Ozs7Ozs7Ozs7OztHQVlHO0FBRUgsa0JBQWU7SUFDWCxFQUFFLEVBQUUsVUFBVTtJQUNkLElBQUksRUFBRSxVQUFVO0lBQ2hCLFdBQVcsRUFBRSx1REFBdUQ7SUFDcEUsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7O1FBQ2QsYUFBYTtRQUNiLElBQUksQ0FBQyxDQUFBLE1BQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsMENBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBLEVBQUU7WUFDdkQsT0FBTztnQkFDSCxNQUFNLEVBQUUsT0FBTztnQkFDZixPQUFPLEVBQUUsc0NBQXNDO2dCQUMvQyxPQUFPLEVBQUUsa0JBQWtCO2dCQUMzQixRQUFRLEVBQ0osMEVBQTBFO2FBQ2pGLENBQUM7U0FDTDtRQUNELE9BQU87WUFDSCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUMifQ==