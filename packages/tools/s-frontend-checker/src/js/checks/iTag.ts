/**
 * @name            iTag
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * The "i" tag should be avoided for none "icon" purpose
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'iTag',
    name: '<i> tag',
    description:
        'It\'s recommanded to not use the "i" tag to emphasis something. Make use of the "em" one instead',
    level: 0,
    check({ $context }) {
        const $i = $context.querySelectorAll('i:not(:empty)');

        if ($i.length) {
            return {
                status: 'warning',
                message: null,
                example: '<em>...</em>',
                moreLink: 'https://www.w3schools.com/tags/tag_em.asp',
                action: {
                    label: () => `Log them (${$i.length})`,
                    handler: () => console.log($i),
                },
            };
        }
        return {
            status: 'success',
        };
    },
};
