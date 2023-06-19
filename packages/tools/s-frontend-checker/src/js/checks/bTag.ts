/**
 * @name            bTag
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * The "b" tag should be avoided.
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'bTag',
    name: '<b> tag',
    description:
        'It\'s recommanded to not use the "b" tag. Make use of the "strong" one instead',
    level: 0,
    check({ $context }) {
        const $b = $context.querySelectorAll('b');

        if ($b.length) {
            return {
                status: 'warning',
                message: null,
                example: '<strong>...</strong>',
                moreLink: 'https://www.w3schools.com/tags/tag_strong.asp',
                action: {
                    label: () => `Log them (${$b.length})`,
                    handler: () => console.log($b),
                },
            };
        }
        return {
            status: 'success',
        };
    },
};
