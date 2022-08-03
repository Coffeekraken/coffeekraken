"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            direction
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the direction is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = {
    id: 'direction',
    name: 'Direction',
    description: 'The document must contain a valid dir declaration',
    level: 0,
    check({ $context }) {
        var _a;
        // @ts-ignore
        if (!((_a = $context.querySelector('html')) === null || _a === void 0 ? void 0 : _a.hasAttribute('dir'))) {
            return {
                status: 'error',
                message: 'The document is missing the direction',
                example: '<html dir="ltr">',
                moreLink: 'https://www.w3schools.com/tags/att_global_dir.asp',
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7Ozs7Ozs7Ozs7OztHQVlHO0FBRUgsa0JBQWU7SUFDWCxFQUFFLEVBQUUsV0FBVztJQUNmLElBQUksRUFBRSxXQUFXO0lBQ2pCLFdBQVcsRUFBRSxtREFBbUQ7SUFDaEUsS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7O1FBQ2QsYUFBYTtRQUNiLElBQUksQ0FBQyxDQUFBLE1BQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsMENBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBLEVBQUU7WUFDdEQsT0FBTztnQkFDSCxNQUFNLEVBQUUsT0FBTztnQkFDZixPQUFPLEVBQUUsdUNBQXVDO2dCQUNoRCxPQUFPLEVBQUUsa0JBQWtCO2dCQUMzQixRQUFRLEVBQUUsbURBQW1EO2FBQ2hFLENBQUM7U0FDTDtRQUNELE9BQU87WUFDSCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUMifQ==