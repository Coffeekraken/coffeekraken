"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            noopener
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if the noopener is well defined
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = {
    id: 'noopener',
    name: 'External links (noopener)',
    description: 'Links with target="_blank" should have rel="noopener"',
    level: 3,
    check({ $context }) {
        var _a;
        const $externalLinks = $context.querySelectorAll('a[target="_blank"]:not([rel="noopener"])');
        // @ts-ignore
        if (!((_a = $context.querySelector('html')) === null || _a === void 0 ? void 0 : _a.hasAttribute('dir'))) {
            return {
                status: 'error',
                message: 'Some of your external links does not have rel="noopener"',
                example: '<a href="..." target="_blank" rel="noopener">',
                action: {
                    label: () => `Log them (${$externalLinks.length})`,
                    handler: () => {
                        console.log($externalLinks);
                    },
                },
                moreLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noopener',
            };
        }
        return {
            status: 'success',
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUE7Ozs7Ozs7Ozs7OztHQVlHO0FBRUgsa0JBQWU7SUFDWCxFQUFFLEVBQUUsVUFBVTtJQUNkLElBQUksRUFBRSwyQkFBMkI7SUFDakMsV0FBVyxFQUFFLHVEQUF1RDtJQUNwRSxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTs7UUFDZCxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQzVDLDBDQUEwQyxDQUM3QyxDQUFDO1FBRUYsYUFBYTtRQUNiLElBQUksQ0FBQyxDQUFBLE1BQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsMENBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBLEVBQUU7WUFDdEQsT0FBTztnQkFDSCxNQUFNLEVBQUUsT0FBTztnQkFDZixPQUFPLEVBQ0gsMERBQTBEO2dCQUM5RCxPQUFPLEVBQUUsK0NBQStDO2dCQUN4RCxNQUFNLEVBQUU7b0JBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsY0FBYyxDQUFDLE1BQU0sR0FBRztvQkFDbEQsT0FBTyxFQUFFLEdBQUcsRUFBRTt3QkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNoQyxDQUFDO2lCQUNKO2dCQUNELFFBQVEsRUFDSix1RUFBdUU7YUFDOUUsQ0FBQztTQUNMO1FBQ0QsT0FBTztZQUNILE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQyJ9