import type { ISFrontendChecker } from '../types';

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
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'iTag',
        name: '<i> tag',
        description:
            'It\'s recommanded to not use the "i" tag to emphasis something. Make use of the "em" one instead',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 0,
        check({ $context }) {
            const $i = Array.from(
                $context.querySelectorAll('i:not(:empty)') ?? [],
            );

            if ($i.length) {
                return {
                    status: __SFrontendChecker.STATUS_WARNING,
                    message: `It's recommanded to not use the \`<i>\` tag. Use the \`<em>\` tag instead`,
                    example: '<em>...</em>',
                    moreLink: 'https://www.w3schools.com/tags/tag_em.asp',
                    elements: $i,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
