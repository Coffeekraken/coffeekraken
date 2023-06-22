import type { ISFrontendChecker } from '../types';

/**
 * @name            ariaComplementary
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * When multiple <main> tags are present, check that all are labelled
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'ariaComplementary',
        name: 'Aria complementary',
        category: __SFrontendChecker.CATEGORY_ACCESSIBILITY,
        description:
            'When multiple <main> tags are used, they must have a `aria-label` or `arian-labelledby` attribute',
        level: 1,
        check({ $context }) {
            const $asides = $context.querySelectorAll('aside');

            if ($asides.length <= 1) {
                return {
                    status: 'success',
                };
            }

            const $asidesNotLabelled =
                $context.querySelectorAll('aside:not([role])');

            if ($asidesNotLabelled) {
                return {
                    status: 'warning',
                    message: 'Some <aside> tags are not labelled',
                    example:
                        '<aside aria-label="Why Elon Musk is such a nice/bad guy">...</aside>',
                    moreLink:
                        'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/complementary.html',
                    action: {
                        label: () => `Log them (${$asidesNotLabelled.length})`,
                        handler: () => {
                            $asidesNotLabelled.forEach(($aside) => {
                                console.log($aside);
                            });
                        },
                    },
                };
            }
            return {
                status: 'success',
            };
        },
    };
}
