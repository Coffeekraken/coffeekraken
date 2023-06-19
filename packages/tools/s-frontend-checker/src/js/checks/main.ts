/**
 * @name            main
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if a "main" tag exists in the page or not...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'main',
    name: 'Main tag',
    description:
        'It\'s recommanded to wrap your main content inside a "main" tag.',
    level: 1,
    check({ $context }) {
        const $main = $context.querySelector('main');

        if (!$main) {
            return {
                status: 'warning',
                message: null,
                example: '<main id="content">...</main>',
                moreLink: 'https://www.w3schools.com/tags/tag_main.asp',
                action: null,
            };
        }
        return {
            status: 'success',
        };
    },
};
