/**
 * @name            navRoleAttribute
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * THe <nav> tag should have a "role" attribute
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'navRoleAttribute',
        name: 'Nav role attribute',
        description: 'All the <nav> elements should have the "role" attribute.',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        level: 1,
        check({ $context }) {
            const $nav = $context.querySelectorAll('nav:not([role])');

            if ($nav.length) {
                return {
                    status: 'warning',
                    message: null,
                    example: '<nav role="navigation">...</nav>',
                    moreLink: 'https://www.w3schools.com/tags/tag_nav.asp',
                    action: {
                        label: () => `Log them (${$nav.length})`,
                        handler: () => console.log($nav),
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
