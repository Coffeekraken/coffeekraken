/**
 * @name            header
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if a "header" tag exists in the page or not...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'header',
    name: 'Header tag',
    description:
        'It\'s recommanded to wrap your header (menu, etc...) inside a "header" tag.',
    level: 1,
    check({ $context }) {
        const $header = $context.querySelector('header:not(article header)');

        if (!$header) {
            return {
                status: 'warning',
                message: null,
                example: '<header>...</header>',
                moreLink: 'https://www.w3schools.com/tags/tag_header.asp',
                action: null,
            };
        }
        return {
            status: 'success',
        };
    },
};
