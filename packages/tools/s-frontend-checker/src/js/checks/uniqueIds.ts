import type { ISFrontendChecker } from '../types';

/**
 * @name            uniqueIds
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check if multiple ids's have the same value
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'uniqueIds',
        name: 'Unique ids',
        description:
            'A document cannot host multiple elements with the same id',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 0,
        check({ $context }) {
            const $sameIds: any = [];
            const $ids = Array.from($context.querySelectorAll('[id]') ?? []);
            const ids: Record<string, HTMLElement> = {};

            $ids.forEach(($id) => {
                if (ids[$id.id]) {
                    if (!$sameIds.includes(ids[$id.id])) {
                        $sameIds.push(ids[$id.id]);
                    }
                    $sameIds.push($id);
                }
                ids[$id.id] = $id;
            });

            if ($sameIds.length) {
                return {
                    status: __SFrontendChecker.STATUS_ERROR,
                    message: 'Some elements in your page share the same `id`',
                    example: '<div id="hello">...</div>\n<a id="hello">...</a>',
                    moreLink: null,
                    elements: $sameIds,
                };
            }
            return {
                status: __SFrontendChecker.STATUS_SUCCESS,
            };
        },
    };
}
